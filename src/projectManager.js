// holds the array of all the projects
// tracks which one is active
// functions such as addProject, removeProject, setActiveProject, deleteProject
import Project from './project.js';
import ToDoItem from './todo.js';
import { rebuiltProjects } from './storage.js';

const projects = [];
let activeProjectId = null;

function initializeProjects() {
    const inbox = new Project('Inbox');
    const workStudy = new Project('Work/Study');

    const todo1 = new ToDoItem('Finish Homework', 'Complete math and science homework', '2024-06-15', 'High', false);
    const todo2 = new ToDoItem('Prepare Presentation', 'Prepare slides for the upcoming presentation', '2024-06-20', 'Medium', false);
    const todo3 = new ToDoItem('Grocery Shopping', 'Buy groceries for the week', '2024-06-18', 'Low', false);
    const todo4 = new ToDoItem('Welcome to your Todo App!', 'Click on this card to expand details and see options.', '2024-06-30', 'Low', false);

    inbox.addToDo(todo3);
    inbox.addToDo(todo4);
    workStudy.addToDo(todo1);
    workStudy.addToDo(todo2);

    projects.push(inbox);
    projects.push(workStudy);

    activeProjectId = inbox.id;
}

function addProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
    return newProject;
}

function removeProject(projectId) {
    //debug code
    console.log('trying to remove:', projectId, typeof projectId);
    console.log('current projects:', projects.map(p => p.id));
    //
    const index = projects.findIndex(p => p.id === projectId);

    if (index === -1) {
        console.error("Project with ID " + projectId + " not found.");
        return;
    }

    projects.splice(index, 1);

    if (activeProjectId === projectId) {
        activeProjectId = projects.length > 0 ? projects[0].id : null;
    }
}

function setActiveProject(projectId) {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
        console.error("Project with ID " + projectId + " not found.");
        return;
    }
    activeProjectId = projectId;
}

function addToDoToActiveProject(todo) {
    const activeProject = projects.find(p => p.id === activeProjectId);
    if (activeProject) {
        const todoItem = todo instanceof ToDoItem
            ? todo
            : new ToDoItem(
                todo.title,
                todo.description,
                todo.dueDate,
                todo.priority,
                todo.completed
            );
        activeProject.addToDo(todoItem);
    }
    else {
        console.error("No active Project found. Cannot add ToDo.");
    }
}

function getProjects() {
    return projects;
}

function getActiveProjectId() {
    return activeProjectId;
}

function loadProjects(rebuiltProjectsArray){
    projects.length = 0;
    projects.push(...rebuiltProjectsArray);
}

function removeTodoFromActiveProjects(todoId) {
    const activeProject = projects.find(p => p.id === activeProjectId);
    if (activeProject) {
        activeProject.removeToDo(todoId);
    }

    else {
        console.error("No active projects found cannot remove todo.");
    }
}
export {
    initializeProjects,
    addProject,
    removeProject,
    setActiveProject,
    addToDoToActiveProject,
    getProjects,
    getActiveProjectId,
    loadProjects,
    removeTodoFromActiveProjects
};