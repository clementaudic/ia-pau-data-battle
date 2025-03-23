from langchain_ollama import OllamaLLM

from libs.config.ai import AiConfig
from libs.config.env import EnvConfig

llm = OllamaLLM(
    base_url=EnvConfig.OLLAMA_API_URL,
    model=AiConfig.LLM_MODEL,
    num_ctx=AiConfig.LLM_CONTEXT_WINDOW,
    temperature=AiConfig.LLM_TEMPERATURE,
    top_k=AiConfig.LLM_TOP_K,
    top_p=AiConfig.LLM_TOP_P,
    num_predict=AiConfig.LLM_NUM_PREDICT,
    repeat_penalty=AiConfig.LLM_REPEAT_PENALTY,
)
