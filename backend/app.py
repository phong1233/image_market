from flask import Flask
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from app.image.controller import image_routes
from app.helpers.mongo.mongo_setup import db_connection

app = Flask(__name__)

CORS(app)

app.url_map.strict_slashes = False
app.register_blueprint(image_routes, url_prefix='/image')

@app.route('/')
def root():
    return 'app is running'

root()

app.run()