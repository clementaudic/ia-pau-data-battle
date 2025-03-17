from typing import List, Dict

from flask import Blueprint

from libs.database import database

chat_blueprint = Blueprint('chats', __name__, url_prefix='/chats')

@chat_blueprint.route("/", methods=["GET"])
def get_all_chats() -> List:
    return database.chat.find_many()


@chat_blueprint.route("/", methods=["POST"])
def create_chat() -> Dict:
    return {}

@chat_blueprint.route("/<chat_id>", methods=["GET"])
def get_chat(chat_id: str) -> Dict:
    found_chat = database.chat.find_unique(where={ "id": chat_id })

    if found_chat is None:
        raise Exception(f"Chat with id {chat_id} not found")

    return found_chat

@chat_blueprint.route("/<chat_id>/ask-question", methods=["POST"])
def ask_question(chat_id: str) -> Dict:
    return {}


@chat_blueprint.route("/<chat_id>/clear", methods=["POST"])
def clear_chat(chat_id: str) -> Dict:
    return {}


@chat_blueprint.route("/generate-questions", methods=["GET"])
def generate_questions() -> List:
    return []
