from typing import TypedDict, List

from prisma import Json
from prisma.models import Chat, User


SerializedChat = TypedDict(
    'SerializedChat',
    {
        "id": str,
        "createdAt": str,
        "title": str,
        "subject": str,
        "messages": List[Json],
        "userId": str
    }
)

def serialize_chat(chat: Chat) -> SerializedChat:
    return {
        "id": chat.id,
        "createdAt": chat.createdAt.isoformat(),
        "title": chat.title,
        "subject": chat.subject,
        "messages": chat.messages,
        "userId": chat.userId
    }


SerializedUser = TypedDict(
    'SerializedUser',
    {
        "id": str,
        "email": str,
        "firstName": str,
        "lastName": str
    }
)

def serialize_user(user: User) -> SerializedUser:
    return {
        "id": user.id,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName
    }
