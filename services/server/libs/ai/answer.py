from typing import List, Optional

from flask import current_app as app
from langchain_core.runnables import Runnable
from prisma.enums import Subject

from libs.ai.chains import eqe_qa_chain, epac_qa_chain
from models.message import Message, MessageSender


class _AnswerResult:
    def __init__(self, is_successful: bool, answer: Optional[Message] = None) -> None:
        self._is_successful = is_successful
        self._answer = answer

    @property
    def is_successful(self) -> bool:
        return self._is_successful

    @property
    def answer(self) -> Optional[Message]:
        return self._answer


def answer_question(question: str, subject: Subject, chat_history: List[Message]) -> _AnswerResult:
    qa_chain: Optional[Runnable] = None

    match subject:
        case Subject.EQE.value:
            qa_chain = eqe_qa_chain
        case Subject.EPAC.value:
            qa_chain = epac_qa_chain

    if qa_chain is None:
        app.logger.error(f"Failed to find QA chain for subject '{subject}'")
        return _AnswerResult(is_successful=False)

    answer = qa_chain.invoke({
        "question": question,
        "chat_history": [message.to_lc_message() for message in chat_history]
    })

    return _AnswerResult(
        is_successful=True,
        answer=Message(sender=MessageSender.AI, content=answer)
    )
