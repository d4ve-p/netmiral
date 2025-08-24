from passlib.context import CryptContext

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