from typing import List, Literal, Tuple

from flask import Blueprint, current_app as app
from langchain_core.vectorstores import VectorStoreRetriever

from libs.ai.documents import load_documents
from libs.ai.retrievers import eqe_documents_retriever, epac_documents_retriever


documents_embedding_blueprint = Blueprint("documents_embedding", __name__, cli_group=None)


@documents_embedding_blueprint.cli.command("embed-documents")
def embed_documents() -> None:
    app.logger.info("Starting document embedding...")

    directory_retriever_coupling: List[Tuple[Literal["eqe", "epac"], VectorStoreRetriever]] = [
        ("epac", epac_documents_retriever),
        ("eqe", eqe_documents_retriever),
    ]

    for directory, retriever in directory_retriever_coupling:
        documents = load_documents(directory)

        if len(documents) == 0:
            app.logger.info(f"No documents to embed from the '{directory}' directory.")
            continue

        app.logger.info(f"Adding from the '{directory}' directory to the store...")

        retriever.add_documents(documents)

