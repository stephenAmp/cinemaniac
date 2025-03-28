from pydantic import BaseModel
from typing import Optional,List


class Preference(BaseModel):
    favourite_actors:List[str]
    favourite_directors:List[str]
    favourite_genres:List[str]
    preferred_language:List[str]

class UserSchema(BaseModel):
    name:str
    email:str
    hashed_password:str
    preference:Optional[Preference] = None

class  UserResponseSchema(UserSchema):
    id:int
    class Config:
        orm_mode = True



