from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, HumanMessagePromptTemplate

_eqe_template = """
You are asked a question about the European Qualifying Examination (EQE).
"""

_epac_template = """
You are asked a question about the European Patent Application Convention (EPAC).
"""

_shared_template = """
Answer the question with explanations and cite 
relevant articles and rules if needed. If you don't know the answer, say that you don't know.

Context for the question (from relevant documents):
{context}

User question:
{question}
"""

_shared_messages = [
    MessagesPlaceholder(variable_name="chat_history"),
    HumanMessagePromptTemplate.from_template(_shared_template),
]


def _create_system_prompt(template: str) -> ChatPromptTemplate:
    return ChatPromptTemplate.from_messages([
        SystemMessage(content=template)
    ] + _shared_messages)


EQE_SYSTEM_PROMPT = _create_system_prompt(_eqe_template)

EPAC_SYSTEM_PROMPT = _create_system_prompt(_epac_template)
