from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, HumanMessagePromptTemplate

_eqe_template = """

"""

_epac_template = """

"""

_shared_template = """
Context for the question (from the documents):
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
