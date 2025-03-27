from typing import List, Dict, Any

from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.retrievers import BaseRetriever
from langchain_core.runnables import Runnable, RunnablePassthrough

from libs.ai.llm import llm
from libs.ai.prompts.system.gen import EQE_GEN_SYSTEM_PROMPT, EPAC_GEN_SYSTEM_PROMPT
from libs.ai.prompts.system.qa import EQE_QA_SYSTEM_PROMPT, EPAC_QA_SYSTEM_PROMPT
from libs.ai.retrievers import eqe_documents_retriever, epac_documents_retriever


def _format_documents(documents: List[Document]) -> str:
    formatted_docs = []

    for i, document in enumerate(documents):
        source = document.metadata.get("source", "Unknown source")
        citation = f"[DOCUMENT {i + 1}] Reference: {source}"

        formatted_text = f"{citation}\n\n{document.page_content}\n"
        formatted_docs.append(formatted_text)

    return "\n\n".join(formatted_docs)


def _build_qa_chain(retriever: BaseRetriever, qa_prompt: ChatPromptTemplate) -> Runnable:
    def retrieve_and_prepare_context(inputs: Dict[str, Any]) -> Dict[str, Any]:
        from libs.ai.prompts.rephrasing import REPHRASING_PROMPT

        question = inputs["question"]
        chat_history = inputs.get("chat_history", [])

        contextualized_question = REPHRASING_PROMPT.invoke({
            "chat_history": chat_history,
            "question": question
        })

        relevant_documents = retriever.invoke(contextualized_question)

        return {
            "context": _format_documents(relevant_documents),
            "question": question,
            "chat_history": chat_history
        }

    chain_with_documents = (
        RunnablePassthrough()
        | retrieve_and_prepare_context
        | qa_prompt
        | llm
        | StrOutputParser()
    )

    return chain_with_documents


def _build_gen_chain(retriever: BaseRetriever, gen_prompt: ChatPromptTemplate) -> Runnable:
    def retrieve_and_prepare_context(inputs: Dict[str, Any]) -> Dict[str, Any]:
        from libs.ai.prompts.rephrasing import REPHRASING_PROMPT

        contextualized_request = REPHRASING_PROMPT.invoke({
            "chat_history": inputs.get("chat_history", []),
            "question": "Generate questions about the context"
        })

        relevant_documents = retriever.invoke(contextualized_request)

        return {
            "context": _format_documents(relevant_documents),
            "chat_history": inputs.get("chat_history", []),
            "question_type": inputs["question_type"]
        }

    chain_with_documents = (
        RunnablePassthrough()
        | retrieve_and_prepare_context
        | gen_prompt
        | llm
        | StrOutputParser()
    )

    return chain_with_documents


eqe_qa_chain = _build_qa_chain(eqe_documents_retriever, EQE_QA_SYSTEM_PROMPT)

epac_qa_chain = _build_qa_chain(epac_documents_retriever, EPAC_QA_SYSTEM_PROMPT)

eqe_gen_chain = _build_gen_chain(eqe_documents_retriever, EQE_GEN_SYSTEM_PROMPT)

epac_gen_chain = _build_gen_chain(epac_documents_retriever, EPAC_GEN_SYSTEM_PROMPT)
