import {
    getProjects,
    getActiveProjectId,
    setActiveProject,
    addProject,
    addToDoToActiveProject,
    removeProject
} from '../src/projectManager.js';
import { saveToStorage } from '../src/storage.js';
import { renderSidebar } from './sidebar.js';
import { renderTodoList, renderTodoDetail } from './todoView.js';

function getActiveProject() {
    return getProjects().find(p => p.id === getActiveProjectId());
}

function refreshUI() {
    renderSidebar(getProjects(), getActiveProjectId());
    renderTodoList(getActiveProject());
}

function initApp() {
    refreshUI();
    setupSidebarClicks();
    setupAddProjectButton();
    setupNewTaskButton();
    setupTodoCardClicks();
    setupDialogButtons();
}

function setupSidebarClicks() {
    document.querySelector('#sidebar-projects').addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        setActiveProject(li.dataset.projectId);
        refreshUI();
    });
}

function setupAddProjectButton() {
    document.querySelector('#add-project').addEventListener('click', () => {
        const input = document.querySelector('#project-item');
        const name = input.value.trim();
        if (!name) return; // don't add empty projects

        addProject(name);
        saveToStorage();
        refreshUI();
        input.value = '';
    });
}

function setupNewTaskButton() {
    document.querySelector('#new-task').addEventListener('click', () => {
        document.querySelector('#new-task-modal').showModal();
    });

    document.querySelector('#task-save-btn').addEventListener('click', () => {
        const todoData = {
            title: document.querySelector('#task-title').value,
            description: document.querySelector('#task-description').value,
            dueDate: document.querySelector('#task-duedate').value,
            priority: document.querySelector('#task-priority').value,
        };

        if (!todoData.title.trim()) return; // require at least a title

        addToDoToActiveProject(todoData);
        saveToStorage();
        refreshUI();

        document.querySelector('#new-task-modal').close();
        clearNewTaskForm();
    });

    document.querySelector('#task-cancel-btn').addEventListener('click', () => {
        document.querySelector('#new-task-modal').close();
        clearNewTaskForm();
    });
}

function clearNewTaskForm() {
    document.querySelector('#task-title').value = '';
    document.querySelector('#task-description').value = '';
    document.querySelector('#task-duedate').value = '';
}

function setupTodoCardClicks() {
    document.querySelector('#todo-list').addEventListener('click', (e) => {
        const card = e.target.closest('.todo-card');
        if (!card) return;

        const todo = getActiveProject().todos.find(t => t.id === card.dataset.todoId);
        if (!todo) return;

        renderTodoDetail(todo);
    });
}

function setupDialogButtons() {
    const dialog = document.querySelector('#todo-detail-modal');

    document.querySelector('#detail-close-btn').addEventListener('click', () => {
        dialog.close();
    });

    document.querySelector('#detail-delete-btn').addEventListener('click', () => {
        const activeProject = getActiveProject();
        activeProject.removeToDo(dialog.dataset.todoId);
        saveToStorage();
        refreshUI();
        dialog.close();
    });
}

export { initApp };