'''
Transformer les textes en vecteurs (embeddings)
Utiliser SentenceTransformer (BERT) pour stocker et rechercher efficacement.
'''

from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def get_embedding(text):
    return model.encode(text).tolist()
