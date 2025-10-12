from pydantic import BaseModel
from typing import Dict

from .AccessList import ACL

class StructuredConfig(BaseModel):
    acls: Dict[str, ACL] = {}