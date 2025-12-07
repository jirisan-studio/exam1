from flask import Flask, request, Response
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# HTML을 보여주는 home() 함수들은 삭제해도 됩니다.
# Vercel이 알아서 index.html을 보여줍니다.

@app.route('/api/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "URL parameter is required", 400
    try:
        # 국가유산청 서버가 봇을 차단할 수 있으므로 User-Agent 추가
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        resp = requests.get(url, headers=headers)
        
        # 이미지 등 바이너리 데이터일 수도, XML 텍스트일 수도 있으므로 content 그대로 반환
        # mimetype을 고정하지 않고 원본 응답을 따르거나, XML이 확실하면 text/xml 유지
        return Response(resp.content, mimetype='text/xml; charset=utf-8')
    except Exception as e:
        return str(e), 500