# Endpoint API pour le chatbot

from flask import Blueprint, request, jsonify
from models.rag_model import retriever
from models.llm_model import get_llm_response
from services.server.models.question_generator import generate_questions

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route("/chat", methods=["POST"])
def chat():
    data = request.json
    question = data["question"]
    relevant_docs = retriever.search(question)
    
    prompt = f"Basé sur ces documents : {relevant_docs} \nRéponds précisément : {question}"
    answer = get_llm_response(prompt)
    
    return jsonify({"answer": answer})

@chatbot_bp.route("/generate-questions", methods=["POST"])
def generate_questions_api():
    data = request.json
    context = data["context"]
    questions = generate_questions(context)
    return jsonify({"questions": questions})
