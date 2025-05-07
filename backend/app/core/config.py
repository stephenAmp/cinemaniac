import os
from dotenv import load_dotenv
from authlib.integrations.starlette_client import OAuth

load_dotenv()

#auth2.0 - GOOGLE
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI')
FRONT_END_URL = os.getenv('FRONT_END_URL')

oauth = OAuth()

oauth.register(
    name = 'google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    client_kwargs={
        'scope':'email openid profile'
    }

)