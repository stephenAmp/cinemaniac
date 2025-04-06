from pydantic import BaseModel
from typing import Optional,List


class Preference(BaseModel):
    favourite_actors:Optional[List[str]] = None
    favourite_directors:Optional[List[str]] = None
    favourite_genres:Optional[List[str]] = None
    preferred_language:Optional[List[str]] = None

class UserSchema(BaseModel):
    name: str
    email: str
    hashed_password: str
    preference:Optional[Preference] = None


class  UserResponseSchema(UserSchema):
    id:int
    class Config:
        orm_mode = True



