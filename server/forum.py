from flask import Flask, request, jsonify
from flask_caching import Cache
from lib.db import get_db

app = Flask(__name__, instance_relative_config=True)
app.secret_key = b"very secret key"
app.config['SECRET_KEY'] = b"very secret key"

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

import lib.auth
import lib.admin
import lib.user
import lib.rest

app.run(debug=True)