'''
Extraction des concepts clés et génération des questions.
'''

from llm_model import get_llm_response

def generate_questions(context):
    prompt = f"Génère 5 questions pertinentes sur : {context}"
    return get_llm_response(prompt)
