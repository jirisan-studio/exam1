from flask import Flask, request, Response, send_file
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# 1. 메인 접속 시 index.html 파일 읽어서 보내기 (이 부분이 부활했습니다)
@app.route('/')
def home():
    # 현재 폴더(api)의 부모 폴더(root)에 있는 index.html을 찾음
    file_path = os.path.join(os.path.dirname(__file__), '../index.html')
    return send_file(file_path)

# 2. /index.html 로 접속해도 똑같이 처리
@app.route('/index.html')
def home_file():
    return home()

# 3. API 프록시 기능 (기존 유지)
@app.route('/api/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "URL parameter is required", 400
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        resp = requests.get(url, headers=headers)
        return Response(resp.content, mimetype='text/xml; charset=utf-8')
    except Exception as e:
        return str(e), 500