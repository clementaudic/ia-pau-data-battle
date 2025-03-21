from typing import List, Literal

from langchain_core.documents import Document
from langchain_core.vectorstores import VectorStoreRetriever
from langchain_text_splitters import RecursiveCharacterTextSplitter

from libs.config.ai import AiConfig

_text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=AiConfig.DOCUMENT_CHUNK_SIZE,
    chunk_overlap=AiConfig.DOCUMENT_CHUNK_OVERLAP
)

def load_documents(directory: Literal["eqe", "epac"]) -> List[Document]:
    # TODO: Implement documents loading logic
    return []

