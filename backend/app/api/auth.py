from fastapi import APIRouter, Depends, Request, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from authlib.integrations.base_client import OAuthError
from authlib.oauth2.rfc6749 import OAuth2Token
from schema.AuthSchema import UserCreateSchema,UserResponseSchema
from service.auth_service import AuthService
from sqlalchemy.orm import Session
from core.db import get_db
import os
from dotenv import load_dotenv
from app.core.utils.auth import authorize_redirect, authorize_access_token


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


load_dotenv()

#auth2.0 - GOOGLE
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI')
FRONT_END_URL = os.getenv('FRONT_END_URL')

@router.get('/google')
async def google_login(request: Request):
    return await authorize_redirect(request, GOOGLE_REDIRECT_URI)

@router.get('/callback/google')
async def auth_google(request:Request, db:Session = Depends(get_db)):
    try:
        #extract user data
        user_response: OAuth2Token = authorize_access_token(request)
    except OAuthError:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = 'Invalid Credentials')
    
    user_info = user_response.get('user_info')
    
    print(user_info)
    #use user info to create a db instance in User table if user dont already exist
    #create refresh and access token with user info
    #finally return frontendurl with access and refresh tokens as params