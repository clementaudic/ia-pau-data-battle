from flask import Flask
from flask_cors import CORS

from libs.error_handlers import register_error_handlers
from libs.logging import setup_logging
from routes.chat import chat_blueprint
from routes.base import base_blueprint
from routes.auth import auth_blueprint

setup_logging()

app = Flask(__name__)

CORS(app, origins="*", supports_credentials=True)

app.register_blueprint(base_blueprint)
app.register_blueprint(chat_blueprint)
app.register_blueprint(auth_blueprint)

register_error_handlers(app)
