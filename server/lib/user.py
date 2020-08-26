from flask import jsonify, request
from jsonschema import validate
import json
import time
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

from forum import app
from lib.db import get_db


add_thread_schema = {
    "type": "object",
    "properties": {
        "title" : {"$ref": "#/definitions/non-empty-string"},
        "sub_cat_id": {"type": "integer"},
        "content": {"$ref": "#/definitions/non-empty-string"}
    },
    "definitions": {
        "non-empty-string": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["title", "sub_cat_id", "content"]
}
@app.route('/add_thread', methods=['POST'])
@jwt_required
def add_thread():
    #Validate json
    try:
        validate(instance=request.json, schema=add_thread_schema)
    except:
        return 'Bad request', 400

    db = get_db().cursor()

    #Check if sub_category exists
    db.execute('SELECT * FROM subcategories WHERE id=?', (request.json['sub_cat_id'],))
    if len(db.fetchall()) == 0:
        return jsonify({"error": "Subcategory doesn't exist"})

    #Get author id
    db.execute('SELECT id FROM accounts WHERE name=?', (get_jwt_identity()['name'],))
    user_id = db.fetchone()[0]

    db.execute('INSERT INTO threads (sub_cat_id, author_id, title, time_created, content) VALUES (?, ?, ?, ?, ?)', (request.json['sub_cat_id'], user_id, request.json['title'], (int(time.time())), request.json['content']))
    return ({"success" : True, "thread_id" : db.lastrowid})

add_post_schema = {
    "type": "object",
    "properties": {
        "thread_id" : {"type" : "integer"},
        "content": {"$ref": "#/definitions/non-empty-string"}
    },
    "definitions": {
        "non-empty-string": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["thread_id", "content"]
}
@app.route('/add_post', methods=['POST'])
@jwt_required
def add_post():
    #Validate json
    try:
        validate(instance=request.json, schema=add_post_schema)
    except:
        return 'Bad request', 400

    db = get_db().cursor()

    #Check if thread exists
    db.execute('SELECT * FROM threads WHERE id=?', (request.json['thread_id'],))
    if len(db.fetchall()) == 0:
        return jsonify({"error": "Thread doesn't exist"}), 400

    #Get author id
    db.execute('SELECT id FROM accounts WHERE name=?', (get_jwt_identity()['name'],))
    user_id = db.fetchone()[0]

    db.execute('INSERT INTO posts (thread_id, author_id, content, time_created) VALUES (?, ?, ?, ?)', (request.json['thread_id'], user_id, request.json['content'],  int(time.time())))


    return jsonify({"success" : True, "post_id": db.lastrowid}), 200