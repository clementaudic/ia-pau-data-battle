from typing import Literal

from langchain_core.vectorstores import VectorStoreRetriever
from langchain_postgres import PGVector

from libs.ai.embedding import embeddings
from libs.config.env import EnvConfig


def _get_documents_retriever(collection_name: Literal["eqe", "epac"]) -> VectorStoreRetriever:
    return PGVector(
        collection_name=collection_name,
        embeddings=embeddings,
        connection=EnvConfig.DATABASE_URL,
        use_jsonb=True
    ).as_retriever(search_kwargs={
        "k": 5,
        "score_threshold": 0.7,
        "fetch_k": 20
    })


eqe_documents_retriever = _get_documents_retriever("eqe")

epac_documents_retriever = _get_documents_retriever("epac")
