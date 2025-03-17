from typing import List, Dict

from flask import Blueprint

chat = Blueprint('chats', __name__)

@chat.route("/", methods=["GET"])
def get_all_chats() -> List:
    return []


@chat.route("/<chat_id>", methods=["GET"])
def get_chat(chat_id: str) -> Dict:
    return {}

@chat.route("/generate-questions", methods=["GET"])
def generate_questions() -> List:
    return []
