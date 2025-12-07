from flask import Flask, request, Response
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "URL parameter is required", 400
    try:
        # 국가유산청 서버 차단 방지용 헤더
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        # 데이터 요청
        resp = requests.get(url, headers=headers)
        
        # 받은 데이터를 그대로 브라우저에게 전달 (XML 등)
        return Response(resp.content, mimetype='text/xml; charset=utf-8')
        
    except Exception as e:
        return str(e), 500