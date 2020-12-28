from flask import Flask
from flask_cors import CORS

def create_app(application_name: str):
    app = Flask(application_name, instance_relative_config=False)

    CORS(app)

    app.url_map.strict_slashes = False

    @app.route('/')
    def root():
        return '{name} is running'.format(name = application_name)

    root()
    return app