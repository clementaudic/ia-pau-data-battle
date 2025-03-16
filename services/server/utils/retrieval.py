'''
Recherche dans la base de connaissances
'''

import faiss
import numpy as np

from services.server.utils.embedding import get_embedding

class DocumentRetriever:
    def __init__(self, dimension=384):
        self.index = faiss.IndexFlatL2(dimension)
        self.docs = []

    def add_document(self, text):
        embedding = np.array([get_embedding(text)], dtype=np.float32)
        self.index.add(embedding)
        self.docs.append(text)

    def search(self, query, top_k=3):
        query_embedding = np.array([get_embedding(query)], dtype=np.float32)
        _, indices = self.index.search(query_embedding, top_k)
        return [self.docs[i] for i in indices[0]]

retriever = DocumentRetriever()
