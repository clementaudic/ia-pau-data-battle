from typing import List, Literal

from langchain_core.documents import Document
from langchain_core.vectorstores import VectorStoreRetriever
from langchain_text_splitters import RecursiveCharacterTextSplitter

from libs.config.ai import AiConfig

_text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=AiConfig.DOCUMENT_CHUNK_SIZE,
    chunk_overlap=AiConfig.DOCUMENT_CHUNK_OVERLAP
)

def _load_documents() -> List[Document]:
    # TODO: Implement documents loading logic
    return []


def embed_documents(retriever: VectorStoreRetriever, collection_name: Literal["eqe", "epac"]) -> None:
    match collection_name:
        case "eqe":
            eqe_documents = _load_documents()
            retriever.add_documents(eqe_documents)
        case "epac":
            epac_documents = _load_documents()
            retriever.add_documents(epac_documents)
