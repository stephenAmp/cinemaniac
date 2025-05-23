from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schema.AuthSchema import UserCreateSchema
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from app.core.utils.general import get_password_hash, verify_password, create_access_token,verify_token
from authlib.oauth2.rfc6749 import OAuth2Token
from authlib.integrations.starlette_client import OAuthError
from app.core.config import oauth
from app.models import User

class AuthService:
    def __init__(self,db:Session):
        self.db = db

    async def create_user(self,user:UserCreateSchema):
        existing_user = self.db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code = 400, detail = 'user already exists')
        
        #handle hashing of password
        hashed_password = get_password_hash(user.password)

        #creating db instance
        db_new_user = User(
            name = user.name,
            email =user.email,
            hashed_password = hashed_password,
            preference = user.preference.model_dump() if user.preference else None
        )
        try:
            self.db.add(db_new_user)
            self.db.commit()
            self.db.refresh(db_new_user)
        except Exception as e:
            self.db.rollback()
            print(e)
            raise HTTPException(status_code = 500, detail = 'failed to create user due to database error ')
        
        #  Generate JWT token
        userObj = {'id':db_new_user.id, 'email': db_new_user.email}
        access_token = create_access_token(data=userObj, expiry = timedelta(days = 2), refresh = False)
        refresh_token = create_access_token(data=userObj, expiry = timedelta(days = 2), refresh = True)

        return {"access_token": access_token, 
                'refresh_token':refresh_token, 
                "token_type": "bearer",  
                'id': db_new_user.id,
                'name': db_new_user.name,
                'email': db_new_user.email,
                'preference': db_new_user.preference
                }

    
    
    async def login(self, payload:OAuth2PasswordRequestForm):
        existing_user = self.db.query(User).filter(User.email == payload.username).first()
        if not existing_user:
            raise HTTPException(status_code = 401, detail = 'incorrect username or password', headers = {"WWW-Authenticate": "Bearer"})
        if not verify_password(payload.password, existing_user.hashed_password):
            raise HTTPException(status_code = 400, detail = 'incorrect username or password', headers = {"WWW-Authenticate": "Bearer"})
        userObj = {'id': existing_user.id, 'email': existing_user.email}
        access_token = create_access_token(data = userObj, expiry = timedelta(days = 2), refresh = False)
        refresh_token = create_access_token(data = userObj, expiry = timedelta(days = 2), refresh = True)
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'bearer',
            'user_id': existing_user.id, 
            'user_email': existing_user.email, 
            'user_preference': existing_user.preference, 
        }
        
    
    async def read_all_users(self):
        users = self.db.query(User).all()
        return ([{'id':user.id,"name":user.name,'email':user.email,'preference':user.preference} for user in users])
    
    async def delete_user(self,user_id):
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail = 'user not found')
        self.db.delete(user)
        self.db.commit()
        return {'id':user.id, 'name':user.name, 'email':user.email, 'preference': user.preference}
    

    async def handle_callback(self, request):
        try:
            token: OAuth2Token = await oauth.google.authorize_access_token(request)
        except OAuthError:
            raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = 'Invalid Credentials')
        
        user_info = await oauth.google.parse_id_token(request, token)
        print(user_info)
        existing_user = self.db.query(User).filter(User.email == user_info['email']).first()
        if not existing_user:
            new_user = User(
                id =  user_info['sub'],
                email = user_info['email'],
                name = user_info['name']
            )
  
            self.db.add(new_user)
            self.db.refresh(new_user)
            return{
            'access_token': token,
            'user_id': new_user.id, 
            'user_email': new_user.email, 
            'user_preference': new_user.preference, 
            }
        return {
            'access_token': token,
            'user_id': existing_user.id, 
            'user_email': existing_user.email, 
            'user_preference': existing_user.preference,    
        }
