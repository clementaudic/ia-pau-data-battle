from transformers import pipeline

# Générer une question à partir d'un sujet
def generate_question(topic):
    generator = pipeline("text-generation", model="gpt2")
    prompt = f"Pose une question sur {topic} :"
    result = generator(prompt, max_length=50, num_return_sequences=1)
    return result[0]['generated_text']

# Corriger une réponse étudiante
def correct_answer(answer):
    corrector = pipeline("text2text-generation", model="facebook/bart-large-cnn")
    correction = corrector(f"Corrige cette réponse : {answer}", max_length=50)
    return correction[0]['generated_text']
