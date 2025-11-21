console.log("웹앱 기본 구조 로드 완료");

// 메모 저장 버튼
document.getElementById("saveBtn").addEventListener("click", saveMemo);

function saveMemo() {
    const input = document.getElementById("memoInput");
    const text = input.value.trim();

    if (!text) return alert("메모를 입력하세요!");

    // 기존 리스트 불러오기
    const list = JSON.parse(localStorage.getItem("memos") || "[]");

    // 새로운 메모 추가
    list.push(text);

    // 다시 저장
    localStorage.setItem("memos", JSON.stringify(list));

    input.value = "";
    loadMemos();
}

function loadMemos() {
    const list = JSON.parse(localStorage.getItem("memos") || "[]");
    const ul = document.getElementById("memoList");

    ul.innerHTML = "";

    list.forEach((memo, index) => {
        const li = document.createElement("li");
        li.textContent = memo;

        // 삭제 버튼 추가
        const delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.style.marginLeft = "10px";
        delBtn.onclick = () => deleteMemo(index);

        li.appendChild(delBtn);
        ul.appendChild(li);
    });
}

function deleteMemo(index) {
    let list = JSON.parse(localStorage.getItem("memos") || "[]");
    list.splice(index, 1);
    localStorage.setItem("memos", JSON.stringify(list));
    loadMemos();
}

// 페이지 로딩 시 기존 데이터 불러오기
loadMemos();

