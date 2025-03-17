'''
Générer une réponse en utilisant un modèle type GPT-4, mais on peut aussi utiliser Llama, Mistral.
Utiliser OpenAI API
'''

import openai

openai.api_key = "API_KEY"

def get_llm_response(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]
