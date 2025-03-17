from flask import Flask
from flask_cors import CORS
from routes.chat import chat

app = Flask(__name__)

CORS(app)

app.register_blueprint(chat)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
