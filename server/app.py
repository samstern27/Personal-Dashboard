from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

# LibreTranslate endpoint (using the free public instance)
LIBRETRANSLATE_URL = "https://libretranslate.de/translate"

@app.route('/api/translate', methods=['POST'])
def translate():
    try:
        data = request.json
        text = data.get('text')
        source_lang = data.get('source', 'auto')
        target_lang = data.get('target')

        if not all([text, target_lang]):
            return jsonify({'error': 'Missing required parameters'}), 400

        # Make request to LibreTranslate
        response = requests.post(LIBRETRANSLATE_URL, json={
            'q': text,
            'source': source_lang,
            'target': target_lang,
            'format': 'text'
        })

        if response.status_code != 200:
            return jsonify({'error': 'Translation service error'}), response.status_code

        result = response.json()
        return jsonify({'translation': result.get('translatedText', '')})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Keep the events endpoint from the original Node.js server
@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        lat = request.args.get('lat')
        lng = request.args.get('lng')
        radius = request.args.get('radius')

        if not all([lat, lng, radius]):
            return jsonify({
                'error': 'Missing required parameters: lat, lng, and radius are required'
            }), 400

        api_key = os.getenv('VITE_TICKETMASTER_API_KEY')
        if not api_key:
            return jsonify({'error': 'API key not configured on server'}), 500

        response = requests.get(
            'https://app.ticketmaster.com/discovery/v2/events.json',
            params={
                'latlong': f"{lat},{lng}",
                'radius': radius,
                'unit': 'km',
                'apikey': api_key
            }
        )

        return jsonify(response.json())

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True) 