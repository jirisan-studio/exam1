# ... (기존 코드들) ...

# 🔍 디버깅용: 현재 서버의 폴더 구조 확인하기
@app.route('/debug')
def debug_paths():
    import os
    
    # 1. 현재 파이썬 파일이 실행되는 위치 (Current Working Directory)
    cwd = os.getcwd()
    
    # 2. 현재 폴더의 파일 목록
    files_in_cwd = os.listdir(cwd)
    
    # 3. 상위 폴더(..)의 파일 목록 (여기에 index.html이 있어야 함)
    try:
        files_in_parent = os.listdir(os.path.join(cwd, '..'))
    except:
        files_in_parent = "상위 폴더 접근 불가"

    # 4. __file__ 변수가 가리키는 절대 경로
    file_abs_path = os.path.abspath(__file__)

    return f"""
    <h1>📂 Vercel 서버 경로 확인</h1>
    <p><strong>현재 작업 폴더 (CWD):</strong> {cwd}</p>
    <p><strong>현재 파일 절대 경로:</strong> {file_abs_path}</p>
    <hr>
    <h3>📄 현재 폴더 파일 목록:</h3>
    <pre>{files_in_cwd}</pre>
    <hr>
    <h3>⬆️ 상위 폴더(..) 파일 목록 (예상되는 index.html 위치):</h3>
    <pre>{files_in_parent}</pre>
    """