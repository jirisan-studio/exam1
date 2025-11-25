from flask import Flask, request, Response
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "URL is required", 400
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        resp = requests.get(url, headers=headers)
        return Response(resp.content, mimetype='text/xml')
    except Exception as e:
        return str(e), 500