from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.getenv('DATABASE_URL')
engine = create_engine(database_url, echo=False)

sessionLocal = sessionmaker(autoflush=False, autocommit = False, bind = engine)

def get_db():
    db = sessionLocal()   
    try:
        yield db
    finally:
        db.close()