console.log("To-Do App Loaded");

// 초기 로딩
loadTodos();

// 할 일 추가 이벤트
document.getElementById("addTodoBtn").addEventListener("click", addTodo);

function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return alert("할 일을 입력하세요!");

    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    todos.push({
        text: text,
        completed: false
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    input.value = "";
    loadTodos();
}

// 할 일 목록 표시
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const ul = document.getElementById("todoList");

    ul.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        // 텍스트
        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.completed) span.classList.add("completed");

        // 완료 버튼
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = todo.completed ? "취소" : "완료";
        toggleBtn.onclick = () => toggleTodo(index);

        // 삭제 버튼
        const delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.onclick = () => deleteTodo(index);

        li.appendChild(span);
        li.appendChild(toggleBtn);
        li.appendChild(delBtn);

        ul.appendChild(li);
    });
}

// 완료/취소 토글
function toggleTodo(index) {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    todos[index].completed = !todos[index].completed;

    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
}

// 삭제 기능
function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    todos.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
}
