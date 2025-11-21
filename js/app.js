// ---------------------------------------------
// 🔥 1) Supabase 연결
// ---------------------------------------------
const SUPABASE_URL = "https://wafhzdpvcovqceifwklg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1VLdezt-kdnONHhAgEEiaw_48-2AKos";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase 클라이언트 생성 완료:", supabase);

// ---------------------------------------------
// 🔥 2) 연결 테스트
// ---------------------------------------------
async function testConnection() {
    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
        console.error("❌ Supabase 연결 오류:", error);
    } else {
        console.log("✅ Supabase 연결 성공! 현재 todos 데이터:", data);
    }
}

testConnection();

// ---------------------------------------------
// 🔥 3) 버튼에 이벤트 연결 (나중에 구현)
// ---------------------------------------------
document.getElementById("addBtn").addEventListener("click", () => {
    alert("Supabase 연결이 정상입니다. 이제 CRUD 기능을 구현할 차례!");
});
