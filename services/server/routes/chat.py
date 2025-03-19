from flask import Blueprint, request, jsonify, Response
from prisma.models import Chat

from libs.database import database
from utils.api_exception import ApiException


chat_blueprint = Blueprint("chats", __name__, url_prefix="/chats")


@chat_blueprint.route("/", methods=["GET"])
def get_all_chats() -> Response:
    chats = database.chat.find_many()

    return jsonify(chats)


@chat_blueprint.route("/", methods=["POST"])
def create_chat() -> Response:
    data = request.get_json(force=True)

    # TODO: Implement creating chat

    created_chat = database.chat.create({})

    return jsonify(created_chat)

@chat_blueprint.route("/temporary/ask-question", methods=["POST"])
def ask_question_temporary() -> Response:
    data = request.get_json(force=True)

    chat_history = data.get("chat_history")
    question = data.get("question")

    if chat_history is None or question is None:
        raise ApiException(code=400, message="Chat history and question are required")

    # TODO: Implement asking question

    return jsonify({})


@chat_blueprint.route("/<chat_id>", methods=["GET"])
def get_chat(chat_id: str) -> Response:
    chat = find_chat(chat_id)

    return jsonify(chat)


@chat_blueprint.route("/<chat_id>/ask-question", methods=["POST"])
def ask_question(chat_id: str) -> Response:
    data = request.get_json(force=True)

    question = data.get("question")

    if question is None:
        raise ApiException(code=400, message="Question is required")

    chat = find_chat(chat_id)

    # TODO: Implement asking question

    return jsonify({})


@chat_blueprint.route("/<chat_id>/clear", methods=["PATCH"])
def clear_chat(chat_id: str) -> Response:
    chat = find_chat(chat_id)

    database.chat.update(where={"id": chat.id}, data={"messages": []})

    updated_chat = find_chat(chat_id)

    return jsonify(updated_chat)


@chat_blueprint.route("/<chat_id>", methods=["DELETE"])
def delete_chat(chat_id: str) -> Response:
    chat = find_chat(chat_id)

    database.chat.delete(where={"id": chat.id})

    return jsonify({})


def find_chat(chat_id: str) -> Chat:
    chat = database.chat.find_unique(where={"id": chat_id})

    if chat is None:
        raise ApiException(code=404, message="Chat not found")

    return chat
