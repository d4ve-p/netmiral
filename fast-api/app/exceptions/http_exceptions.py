from fastapi import status

from . import CustomHTTPException

class DeviceAlreadyExistsException(CustomHTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail="Device with such name already exists"
        )

class DeviceNotExistsException(CustomHTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Device not found"
        )

class InvalidIdException(CustomHTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Id not found"
        )