from typing import Dict, Any


class AiConfig:
    EMBEDDING_MODEL: str = "nomic-ai/nomic-embed-text-v1"
    EMBEDDING_MODEL_ARGS: Dict[str, Any] = {
        "task_type": "search_query",
        "inference_mode": "local",
        "device": "gpu",
    }

    LLM_MODEL: str = "nemotron-mini"
    LLM_TEMPERATURE: float = 0.25
    LLM_TOP_K: int = 10
    LLM_TOP_P: float = 0.25
    LLM_NUM_PREDICT: int = -2
    LLM_REPEAT_PENALTY: float = 0.25
    LLM_REPEAT_LAST_N: int = -1
