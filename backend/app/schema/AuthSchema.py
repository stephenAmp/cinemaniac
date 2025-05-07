from pydantic import BaseModel
from datetime import datetime
from typing import Optional,List


class Preference(BaseModel):
    favourite_actors:Optional[List[str]] = None
    favourite_directors:Optional[List[str]] = None
    favourite_genres:Optional[List[str]] = None
    preferred_language:Optional[List[str]] = None
    
    class Config:
        from_attributes = True

class UserSchema(BaseModel):
    name: str
    email: str
    preference: Optional[Preference]



class UserResponseSchema(BaseModel):
    id: int
    user: UserSchema
    created_at: datetime

    class Config:
        from_attributes = True

class UserCreateSchema(BaseModel):
    password: str
    name: str
    email: str
    preference: Optional[Preference] = None
