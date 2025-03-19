from flask import Flask
from flask_cors import CORS

from libs.handlers import register_error_handlers
from routes.chat import chat_blueprint
from routes.base import base_blueprint

app = Flask(__name__)

CORS(app)

app.register_blueprint(base_blueprint)
app.register_blueprint(chat_blueprint)
register_error_handlers(app)

if __name__ == "__main__":
    app.run(debug=True, port=5000, threaded=True)
