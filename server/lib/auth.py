from flask import jsonify, request
from jsonschema import validate
import json
import time
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

from forum import app
from lib.db import get_db

# TODO: better input val
# TODO: switch to better auth method

jwt = JWTManager(app)

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
            return jsonify({"error": "User already exists"}), 400

        db.execute('INSERT INTO accounts (name, mail, time_created, password) VALUES (?, ?, ?, ?);', (request.json['name'], request.json['mail'], str(int(time.time())), generate_password_hash(request.json['password'])))


        db.execute("SELECT id, mail, time_created FROM accounts WHERE name=?", (request.json['name'],))
        user = db.fetchone()

        db.close()
        user = {
            "logged": True,
            "name": request.json['name'],
            "id": user[0],
            "mail": user[1],
            "time_created" : user[2]
        }

        expires = datetime.timedelta(days=365)
        access_token = create_access_token(identity=user, expires_delta=expires)

        db.close()
        return jsonify(success=True, access_token=access_token), 200



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
        db.execute("SELECT id, mail, time_created, password FROM accounts WHERE name=?", (request.json['name'],))

        users = db.fetchall()
        if len(users) == 0:
            db.close()
            return jsonify({"error": "No user found"}), 401

        for user in users:
            if check_password_hash(user[3], request.json['password']):
                db.close()
                user = {
                    "logged": True,
                    "name": request.json['name'],
                    "id": user[0],
                    "mail": user[1],
                    "time_created" : user[2]
                }
        
                expires = datetime.timedelta(days=365)
                access_token = create_access_token(identity=user, expires_delta=expires)

                return jsonify(access_token=access_token), 200
    return jsonify({"error": "Wrong password"}), 401

@app.route('/my_profile', methods=['GET'])
@jwt_required
def my_profile():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200