from fastapi import FastAPI,HTTPException,status,Depends
from db import get_db
from sqlalchemy.orm import Session
from schema import UserSchema,UserResponseSchema
from models import User
import uvicorn
import requests
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_APP_API = os.getenv('API_KEY')
GEMINI_API_URL = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_APP_API}'

app=FastAPI()

@app.get('/')
def root():
    return 'Hi this is the beginning of the mental health app!'

@app.post('/user', response_model=UserResponseSchema)
def create_user(user:UserSchema, db:Session =Depends(get_db)):
    user_data = user.model_dump()
    db_user = User(**user_data)
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail = f'failed to add user to db:{e}')
    return db_user



@app.get("/recommendations/{user_id}")
def get_recommendations(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.preference:
        user_preferences = user.preference

    
    prompt_text = f"""
    Based on the following preferences, recommend five movies with a short description for each:
    i like movies in these genres {','.join(user_preferences.get('favourite_genres',[]))},
    i like movies directed by these directors {','.join(user_preferences.get('favourite_directors',[]))},
    I like movies with starring these actors {','.join(user_preferences.get('favourite_actors',[]))},
    I like movies with these languages {','.join(user_preferences.get('preferred_language',[]))}
    Please provide the movie titles and a one-sentence summary for each.
    """

    payload = {'contents':[{'parts':[{'text':prompt_text}]}]}
    # Send user preference to Gemini AI
    response = requests.post(GEMINI_API_URL, json=payload)
    print("Response Text:", response.text)
    if response.status_code != 200:
        raise HTTPException(status_code = response.status_code, detail = 'failed to fetch response from gemini AI')
    movie_data = response.json()
    response_text = movie_data['candidates'][0]['content']['parts'][0]['text']
    movie_lines = response_text.split("\n\n")[1:]  # Ignore intro text

    movies = []
    for line in movie_lines:
        if "**" in line:  # Titles are bold (**Title**)
            title, description = line.split(":**", 1)
            title = title.replace("**", "").strip()
            description = description.strip()
            return {'movie':title, "description": description}


    #     # Save movies in database if not exists
    #     for movie in movie_data:
    #         existing_movie = db.query(Movie).filter(Movie.title == movie["title"]).first()
    #         if not existing_movie:
    #             new_movie = Movie(
    #                 title=movie["title"],
    #                 poster_url=movie.get("poster_url"),
    #                 description=movie.get("description"),
    #                 genres=movie.get("genres"),
    #                 release_date=movie.get("release_date"),
    #             )
    #             db.add(new_movie)
    #     db.commit()

    #     return movie_data
    # return {"error": "Failed to fetch recommendations"}




if __name__ == '__main__':
    uvicorn.run(app)