from flask import Blueprint, request, jsonify
from models.model import generate_question, correct_answer

api_bp = Blueprint('api', __name__)

@api_bp.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    topic = data.get("topic", "math")
    question = generate_question(topic)
    return jsonify({"question": question})

@api_bp.route('/api/correct', methods=['POST'])
def correct():
    data = request.json
    student_answer = data.get("answer", "")
    correction = correct_answer(student_answer)
    return jsonify({"correction": correction})
