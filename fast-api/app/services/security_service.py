from datetime import timedelta, datetime, timezone

import jwt
from passlib.context import CryptContext

from .. import constants

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    """_summary_
    Verify a plain password against a hashed password.
    Args:
        plain_password (_type_): _description_
        hashed_password (bool): _description_

    Returns:
        _type_: _description_
    """
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password: str) -> str:
    """_summary_
    Hash a password using bcrypt.
    Args:
        password (str): _description_

    Returns:
        str: _description_
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expired_delta: timedelta | None = None):
    to_encode = data.copy()
    if expired_delta:
        expire = datetime.now(timezone.utc) + expired_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, constants.SECRET_KEY, algorithm=constants.SECRET_KEY_ALGORITHM)

    return encoded_jwt