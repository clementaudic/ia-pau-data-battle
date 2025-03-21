import os
from dotenv import load_dotenv

load_dotenv()

class EnvConfig:
    DATABASE_URL: str = os.environ.get("DATABASE_URL")
    OLLAMA_API_URL: str = os.environ.get("OLLAMA_API_URL")
    PROCESS_DOCUMENTS: bool = os.environ.get("PROCESS_DOCUMENTS") == "True" or False
