from flask import Blueprint, request, jsonify, Response
from prisma.enums import ChatSubject
from prisma.models import Chat

from libs.ai.chat import answer_question
from libs.database import database
from models.message import Message, MessageSender
from utils.api_exception import ApiException
from utils.body_parser import parse_request_body

chat_blueprint = Blueprint("chats", __name__, url_prefix="/chats")


@chat_blueprint.route("/", methods=["GET"])
def get_all_chats() -> Response:
    chats = database.chat.find_many()

    return jsonify(chats)


@chat_blueprint.route("/", methods=["POST"])
def create_chat() -> Response:
    data = parse_request_body(request, [
        {"name": "subject", "key": "subject", "type": str, "required": True},
        {"name": "first_message", "key": "first_message", "type": str, "required": True},
    ])

    subject = data.get("subject")
    first_message = data.get("first_message")

    created_chat = database.chat.create({
        "subject": ChatSubject(subject).value,
        "messages": [{
            "sender": MessageSender.AI.value,
            "content": first_message
        }]
    })

    return jsonify(created_chat)

@chat_blueprint.route("/temporary/ask-question", methods=["POST"])
def ask_question_temporary() -> Response:
    data = parse_request_body(request, [
        {"name": "chat subject", "key": "subject", "type": str, "required": True},
        {"name": "chat history", "key": "chat_history", "type": list, "required": True},
        {"name": "question", "key": "question", "type": str, "required": True},
    ])

    subject = data.get("subject")
    chat_history = data.get("chat_history")
    question = data.get("question")

    answer_result = answer_question(
        question,
        subject,
        [Message.from_dict(message) for message in chat_history]
    )

    if not answer_result.is_successful or answer_result.answer is None:
        raise ApiException(code=502, message="Failed to answer question")

    return jsonify(answer_result.answer.to_json())


@chat_blueprint.route("/<chat_id>", methods=["GET"])
def get_chat(chat_id: str) -> Response:
    chat = _find_chat(chat_id)

    return jsonify(chat)


@chat_blueprint.route("/<chat_id>/ask-question", methods=["POST"])
def ask_question(chat_id: str) -> Response:
    data = parse_request_body(request, [
        {"name": "question", "key": "question", "type": str, "required": True},
    ])

    question = data.get("question")

    chat = _find_chat(chat_id)

    answer_result = answer_question(
        chat.subject,
        question,
        [Message.from_json(message) for message in chat.messages]
    )

    if not answer_result.is_successful:
        raise ApiException(code=502, message="Failed to answer question")

    return jsonify(answer_result.answer.to_json())


@chat_blueprint.route("/<chat_id>/clear", methods=["PATCH"])
def clear_chat(chat_id: str) -> Response:
    chat = _find_chat(chat_id)

    database.chat.update(where={"id": chat.id}, data={"messages": []})

    updated_chat = _find_chat(chat_id)

    return jsonify(updated_chat)


@chat_blueprint.route("/<chat_id>", methods=["DELETE"])
def delete_chat(chat_id: str) -> Response:
    chat = _find_chat(chat_id)

    database.chat.delete(where={"id": chat.id})

    return jsonify(chat)


def _find_chat(chat_id: str) -> Chat:
    chat = database.chat.find_unique(where={"id": chat_id})

    if chat is None:
        raise ApiException(code=404, message="Chat not found")

    return chat
