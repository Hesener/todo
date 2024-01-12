
const todoList = document.getElementById("todo-list");
const createTodoBtn = document.getElementById("create-todo-btn");

let todoItems = [];

createTodoBtn.addEventListener('click', createNewTodo);
function createNewTodo() {
	const todoItem = {
		id: new Date().getTime(), //1690604133472
		text: "",
		complete: false
	}

	todoItems.unshift(todoItem);

	const { itemEl, inputEl } = createTodoElement(todoItem);

	todoList.prepend(itemEl);

	inputEl.removeAttribute("disabled");
	inputEl.focus();

	saveToLocalStorage();
}


function createTodoElement(todoItem) {
	const itemEl = document.createElement("div");
	itemEl.classList.add("todoItem");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = todoItem.complete;

	if (todoItem.complete) {
		itemEl.classList.add("complete");
	}

	const inputEl = document.createElement("input");
	inputEl.type = "text";
	inputEl.value = todoItem.text;
	inputEl.setAttribute("disabled", "");

	const actionsEl = document.createElement("div");
	actionsEl.classList.add("actions");

	const editBtnEl = document.createElement("button");
	editBtnEl.classList.add("material-icons");
	editBtnEl.innerText = "edit";

	const removeBtnEl = document.createElement("button");
	removeBtnEl.classList.add("material-icons", "remove-btn");
	removeBtnEl.innerText = "remove_circle";

	actionsEl.append(editBtnEl); 
	actionsEl.append(removeBtnEl);

	itemEl.append(checkbox);
	itemEl.append(inputEl);
	itemEl.append(actionsEl);

	// EVENTS
	checkbox.addEventListener("change", () => {
		todoItem.complete = checkbox.checked;

		if (todoItem.complete) {
			itemEl.classList.add("complete");
		} else {
			itemEl.classList.remove("complete");
		}

		saveToLocalStorage();
	});

	inputEl.addEventListener("input", () => {
		todoItem.text = inputEl.value;
	});

	inputEl.addEventListener("blur", () => {
		inputEl.setAttribute("disabled", "");

		saveToLocalStorage();
	});

	editBtnEl.addEventListener("click", () => {
		inputEl.removeAttribute("disabled");
		inputEl.focus();
	});

	removeBtnEl.addEventListener("click", () => {
		todoItems = todoItems.filter(t => t.id != todoItem.id);
		itemEl.remove();

		saveToLocalStorage();
	});

	return { itemEl, inputEl, editBtnEl, removeBtnEl }
}

function displayTodos() {
	loadFromLocalStorage();

	for (let i = 0; i < todoItems.length; i++) {
		const todoItem = todoItems[i];

		const { itemEl } = createTodoElement(todoItem);

		todoList.append(itemEl);
	}
}

displayTodos();

function saveToLocalStorage() {
	const data = JSON.stringify(todoItems);

	localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
	const data = localStorage.getItem("my_todos");

	if (data) {
		todoItems = JSON.parse(data);
	}
}