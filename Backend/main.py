
import os
import requests
from flask_cors import CORS 
from textblob import TextBlob
from dotenv import load_dotenv
from flask import Flask, jsonify
from dataclasses import dataclass




app = Flask(__name__)
CORS(app)

load_dotenv()

page_id = os.getenv('PAGE_ID')
post_id = os.getenv('POST_ID')
access_token = os.getenv('ACCESS_TOKEN')

url = f'https://graph.facebook.com/v16.0/{page_id}_{post_id}/comments?access_token={access_token}'

@dataclass
class Mood:
    emoji: str
    sentiment: float

    @staticmethod
    def get_mood(input_text: str, *, threshold: float = 0.1):
        sentiment: float = TextBlob(input_text).sentiment.polarity

        friendly_threshold: float = threshold
        hostile_threshold: float = -threshold

        if sentiment > friendly_threshold:
            return Mood('Positive', sentiment)
        elif sentiment < hostile_threshold:
            return Mood('Negative', sentiment)
        else:
            return Mood('Neutral', sentiment)

@app.route('/comments', methods=['GET'])
def get_comments():
    response = requests.get(url)
    data = response.json()

    comments_list = []
    for comment in data['data']:
        name = comment['from']['name']
        message = comment['message']
        mood: Mood = Mood.get_mood(message, threshold=0.1)
        comments_list.append({'name': name, 'message': message, 'mood': mood.emoji, 'sentiment': mood.sentiment})

    return jsonify(comments_list)

if __name__ == '__main__':
    app.run(debug=True)

