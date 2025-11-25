from flask import Flask, request, Response
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app) # 모든 곳에서 접속 허용

@app.route('/api/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "URL is required", 400
    
    try:
        # 국가유산청 서버인 척 헤더 설정
        headers = {'User-Agent': 'Mozilla/5.0'}
        # 데이터 요청
        resp = requests.get(url, headers=headers)
        # 받은 XML 데이터를 그대로 반환
        return Response(resp.content, mimetype='text/xml')
    except Exception as e:
        return str(e), 500  