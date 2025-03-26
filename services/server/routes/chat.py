from flask import Blueprint, request, jsonify, Response
from prisma import Json
from prisma.enums import Subject
from prisma.models import Chat

from libs.ai.answer import answer_question
from libs.database import database
from models.message import Message, MessageSender
from utils.api_exception import ApiException
from utils.auth import authentication_required, get_authenticated_user
from utils.body_parser import parse_request_body
from utils.serialize import serialize_chat

chat_blueprint = Blueprint("chats", __name__, url_prefix="/chats")

@chat_blueprint.route("", methods=["GET"])
@authentication_required
def get_all_chats() -> Response:
    user = get_authenticated_user()
    chats = database.chat.find_many(
        where={"userId": user["id"]},
        order=[
            { "updatedAt": "desc" },
            { "createdAt": "desc" }
        ]
    )
    return jsonify([serialize_chat(chat) for chat in chats])


@chat_blueprint.route("", methods=["POST"])
@authentication_required
def create_chat() -> Response:
    user = get_authenticated_user()

    data = parse_request_body(request, [
        {"name": "subject", "key": "subject", "type": str, "required": True},
    ])

    subject = data.get("subject")

    database.chat.delete_many(where={
        "messages": {
            "isEmpty": True
        }
    })

    created_chat = database.chat.create(data={
        "title": f"New chat - {subject}",
        "subject": Subject(subject).value,
        "messages": [
            Json({
                "sender": MessageSender.AI.value,
                "content": "Hello! How can I help you today?"
            })
        ],
        "userId": user["id"]
    })

    return jsonify(serialize_chat(created_chat))


@chat_blueprint.route("/temporary/ask-question", methods=["POST"])
def ask_question_temporary() -> Response:
    data = parse_request_body(request, [
        {"name": "chat subject", "key": "subject", "type": str, "required": True},
        {"name": "chat history", "key": "chatHistory", "type": list, "required": True},
        {"name": "question", "key": "question", "type": str, "required": True},
    ])

    subject = data.get("subject")
    chat_history = data.get("chatHistory")
    question = data.get("question")

    answer_result = answer_question(
        question=question,
        subject=subject,
        chat_history=[Message.from_dict(message) for message in chat_history]
    )

    if not answer_result.is_successful or answer_result.answer is None:
        raise ApiException(code=502, message="Failed to answer question")

    return jsonify(answer_result.answer.to_json().data)


@chat_blueprint.route("/<chat_id>", methods=["GET"])
@authentication_required
def get_chat(chat_id: str) -> Response:
    chat = _find_chat(chat_id)

    return jsonify(serialize_chat(chat))


@chat_blueprint.route("/<chat_id>/ask-question", methods=["POST"])
@authentication_required
def ask_question(chat_id: str) -> Response:
    data = parse_request_body(request, [
        {"name": "question", "key": "question", "type": str, "required": True},
    ])

    question = data.get("question")

    chat = _find_chat(chat_id)

    answer_result = answer_question(
        subject=chat.subject,
        question=question,
        chat_history=[Message.from_json(message) for message in chat.messages]
    )

    if not answer_result.is_successful:
        raise ApiException(code=502, message="Failed to answer question")

    ai_answer = answer_result.answer.to_json()

    database.chat.update(
        where={"id": chat.id},
        data={
            "messages": [Json(message) for message in chat.messages] + [
                Json({
                    "sender": MessageSender.USER.value,
                    "content": question
                }),
                ai_answer,
            ]
        }
    )

    return jsonify(ai_answer.data)


@chat_blueprint.route("/<chat_id>/generate-questions", methods=["POST"])
@authentication_required
def generate_questions(chat_id: str) -> Response:
    chat = _find_chat(chat_id)

    print(chat.messages)

    updated_chat = database.chat.update(
        where={"id": chat.id},
        data={"messages": [Json(message) for message in chat.messages] + [
            Json({
                "sender": MessageSender.AI.value,
                "content": "Here are some questions I generated for you:"
            }),
        ]}
    )

    return jsonify(serialize_chat(updated_chat))


@chat_blueprint.route("/<chat_id>/clear", methods=["PATCH"])
@authentication_required
def clear_chat(chat_id: str) -> Response:
    chat = _find_chat(chat_id)

    database.chat.update(where={"id": chat.id}, data={"messages": []})

    updated_chat = _find_chat(chat_id)

    return jsonify(serialize_chat(updated_chat))


@chat_blueprint.route("/<chat_id>", methods=["DELETE"])
@authentication_required
def delete_chat(chat_id: str) -> Response:
    chat = _find_chat(chat_id)

    database.chat.delete(where={"id": chat.id})

    return jsonify(serialize_chat(chat))


def _find_chat(chat_id: str) -> Chat:
    user = get_authenticated_user()

    chat = database.chat.find_unique(where={
        "id": chat_id,
        "userId": user["id"]
    })

    if chat is None:
        raise ApiException(code=404, message="Chat not found")

    return chat
