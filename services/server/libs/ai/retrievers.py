from typing import Literal

from langchain_core.vectorstores import VectorStoreRetriever
from langchain_postgres import PGVector

from libs.ai.documents import embed_documents
from libs.ai.embedding import embeddings
from libs.config.env import EnvConfig

are_documents_processed: bool = False

def _get_documents_retriever(collection_name: Literal["eqe", "epac"]) -> VectorStoreRetriever:
    global are_documents_processed

    retriever = PGVector(
        collection_name=collection_name,
        embeddings=embeddings,
        connection=EnvConfig.DATABASE_URL,
        use_jsonb=True
    ).as_retriever()

    if EnvConfig.PROCESS_DOCUMENTS and not are_documents_processed:
        embed_documents(retriever, collection_name)
        are_documents_processed = True

    return retriever


eqe_documents_retriever = _get_documents_retriever("eqe")

epac_documents_retriever = _get_documents_retriever("epac")
