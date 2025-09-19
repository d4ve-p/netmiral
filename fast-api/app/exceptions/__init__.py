from fastapi import Request
from fastapi.responses import JSONResponse

class CustomHTTPException(Exception):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail
        
async def custom_http_exception_handler(request: Request, err: CustomHTTPException):
    return JSONResponse(
        status_code=err.status_code,
        content={"detail": err.detail}
    )

