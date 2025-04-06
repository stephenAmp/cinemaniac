from fastapi import HTTPException
from sqlalchemy.orm import Session
from schema.AuthSchema import UserSchema
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from core.utils import get_password_hash, verify_password, create_access_token,verify_token
from models import User

class AuthService:
    def __init__(self,db:Session):
        self.db = db

    async def create_user(self,user:UserSchema):
        existing_user = self.db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code = 400, detail = 'user already exists')
        
        #handle hashing of password
        hashed_password = get_password_hash(user.hashed_password)

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
        return db_new_user
    
    
    async def login(self, payload:OAuth2PasswordRequestForm):
        existing_user = self.db.query(
            User.email == payload.username
        ).first()
        if not existing_user:
            raise HTTPException(status_code = 404, detail = 'incorrect username or password', headers = {"WWW-Authenticate": "Bearer"})
        if not verify_password(payload.password, existing_user.hashed_password):
            raise HTTPException(status_code = 400, detail = 'incorrect username or password', headers = {"WWW-Authenticate": "Bearer"})
        userObj = {'id': existing_user.id, 'email': existing_user.email}
        access_token = create_access_token(data = userObj, expiry = timedelta(days = 2), refresh = False)
        refresh_token = create_access_token(data = userObj, expiry = timedelta(days = 2), refresh = True)
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'bearer',
            'user': UserSchema.from_orm(existing_user)
        }
        
    
    async def read_all_users(self):
        user = self.db.query(User).all()
        return user
    
    async def delete_user(self,user_id):
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail = 'user not found')
        self.db.delete(user)
        self.db.commit()
        return user