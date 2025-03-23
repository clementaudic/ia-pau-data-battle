from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from libs.ai.llm import llm

_template = """
You are an expert in European patent law and examination procedures. Your task is to reformulate user questions into optimal search queries for retrieving relevant patent law information.

When reformulating questions, follow these guidelines:
1. Extract all relevant legal concepts and terminology
2. Include specific EPC articles, rules, or guidelines mentioned
3. Preserve references to case law (e.g., T, G, or J decisions)
4. Incorporate essential context from prior conversation
5. Use standardized European patent terminology
6. Prioritize legal precision over conversational style
7. Convert implicit questions to explicit ones
8. Remove irrelevant personal details or pleasantries

EXAMPLES:
Original: "Can I still file if I missed the priority year?"
Reformulated: "Legal consequences and remedies for missing the 12-month priority period under Article 87 EPC"

Original: "What does the EPO say about patenting AI?"
Reformulated: "European Patent Office guidelines and practice on patenting artificial intelligence inventions, including subject matter eligibility under Article 52 EPC"

Original: "Last time we discussed added matter in claims. Now I'm wondering about the description too."
Reformulated: "Requirements and practice regarding added matter (Article 123(2) EPC) in the description of European patent applications"

CONVERSATION HISTORY:
{chat_history}

USER QUESTION:
{question}

STANDALONE QUESTION FOR RETRIEVAL:
"""

REPHRASING_PROMPT = ChatPromptTemplate.from_template(_template) | llm | StrOutputParser()
