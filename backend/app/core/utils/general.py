import jwt
import bcrypt
from fastapi import Depends, Security, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jinja2 import Template
from fastapi_mail import MessageSchema,FastMail
from datetime import datetime, timedelta
import uuid
from sqlalchemy.orm import Session
from app.models import User
from app.core.db import get_db
# from core.email_config import email_config
from io import BytesIO
import base64
import os
from dotenv import load_dotenv

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")



# Hash a password using bcrypt
def get_password_hash(password):
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password.decode('utf-8')

# Check if the provided password matches the stored password (hashed)
def verify_password(plain_password:str, hashed_password):
    password_byte_enc = plain_password.encode('utf-8')

    # If the hashed_password is stored as a string, convert it back to bytes
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode('utf-8')
    
    # Ensure the salt is valid before checking the password
    try:
        return bcrypt.checkpw(password_byte_enc, hashed_password)
    except ValueError as e:
        if "Invalid salt" in str(e):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid salt",
            )
        else:
            raise e

jwt_key = os.getenv('SECRET_KEY')
jwt_algorithm = os.getenv('ALGORITHM')

def create_access_token(data: dict, expiry: timedelta = None, refresh: bool = False):
    payload = {}
    payload["user"] = data
    payload["exp"] = datetime.now() + (expiry if expiry is not None else timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    payload['jti'] = str(uuid.uuid4())
    payload['refresh'] = refresh
    token = jwt.encode(payload, key=jwt_key, algorithm=jwt_algorithm)
    return token

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        # Decode JWT token
        payload = jwt.decode(token, jwt_key, algorithms=[jwt_algorithm])
        # Optionally, you can check roles, permissions, or user status here
        return payload.get('user')
    except jwt.ExpiredSignatureError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    
   


def get_current_user_id(user: dict = Depends(verify_token)):
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="unauthorized user")
    # Access the user ID using dictionary key-based access
    user_id = user['id']
    
    if not user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user data")
    
    return user_id

def get_current_user_email(user: dict = Depends(verify_token)):
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="unauthorized user")
    # Access the user email using dictionary key-based access
    user_email = user['email']
    
    if not user_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user data")
    
    return user_email

def get_current_user_name(user: dict = Depends(verify_token)):
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="unauthorized user")
    # Access the user email using dictionary key-based access
    user_name = user['name']
    
    if not user_name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user data")
    
    return user_name


# async def send_email(mailto:str, subject:str, path:str, context:dict):
#     with open(path,'r') as f:
#         template = Template(f.read())
#     body = template.render(context)
#     message = MessageSchema(
#         subject = subject,
#         recipients = [mailto],
#         body = body,
#         subtype = 'html'
#         )
#     mailer = FastMail(email_config)
#     await mailer.send_message(message)

def check_permission(resource: str, action: str, user: dict = Depends(verify_token), db: Session = Depends(get_db)):
    """
    Check if the user has the required permission.
    Args:
        resource: The resource to check permissions for (e.g., "products", "branches")
        action: The action to check (e.g., "create", "read", "update", "delete")
        user: The current user's data from the JWT token
        db: Database session
    Returns:
        bool: True if user has permission, raises HTTPException if not
    """
    print("user", user)
    if not isinstance(user, dict) or 'id' not in user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user data"
        )

    # Query the user's role from the database
    db_user = db.query(User).filter(User.id == user['id']).first()
    if not db_user or not db_user.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User has no assigned role"
        )

    #Creators of organization can automatically bypass all checks

    
    #if user has superAdmin role user should bypass all checks
    if db_user.role.name == 'SUPERADMIN':
        return True
    # Get permissions from the user's role
    permissions = db_user.role.permissions

    # Check if the resource exists in permissions and if the action is allowed
    if not permissions or resource not in permissions or action not in permissions[resource]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"User doesn't have the required permission: {action} {resource}"
        )

    return True

def permission_checker(resource: str, action: str):
    def wrapper(user: dict = Depends(verify_token), db: Session = Depends(get_db)):
        return check_permission(resource, action, user=user, db=db)
    return wrapper


def decode_base64_to_byteIO(base64string:str):
    try:
        file = base64.b64decode(base64string)
        return BytesIO(file)
    except Exception as e:
        raise ValueError(f'Invalid base64 encoding:{e}')
    

# Utility function to get start and end dates for a given period
def get_date_range(period: str, previous: bool = False):
    now = datetime.now()
    
    if period == "today":
        start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
        end_date = now.replace(hour=23, minute=59, second=59, microsecond=999999)
        if previous:
            # Yesterday's range
            start_date -= timedelta(days=1)
            end_date -= timedelta(days=1)

    elif period == "week":
        start_date = now - timedelta(days=now.weekday())  # Start of this week (Monday)
        start_date = start_date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_date = start_date + timedelta(days=6, hours=23, minutes=59, seconds=59, microseconds=999999)
        if previous:
            # Previous week's range
            start_date -= timedelta(weeks=1)
            end_date -= timedelta(weeks=1)

    elif period == "month":
        start_date = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        next_month = now.replace(day=28) + timedelta(days=4)
        end_date = next_month.replace(day=1) - timedelta(microseconds=1)
        if previous:
            # Previous month's range
            previous_month = start_date - timedelta(days=1)
            start_date = previous_month.replace(day=1)
            end_date = previous_month.replace(day=1) + timedelta(days=previous_month.day - 1)

    elif period == "year":
        start_date = now.replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
        end_date = now.replace(month=12, day=31, hour=23, minute=59, second=59, microsecond=999999)
        if previous:
            # Previous year's range
            start_date = start_date.replace(year=start_date.year - 1)
            end_date = end_date.replace(year=end_date.year - 1)

    return start_date, end_date
        