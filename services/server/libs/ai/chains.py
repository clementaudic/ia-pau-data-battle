from langchain_core.prompts import ChatPromptTemplate
from langchain_core.retrievers import BaseRetriever
from langchain_core.runnables import Runnable, RunnablePassthrough

from libs.ai.llm import llm
from libs.ai.prompts.rephrasing import REPHRASING_PROMPT
from libs.ai.prompts.system import EQE_SYSTEM_PROMPT, EPAC_SYSTEM_PROMPT
from libs.ai.retrievers import eqe_documents_retriever, epac_documents_retriever


def _build_chain(retriever: BaseRetriever, documents_prompt: ChatPromptTemplate) -> Runnable:
    def retrieve_with_context(inputs):
        contextualized_question = REPHRASING_PROMPT.invoke({
            "chat_history": inputs["chat_history"],
            "question": inputs["question"]
        })

        relevant_documents = retriever.invoke(contextualized_question)

        return {
            "context": relevant_documents,
            "question": inputs["question"],
            "chat_history": inputs["chat_history"]
        }

    chain_with_documents = (
        RunnablePassthrough()
        | retrieve_with_context
        | documents_prompt
        | llm
    )

    return chain_with_documents


eqe_qa_chain = _build_chain(eqe_documents_retriever, EQE_SYSTEM_PROMPT)

epac_qa_chain = _build_chain(epac_documents_retriever, EPAC_SYSTEM_PROMPT)
