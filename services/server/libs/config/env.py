import os
from dotenv import load_dotenv

load_dotenv()

class EnvConfig:
    DEBUG: bool = os.environ.get("DEBUG") == "True" or False
    DATABASE_URL: str = os.environ.get("DATABASE_URL")
