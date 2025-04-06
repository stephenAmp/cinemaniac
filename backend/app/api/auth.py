from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schema.AuthSchema import UserSchema,UserResponseSchema
from service.auth_service import AuthService
from sqlalchemy.orm import Session
from typing import List
from core.db import get_db



router=APIRouter()

@router.post('/register', response_model=UserResponseSchema)
async def sign_up(user:UserSchema, db:Session = Depends(get_db)):
    return await AuthService(db).create_user(user)

@router.post('/login')
async def login(payload: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return await AuthService(db).login(payload)

@router.get('/auth', response_model=List[UserResponseSchema])
async def get_all_users(db:Session = Depends(get_db)):
    return await AuthService(db).read_all_users()

@router.delete('/auth/{user_id}', response_model= UserResponseSchema)
async def delete_user(user_id: int, db:Session = Depends(get_db)):
    return await AuthService(db).delete_user(user_id)