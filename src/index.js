



//initial projects
import Project from './project.js';
import ToDoItem from './todo.js';
import { initializeProjects } from './projectManager.js';

const Inbox = new Project('Inbox');
const WorkStudy = new Project('Work/Study');

//initial todos for the projects
const todo1 = new ToDoItem('Finish Homework', 'Complete math and science homework', '2024-06-15', 'High', false);
const todo2 = new ToDoItem('Prepare Presentation', 'Prepare slides for the upcoming presentation', '2024-06-20', 'Medium', false);
const todo3 = new ToDoItem('Grocery Shopping', 'Buy groceries for the week', '2024-06-18', 'Low', false);
const todo4 = new ToDoItem('Welcome to your Todo App!', 'Click on this card to expand details and see options.', '2024-06-30', 'Low', false);

Inbox.addToDo(todo3);
Inbox.addToDo(todo4);
WorkStudy.addToDo(todo1);
WorkStudy.addToDo(todo2);

// attempt to load saved projects; if none, initialize with these defaults
initializeProjects([Inbox, WorkStudy]);