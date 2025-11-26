from flask import Flask, request, Response, send_file
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# 1. 메인 화면 접속 시 index.html 보여주기
@app.route('/')
def home():
    # 현재 파일(index.py)의 위치를 기준으로 바로 위 폴더(..)에 있는 index.html을 찾음
    file_path = os.path.join(os.path.dirname(__file__), '../index.html')
    # 그 파일을 브라우저에게 전송
    return send_file(file_path)

# 2. 혹시 index.html 이라고 주소를 쳐도 똑같이 보여주기
@app.route('/index.html')
def home_file():
    return home()

# 3. API 프록시 기능 (기존과 동일)
@app.route('/api/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "URL parameter is required", 400
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        resp = requests.get(url, headers=headers)
        return Response(resp.content, mimetype='text/xml')
    except Exception as e:
        return str(e), 500