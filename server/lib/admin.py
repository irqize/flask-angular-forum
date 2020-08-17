from flask import jsonify, request, session
from jsonschema import validate
import json
import time
from werkzeug.security import generate_password_hash, check_password_hash

from forum import app
from lib.db import get_db

def admin_json_required(func):
    def wrapper(*args, **kwargs):
        if 'name' not in session:
            return '', 401

        db = get_db().cursor()
        db.execute("SELECT is_admin FROM accounts WHERE name=?", session['name'])

        is_admin = db.fetchone()[0]

        if is_admin == 0:
            return '', 401

        if request.json is None:
            return '', 400

        return func(*args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper


add_category_schema = {
    "type": "object",
    "properties": {
        "name": {"$ref": "#/definitions/non-empty-string"},
        "desc": {"$ref": "#/definitions/non-empty-string"}
    },
    "definitions": {
        "non-empty-string": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["name", "desc"]
}
@app.route('/admin/add_category', methods=["POST"])
@admin_json_required
def add_category():
    try:
        validate(instance=request.json, schema=add_category_schema)
    except:
        return 'Bad request', 400
    
    db = get_db().cursor()
    db.execute('INSERT INTO categories (name, desc) VALUES (?, ?)', (request.json['name'], request.json['desc']))

    return jsonify({'success' : True})

add_subcategory_schema = {
    "type": "object",
    "properties": {
        "cat_id" : {"type" : "number"},
        "name": {"$ref": "#/definitions/non-empty-string"},
        "desc": {"$ref": "#/definitions/non-empty-string"}
    },
    "definitions": {
        "non-empty-string": {
            "type": "string",
            "minLength": 1
        },
    },
    "required": ["name", "desc", "cat_id"]
}
@app.route('/admin/add_subcategory', methods=["POST"])
@admin_json_required
def add_subcategory():
    try:
        validate(instance=request.json, schema=add_subcategory_schema)
    except:
        return 'Bad request', 400
    else:
        db = get_db().cursor()

        db.execute('INSERT INTO subcategories (cat_id, name, desc) VALUES (?, ?, ?)', (request.json['cat_id'], request.json['name'], request.json['desc']))

        return jsonify({'success' : True})

remove_post_schema = {
    "type": "object",
    "properties": {
        "id": {"type": "number"}
    },
    "required": ["id"]
}
@app.route('/admin/remove_post', methods=["POST"])
@admin_json_required
def remove_post():
    try:
        validate(instance=request.json, schema=remove_post_schema)
    except:
        return 'Bad request', 400
    else:
        db = get_db().cursor()

        db.execute('DELETE FROM posts WHERE id=?', request.json['id'])

        return jsonify({'success' : True})
