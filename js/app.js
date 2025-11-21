// ---------------------------------------------
// 🔥 1) Supabase 연결
// ---------------------------------------------
const SUPABASE_URL = "https://wafhzdpvcovqceifwklg.supabase.co";   // ← 프로젝트 URL로 교체됨
const SUPABASE_ANON_KEY = "sb_publishable_1VLdezt-kdnONHhAgEEiaw_48-2AKos";  // ← publishable key

// supabase 클라이언트 생성
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase 클라이언트 생성 완료:", db);

// ---------------------------------------------
// 🔥 2) Supabase 연결 테스트
// ---------------------------------------------
async function testConnection() {
    const { data, error } = await db.from("todos").select("*");

    if (error) {
        console.error("❌ Supabase 연결 오류:", error);
    } else {
        console.log("✅ Supabase 연결 성공! 현재 todos 데이터:", data);
    }
}

testConnection();


// ---------------------------------------------
// 🔥 3) 할 일 추가(Create)
// ---------------------------------------------
async function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();

    if (text === "") {
        alert("할 일을 입력하세요.");
        return;
    }

    // Supabase에 데이터 저장
    const { error } = await db.from("todos").insert([
        { text: text, completed: false }
    ]);

    if (error) {
        console.error("❌ 저장 오류:", error);
        alert("저장 실패!");
    } else {
        console.log("✅ 저장 성공:", text);
        input.value = "";     // 입력창 비우기
        loadTodos();          // 저장 후 목록 다시 불러오기
    }
}


// ---------------------------------------------
// 🔥 4) 할 일 목록 불러오기(Read)
// ---------------------------------------------
async function loadTodos() {
    const { data, error } = await db
        .from("todos")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error("❌ 불러오기 오류:", error);
        return;
    }

    const list = document.getElementById("todoList");
    list.innerHTML = ""; // 목록 초기화

    data.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        list.appendChild(li);
    });
}

// 페이지 로드시 즉시 목록 불러오기
loadTodos();


// ---------------------------------------------
// 🔥 5) 버튼 클릭 이벤트
// ---------------------------------------------
document.getElementById("addBtn").addEventListener("click", addTodo);
