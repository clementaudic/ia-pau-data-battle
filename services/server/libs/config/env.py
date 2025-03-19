import os
from dotenv import load_dotenv

load_dotenv()

class EnvConfig:
    DEBUG: bool = bool(os.environ.get("DEBUG"))
    DATABASE_URL: str = os.environ.get("DATABASE_URL")
