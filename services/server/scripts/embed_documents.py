from typing import List, Literal, Tuple

from flask import Blueprint
from langchain_core.vectorstores import VectorStoreRetriever

from libs.ai.documents import load_documents
from libs.ai.retrievers import eqe_documents_retriever, epac_documents_retriever


documents_embedding_blueprint = Blueprint("documents_embedding", __name__, cli_group=None)


@documents_embedding_blueprint.cli.command("embed-documents")
def embed_documents() -> None:
    directory_retriever_coupling: List[Tuple[Literal["eqe", "epac"], VectorStoreRetriever]] = [
        ("eqe", eqe_documents_retriever),
        ("epac", epac_documents_retriever)
    ]

    for directory, retriever in directory_retriever_coupling:
        documents = load_documents(directory)
        retriever.add_documents(documents)

