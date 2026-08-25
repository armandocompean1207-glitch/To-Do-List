// storage.js
import Project from './project.js';
import ToDoItem from './todo.js';
import { getProjects } from './projectManager.js';

function saveToStorage() {
    const projects = getProjects();
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromStorage() {
    const data = localStorage.getItem('projects');
    if (!data) return null;

    const parsed = JSON.parse(data);

    const rebuiltProjects = parsed.map(projectData => {
        const newProject = new Project(projectData.name);
        newProject.id = projectData.id;

        newProject.todos = projectData.todos.map(todoData => {
            const newTodo = new ToDoItem(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority,
                todoData.completed
            );
            newTodo.id = todoData.id || newTodo.id;
            return newTodo;
        });

        return newProject;
    });

    return rebuiltProjects;
}

export { saveToStorage, loadFromStorage };