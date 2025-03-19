from typing import List

from prisma.enums import ChatSubject

from models.message import Message


def answer_question(subject: ChatSubject, question: str, chat_history: List[Message]) -> str:
    return "Answer"
