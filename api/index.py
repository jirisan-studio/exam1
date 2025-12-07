from flask import Flask, request, Response, send_file
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# 1. 메인 화면 접속 시 (이제 바로 옆에 있는 파일을 찾습니다)
@app.route('/')
def home():
    # 현재 실행 중인 폴더(api)에서 index.html을 찾음
    return send_file('index.html')

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