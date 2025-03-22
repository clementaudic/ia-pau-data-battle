from os import path
from typing import List, Literal, Optional, Iterator

from langchain_community.document_loaders import DirectoryLoader, UnstructuredPDFLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from libs.config.ai import AiConfig

DATA_DIRECTORY = path.join("data", "raw")


_text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=AiConfig.DOCUMENT_CHUNK_SIZE,
    chunk_overlap=AiConfig.DOCUMENT_CHUNK_OVERLAP
)

_legal_publications_loader = DirectoryLoader(
    path=path.join(DATA_DIRECTORY, "legal_pubs"),
    loader_cls=UnstructuredPDFLoader,
    use_multithreading=True,
    max_concurrency=10,
    sample_size=1
)

_legal_publications_documents: Optional[List[Document]] = None


def load_documents(directory: Literal["eqe", "epac"]) -> List[Document]:
    global _legal_publications_documents

    if _legal_publications_documents is None:
        _legal_publications_documents = []

        loaded_legal_publications: Iterator[Document] = _legal_publications_loader.lazy_load()

        _legal_publications_documents = _text_splitter.split_documents(loaded_legal_publications)


    # TODO: Implement exams loading logic

    return _legal_publications_documents

