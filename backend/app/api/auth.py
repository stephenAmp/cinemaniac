from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordRequestForm
from app.core.config import GOOGLE_REDIRECT_URI, oauth
from app.service.auth_service import AuthService
from app.schema.AuthSchema import UserCreateSchema
from sqlalchemy.orm import Session
from app.core.db import get_db
import os
from dotenv import load_dotenv

router=APIRouter()


@router.post('/register')
async def sign_up(user:UserCreateSchema, db:Session = Depends(get_db)):
    return await AuthService(db).create_user(user)

@router.post('/login')
async def login(payload: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return await AuthService(db).login(payload)

@router.get('/auth')
async def get_all_users(db:Session = Depends(get_db)):
    return await AuthService(db).read_all_users()

@router.delete('/auth/{user_id}')
async def delete_user(user_id: int, db:Session = Depends(get_db)):
    return await AuthService(db).delete_user(user_id)



@router.get('/google')
async def google_login(request: Request):
    return await oauth.google.authorize_redirect(request, redirect_uri=GOOGLE_REDIRECT_URI)

@router.get('/auth/google/callback')
async def auth_google(request:Request, db:Session = Depends(get_db)):
    return await AuthService(db).handle_callback(request)
    # try:
    #     #extract user data
    #     user_response: OAuth2Token = await oauth.google.authorize_access_token(request)
    # except OAuthError:
    #     raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = 'Invalid Credentials')
    
    # user_info = user_response.get('user_info')
    # print(user_info)
    #use user info to create a db instance in User table if user dont already exist
    #create refresh and access token with user info

    #finally return frontendurl with access and refresh tokens as params