import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "default key")
SECRET_KEY_ALGORITHM= os.getenv("SECRET_KEY_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES= int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 15))