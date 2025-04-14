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
    preference:Optional[Preference] = None
    class Config:
        from_attributes = True

class  UserResponseSchema(UserSchema):
    id:int
    class Config:
        from_attributes = True


class UserCreateSchema(UserSchema):
    password: str
