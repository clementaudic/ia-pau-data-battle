from os import path
from typing import List, Literal, Optional, Iterator

from langchain_community.document_loaders import DirectoryLoader, UnstructuredPDFLoader, TextLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from libs.config.ai import AiConfig


_legal_publications_documents: Optional[List[Document]] = None


def load_documents(directory: Literal["eqe", "epac"]) -> List[Document]:
    global _legal_publications_documents

    data_directory = path.join("data", "cleaned")

    #if _legal_publications_documents is None:
    if _legal_publications_documents is not None:
        pdf_splitter = RecursiveCharacterTextSplitter(
            chunk_size=AiConfig.DOCUMENT_CHUNK_SIZE,
            chunk_overlap=AiConfig.DOCUMENT_CHUNK_OVERLAP
        )

        legal_publications_loader = DirectoryLoader(
            path=path.join(data_directory, "legal_pubs"),
            loader_cls=UnstructuredPDFLoader,
            use_multithreading=True,
            max_concurrency=10,
            sample_size=1
        )

        _legal_publications_documents = []

        loaded_legal_publications: Iterator[Document] = legal_publications_loader.lazy_load()

        _legal_publications_documents = pdf_splitter.split_documents(loaded_legal_publications)

    directory_loader = DirectoryLoader(
        path=path.join(data_directory, directory),
        loader_cls=TextLoader,
        recursive=True,
        use_multithreading=True,
        max_concurrency=10,
    )

    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n\n", "\n\n", "\n"],
        keep_separator=False,
        chunk_size=AiConfig.DOCUMENT_CHUNK_SIZE,
        chunk_overlap=AiConfig.DOCUMENT_CHUNK_OVERLAP,
    )

    loaded_documents = directory_loader.lazy_load()

    documents = text_splitter.split_documents(loaded_documents)

    #documents.extend(_legal_publications_documents)

    return documents

