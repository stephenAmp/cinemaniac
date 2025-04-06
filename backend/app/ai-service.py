from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

API_KEY = os.getenv('API_KEY')
client = genai.Client(api_key=API_KEY)

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["How are you?"])
print(response.text)

