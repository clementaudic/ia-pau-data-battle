from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from libs.ai.llm import llm

_template = """
Given the conversation history and the latest user question, create a standalone question that includes all context 
needed to retrieve relevant information. Don't answer the question, just reformulate it to be more effective for retrieval.

CONVERSATION HISTORY:
{chat_history}

USER QUESTION:
{question}

STANDALONE QUESTION FOR RETRIEVAL:
"""

REPHRASING_PROMPT = ChatPromptTemplate.from_template(_template) | llm | StrOutputParser()
