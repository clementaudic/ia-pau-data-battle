from flask import Flask
from flask_cors import CORS

from libs.error_handlers import register_error_handlers
from libs.logging import setup_logging
from routes.chat import chat_blueprint
from routes.base import base_blueprint
from routes.auth import auth_blueprint
from scripts.embed_documents import documents_embedding_blueprint
from utils.auth import init_auth

setup_logging()

app = Flask(__name__)

CORS(
    app=app,
    origins=["http://localhost:3000", "http://ui:3000"],
    supports_credentials=True
)

init_auth(app)

app.register_blueprint(base_blueprint)
app.register_blueprint(chat_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(documents_embedding_blueprint)

register_error_handlers(app)
