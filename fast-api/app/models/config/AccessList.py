import uuid
from enum import Enum
from pydantic import Field, BaseModel
from typing import List

class ACLAction(str, Enum):
    PERMIT = "permit"
    DENY = "deny"

class ACLProtocol(str, Enum):
    AHP = "ahp"
    EIGRP = "eigrp"
    ESP = "esp"
    GRE = "gre"
    ICMP = "icmp"
    IP = "ip"
    OSPF = "ospf"
    TCP = "tcp"
    UDP = "udp"

class ACLRule(BaseModel):
    id: str = Field(default_factory = lambda: f"rule_{uuid.uuid4().hex}")
    sequence: int
    action: ACLAction # permit/deny
    protocol: ACLProtocol
    """
    Source/Destination Address:
    Source/Destination address can either be:
    A.B.C.D [WILDCARD]
    any
    host [IP ADDRESS]
    """
    source: str
    destination: str
    

class ACL(BaseModel):
    id: str = Field(default_factory = lambda: f"acl_{uuid.uuid4().hex}")
    name: str # ACL Name e.g, "WEB_ACCESS_IN"
    rules: List[ACLRule] = []
    
