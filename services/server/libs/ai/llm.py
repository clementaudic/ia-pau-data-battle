from langchain_ollama import OllamaLLM

from libs.config.ai import AiConfig

llm = OllamaLLM(
    model=AiConfig.LLM_MODEL,
    temperature=AiConfig.LLM_TEMPERATURE,
    top_k=AiConfig.LLM_TOP_K,
    top_p=AiConfig.LLM_TOP_P,
    num_predict=AiConfig.LLM_NUM_PREDICT,
    repeat_penalty=AiConfig.LLM_REPEAT_PENALTY,
    repeat_last_n=AiConfig.LLM_REPEAT_LAST_N,
)
