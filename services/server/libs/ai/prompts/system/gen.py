from enum import StrEnum

from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate


class QuestionType(StrEnum):
    OPEN_ENDED = "Open-Ended"
    MULTIPLE_CHOICE = "Multiple Choice"
    TRUE_FALSE = "True/False"


_shared_template = """
Your task is to generate a set of high-quality exam-style questions based on the provided context. 
Follow these critical guidelines:

1. QUESTION GENERATION CRITERIA:
- Do NOT mention the usage of the context or chat history. Focus solely on generating questions.
- Generate 5 questions
- Align questions precisely with the source document's content
- Cover key legal concepts, procedural details, and substantive patent law principles
- Vary difficulty levels within a single set (easy, medium, challenging)
- Ensure questions test deep understanding, not just surface-level recall
- Provide questions in a clear, structured format. Separate each question with two line breaks.
- Do NOT include answers or explanations

2. MULTIPLE CHOICE SPECIFICATIONS (if selected):
- Provide 4 answer options
- Ensure one correct answer
- Make distractors plausible but clearly incorrect

3. TRUE/FALSE SPECIFICATIONS (if selected):
- Formulate statements that require nuanced understanding
- Provide explanation for why the statement is true or false

4. OPEN-ENDED SPECIFICATIONS (if selected):
- Craft questions that require analytical thinking
- Encourage comprehensive, structured responses

CONTEXT:
{context}

CHAT HISTORY:
{chat_history}
"""

_eqe_template = f"""
You are an expert European Patent Exam question generator with deep knowledge of the European Qualifying Examination 
(EQE) standards.

{_shared_template}
"""

_epac_template = f"""
You are an expert European Patent Exam question generator with deep knowledge of the European Patent Convention (EPC).

{_shared_template}
"""

_task_template = """
Generate a set of exam-style relevant {question_type} questions to help me train. 
Do NOT include any introductory sentence or context from the chat history. Do NOT include answers or explanations.
"""

_shared_messages = [
    HumanMessagePromptTemplate.from_template(_task_template),
]

def _create_gen_system_prompt(template: str) -> ChatPromptTemplate:
    return ChatPromptTemplate.from_messages([
        SystemMessage(content=template),
    ] + _shared_messages)


EPAC_GEN_SYSTEM_PROMPT = _create_gen_system_prompt(_epac_template)

EQE_GEN_SYSTEM_PROMPT = _create_gen_system_prompt(_eqe_template)
