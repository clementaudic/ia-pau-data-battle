'''
Ce fichier aide à l'extraction des texts des pdf
Potentiellement à compléter car pas complet
'''

import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"
    return text
