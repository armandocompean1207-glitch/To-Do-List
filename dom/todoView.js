function renderTodoList(project) {
    const todoContainer = document.querySelector('#todo-list');
    todoContainer.innerHTML = '';

    if (!project) return;

    project.todos.forEach(todo => {
        const card = document.createElement('div');
        card.classList.add('todo-card', `priority-${todo.priority.toLowerCase()}`);
        card.dataset.todoId = todo.id;

        card.innerHTML = `
            <span class="todo-title">${todo.title}</span>
            <span class="todo-due">${todo.dueDate}</span>
        `;

        todoContainer.appendChild(card);
    });
}

function renderTodoDetail(todo) {
    const dialog = document.querySelector('#todo-detail-modal');

    dialog.querySelector('#detail-title').textContent = todo.title;
    dialog.querySelector('#detail-description').textContent = todo.description;
    dialog.querySelector('#detail-duedate').textContent = todo.dueDate;
    dialog.querySelector('#detail-priority').textContent = todo.priority;
    dialog.dataset.todoId = todo.id;

    dialog.showModal();
}

export { renderTodoList, renderTodoDetail };