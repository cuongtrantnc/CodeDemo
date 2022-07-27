// Cách create ele
// function createTodoEle(todo) {
//     if (!todo) return null;

//     const liEle = document.createElement("li");
//     liEle.textContent = todo.title;
//     liEle.dataset.id = todo.id;

//     return liEle;
// }

// function renderTodoList(todoList, ulEleId) {
//     if (!Array.isArray(todoList) || todoList.length === 0) return;

//     const ulElement = document.getElementById(ulEleId);
//     if (!ulElement) return;

//     for (const todo of todoList) {
//         const liElement = createTodoEle(todo);
//         ulElement.appendChild(liElement);
//     }
// }

// //hàm main

// (() => {
//     const todoList = [
//         { id: 1, title: "Learn Javasrcript" },
//         { id: 2, title: "Learn ReactJs" },
//         { id: 3, title: "Learn NextJs" },
//     ];

//     renderTodoList(todoList, "todoList");
// })()




// Cách render 1 item phức tạp
function createTodoEle(todo) {
    if (!todo) return null;

    //find template
    const todoTemplate = document.getElementById("todoTemplate");
    if (!todoTemplate) return null;

    //clone ele from template
    const todoEle = todoTemplate.content.firstElementChild.cloneNode(true); // đoạn này sẽ clone nội dung thẻ li bên trong template ra
    todoEle.dataset.id = todo.id; // set id cho từng thẻ li dc clone
    todoEle.dataset.status = todo.status; // set status cho từng thẻ li dc clone

    //update lại title
    const titleEle = todoEle.querySelector('.todo__title');
    if (titleEle) titleEle.textContent = todo.title;

    //render status for each li
    const divEle = todoEle.querySelector("div.todo");
    if (!divEle) return null;

    const divStatus = todo.status === "completed" ? "alert-success" : "alert-secondary";
    divEle.classList.remove("alert-secondary"); // remove class sẵn có đi để hiển thị màu theo từng status
    divEle.classList.add(divStatus);

    // add event for button
    const markAsDoneButton = todoEle.querySelector("button.mark-as-done");
    if (markAsDoneButton) {

        //render content of button
        markAsDoneButton.textContent = todoEle.dataset.status === "pending" ? "Finish" : "Reset";
        markAsDoneButton.classList.remove("btn-success");
        markAsDoneButton.classList.add(todoEle.dataset.status === "pending" ? "btn-dark" : "btn-success")

        markAsDoneButton.addEventListener('click', () => {

            const currentStatus = todoEle.dataset.status;
            const currentButtonContent = markAsDoneButton.textContent;

            //get current todoList
            const currentTodoList = getTodoList();
            //remove item from list
            const index = currentTodoList.findIndex((x) => x.id === todo.id);
            //update to local storage
            if (index >= 0) {
                currentTodoList[index].status = currentStatus === "pending" ? "completed" : "pending";
                localStorage.setItem('todo_list', JSON.stringify(currentTodoList));
            }

            todoEle.dataset.status = currentStatus === "pending" ? "completed" : "pending";

            const newStatusClass = currentStatus === "pending" ? "alert-success" : "alert-secondary";
            const newButtonContent = currentButtonContent === "Finish" ? "Reset" : "Finish";

            divEle.classList.remove("alert-success", "alert-secondary");
            divEle.classList.add(newStatusClass);

            markAsDoneButton.textContent = newButtonContent;
            markAsDoneButton.classList.remove("btn-success", "btn-dark");
            markAsDoneButton.classList.add(todoEle.dataset.status === "pending" ? "btn-dark" : "btn-success");

        })
    }

    const removeButton = todoEle.querySelector("button.remove");
    if (removeButton) {
        removeButton.addEventListener('click', () => {

            //get current todoList
            const currentTodoList = getTodoList();
            //remove item from list
            const newTodoList = currentTodoList.filter((x) => x.id !== todo.id);
            //update to local storage
            localStorage.setItem('todo_list', JSON.stringify(newTodoList));

            todoEle.remove();
        })
    }

    return todoEle;
}

function renderTodoList(todoList, ulEleId) {
    if (!Array.isArray(todoList) || todoList.length === 0) return;

    const ulElement = document.getElementById(ulEleId);
    if (!ulElement) return;

    for (const todo of todoList) {
        const liElement = createTodoEle(todo);
        ulElement.appendChild(liElement);
    }
}

//get data from local storage
function getTodoList() {
    try {
        return JSON.parse(localStorage.getItem('todo_list'));
    } catch {
        return [];
    }
}

//hàm main
(() => {
    // const todoList = [
    //     { id: 1, title: "Learn Javasrcript", status: "pending" },
    //     { id: 2, title: "Learn ReactJs", status: "completed" },
    //     { id: 3, title: "Learn NextJs", status: "pending" },
    // ];

    const todoList = getTodoList();

    renderTodoList(todoList, 'todoList');
})()



