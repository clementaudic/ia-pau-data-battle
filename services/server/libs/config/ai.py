from typing import Dict, Any


class AiConfig:
    EMBEDDING_MODEL: str = "nomic-ai/nomic-embed-text-v1"
    EMBEDDING_MODEL_ARGS: Dict[str, Any] = {
        "task_type": "search_query",
        "inference_mode": "local",
        "device": "gpu",
    }

    DOCUMENT_CHUNK_SIZE: int = 1000
    DOCUMENT_CHUNK_OVERLAP: int = 100

    LLM_MODEL: str = "nemotron-mini"
    LLM_CONTEXT_WINDOW: int = 4096
    LLM_TEMPERATURE: float = 0.2
    LLM_TOP_K: int = 20
    LLM_TOP_P: float = 0.7
    LLM_NUM_PREDICT: int = 1024
    LLM_REPEAT_PENALTY: float = 1.2
