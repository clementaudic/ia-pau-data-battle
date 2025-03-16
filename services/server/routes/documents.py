# API pour uploader et stocker les fichiers

from flask import Blueprint, request, jsonify
from utils.pdf_processing import extract_text_from_pdf
import os

documents_bp = Blueprint('documents', __name__)

UPLOAD_FOLDER = "data/legal_docs"

@documents_bp.route("/upload", methods=["POST"])
def upload_pdf():
    file = request.files["file"]
    if file.filename.endswith(".pdf"):
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        text = extract_text_from_pdf(file_path)
        return jsonify({"message": "Document uploaded", "content": text})
    return jsonify({"error": "Invalid file format"}), 400
