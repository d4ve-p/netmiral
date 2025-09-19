from beanie import PydanticObjectId

def validate_object_id(id: str):
    try:
        PydanticObjectId(id)
        return True
    except Exception:
        return False