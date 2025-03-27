from random import choice
from typing import List, Optional

from codecarbon import track_emissions
from flask import current_app as app
from langchain_core.runnables import Runnable
from prisma.enums import Subject

from libs.ai.chains import eqe_gen_chain, epac_gen_chain
from libs.ai.prompts.system.gen import QuestionType
from models.chain_invocation_result import ChainInvocationResult
from models.message import Message, MessageSender


@track_emissions
def generate_questions(subject: Subject, chat_history: List[Message]) -> ChainInvocationResult:
    gen_chain: Optional[Runnable] = None

    match subject:
        case Subject.EQE.value:
            gen_chain = eqe_gen_chain
        case Subject.EPAC.value:
            gen_chain = epac_gen_chain

    if gen_chain is None:
        app.logger.error(f"Failed to find GEN chain for subject '{subject}'")
        return ChainInvocationResult(is_successful=False)

    questions = gen_chain.invoke({
        "question_type": choice([
            QuestionType.MULTIPLE_CHOICE.value,
            QuestionType.TRUE_FALSE.value,
            QuestionType.OPEN_ENDED.value
        ]),
        "chat_history": [message.to_lc_message() for message in chat_history]
    })

    return ChainInvocationResult(
        is_successful=True,
        result=Message(sender=MessageSender.AI, content=questions)
    )
