from langchain_huggingface import HuggingFaceEmbeddings

from libs.config.ai import AiConfig

embeddings = HuggingFaceEmbeddings(
    model_name=AiConfig.EMBEDDING_MODEL,
    model_kwargs={
        "trust_remote_code": True,
        "model_kwargs": AiConfig.EMBEDDING_MODEL_ARGS
    },
    show_progress=True,
)
