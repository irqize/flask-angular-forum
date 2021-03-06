from flask import jsonify, request, session
from jsonschema import validate
import json
import time
from werkzeug.security import generate_password_hash, check_password_hash

from forum import app
from lib.db import get_db

@app.route('/api/get_categories')
def get_categories():
    db = get_db().cursor()

    db.execute('SELECT * FROM categories')
    categories = list(db.fetchall())

    db.execute('SELECT * FROM subcategories')
    subcategories = list(db.fetchall())

    formatted_categories = []

    for category in categories:
        cat = {
            "id": category[0],
            "name": category[1],
            "desc": category[2]
        }
        subcs = list(filter(lambda subc: subc[1] == cat['id'], subcategories))
        subcs = list(map(lambda subc: {"id": subc[0], "name": subc[2], "desc": subc[3]}, subcs))

        cat['subcategories'] = subcs

        formatted_categories.append(cat)

    return jsonify({'categories': formatted_categories})

@app.route('/api/get_subcategory/<int:subcategory>')
def get_subcategory(subcategory):
    db = get_db().cursor()

    db.execute('SELECT * FROM subcategories WHERE id=?', (subcategory,))
    
    subcategoryObj = db.fetchone()
    if subcategoryObj is None:
        return jsonify({error: "Subcategory doesn't exist."}), 404

    subcategoryObj = {
        'name': subcategoryObj[2],
        'desc' : subcategoryObj[3]
    }

    db.execute('SELECT threads.id, threads.title, threads.time_created, threads.content, accounts.name, is_admin FROM threads JOIN accounts ON threads.author_id = accounts.id WHERE sub_cat_id=? ', (subcategory,))
    threads = list(db.fetchall())

    threads = list(map(lambda thread: {"id" : thread[0], "title" : thread[1], "time_created" : thread[2], "content" : thread[3] ,"author_name" : thread[4], "is_admin": thread[5] != 0}, threads))

    subcategoryObj['threads'] = threads

    return jsonify({"subcategory": subcategoryObj})

@app.route('/api/get_thread/<int:thread_id>')
def get_thread(thread_id):
    db = get_db().cursor()

    db.execute('SELECT sub_cat_id, author_id, title, threads.time_created, content, name, is_admin FROM threads JOIN accounts ON threads.author_id=accounts.id WHERE threads.id=?', (thread_id,))
    thread = list(db.fetchone())

    if len(thread) == 0:
        return jsonify({"success": False}), 404

    threadObj = {
        "sub_cat_id": thread[0],
        "author_id": thread[1],
        "title": thread[2],
        "time_created": thread[3],
        "content": thread[4],
        "author_name": thread[5],
        "is_admin": thread[6] != 0
    }   

    db.execute('SELECT posts.id, posts.content, posts.time_created, accounts.name, is_admin FROM posts JOIN accounts ON author_id = accounts.id WHERE thread_id=?', (thread_id,))
    posts = list(db.fetchall())
    posts = list(map(lambda post: {"id": post[0], "content": post[1], "time_created": post[2], "author_name": post[3], "is_admin" : post[4] != 0}, posts))

    threadObj['posts'] = posts

    return jsonify({"thread": threadObj})