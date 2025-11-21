// ---------------------------------------------
// 🔥 1) Supabase 연결 (수정 완료)
// ---------------------------------------------
const SUPABASE_URL = "https://wafhzdpvcovqceifwklg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1VLdezt-kdnONHhAgEEiaw_48-2AKos";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase 클라이언트 생성 완료:", db);

// ---------------------------------------------
// 🔥 2) 연결 테스트
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
// 🔥 3) 버튼 테스트
// ---------------------------------------------
document.getElementById("addBtn").addEventListener("click", () => {
    alert("Supabase 연결 OK, 이제 CRUD 구현 단계로 이동!");
});
