from flask import jsonify, request, session
from jsonschema import validate
import json
import time
from werkzeug.security import generate_password_hash, check_password_hash

from forum import app
from lib.db import get_db

# TODO: better input val
# TODO: switch to better auth method

# Registering
register_schema = {
    "type": "object",
    "properties": {
        "name": {"$ref": "#/definitions/non-empty-string"},
        "password": {"$ref": "#/definitions/non-empty-string"},
        "mail": {"$ref": "#/definitions/non-empty-string"}
    },
    "definitions": {
        "non-empty-string": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["name", "password", "mail"]
}
@app.route('/register', methods=['POST'])
def register():
    if request.json is None:
        return 'Bad request', 400
    try:
        validate(instance=request.json, schema=register_schema)
    except:
        return 'Bad request', 400
    else:
        db = get_db().cursor()

        db.execute("SELECT * FROM accounts WHERE name=? OR mail=?", (request.json['name'], request.json['mail']))
        
        # User already exists
        fetched_users = db.fetchall()
        if len(fetched_users) != 0:
            db.close()
            return jsonify({"error": "User already exists"})

        db.execute('INSERT INTO accounts (name, mail, time_created, password) VALUES (?, ?, ?, ?);', (request.json['name'], request.json['mail'], str(int(time.time())), generate_password_hash(request.json['password'])))

        session['name'] = request.json['name']

        db.close()
        return 'gut'

# Logging in
login_schema = {
    "type": "object",
    "properties": {
        "name": {"$ref": "#/definitions/non-empty-string"},
        "password": {"$ref": "#/definitions/non-empty-string"}
    },
    "definitions": {
        "non-empty-string": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["name", "password"]
}
@app.route('/login', methods=['POST'])
def login():
    if request.json is None:
        return 'Bad request', 400
    try:
        validate(instance=request.json, schema=login_schema)
    except:
        return 'Bad request', 400
    else:
        db = get_db().cursor()
        db.execute("SELECT * FROM accounts WHERE name=?", (request.json['name'],))

        users = db.fetchall()
        if len(users) == 0:
            db.close()
            return jsonify({"error": "No user found"})

        for user in users:
            if check_password_hash(user[5], request.json['password']):
                db.close()
                session['name'] = request.json['name']
                return jsonify({"success": True})
        
        return jsonify({"error": "Bad password"})


@app.route('/logout', methods=['POST'])
def logout():
    if 'name' in session:
        session.clear()
        return jsonify({"success": True})

    return jsonify({"success": False})
    

@app.route('/my_profile', methods=['POST'])
def my_profile():
    if 'name' not in session:
        return jsonify({"logged": False})

    db = get_db().cursor()

    db.execute('SELECT id, mail, time_created FROM accounts WHERE name=?', (session['name'],))

    user = db.fetchone()

    return jsonify({
        "logged": True,
        "name": session['name'],
        "id": user[0],
        "mail": user[1],
        "time_created" : user[2]
    })