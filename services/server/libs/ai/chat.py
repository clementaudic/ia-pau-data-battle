from typing import List, Optional

from prisma.enums import ChatSubject

from models.message import Message


class AnswerResult:
    def __init__(self, is_successful: bool = False, answer: Optional[Message] = None):
        self._is_successful = is_successful
        self._answer = answer

    @property
    def is_successful(self) -> bool:
        return self._is_successful

    @property
    def answer(self) -> Optional[Message]:
        return self._answer

def answer_question(question: str, subject: ChatSubject, chat_history: List[Message]) -> AnswerResult:
    return AnswerResult()
