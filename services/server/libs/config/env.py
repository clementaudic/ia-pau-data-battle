import os
from dotenv import load_dotenv

load_dotenv()

class EnvConfig:
    DATABASE_URL = os.environ.get("DATABASE_URL")
