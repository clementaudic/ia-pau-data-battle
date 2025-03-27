from typing import List, Optional

from codecarbon import track_emissions
from flask import current_app as app
from langchain_core.runnables import Runnable
from prisma.enums import Subject

from libs.ai.chains import eqe_qa_chain, epac_qa_chain
from models.chain_invocation_result import ChainInvocationResult
from models.message import Message, MessageSender


@track_emissions
def answer_question(question: str, subject: Subject, chat_history: List[Message]) -> ChainInvocationResult:
    qa_chain: Optional[Runnable] = None

    match subject:
        case Subject.EQE.value:
            qa_chain = eqe_qa_chain
        case Subject.EPAC.value:
            qa_chain = epac_qa_chain

    if qa_chain is None:
        app.logger.error(f"Failed to find QA chain for subject '{subject}'")
        return ChainInvocationResult(is_successful=False)

    answer = qa_chain.invoke({
        "question": question,
        "chat_history": [message.to_lc_message() for message in chat_history]
    })

    return ChainInvocationResult(
        is_successful=True,
        result=Message(sender=MessageSender.AI, content=answer)
    )
