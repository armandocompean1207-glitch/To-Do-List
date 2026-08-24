import './styles.css';
import { initializeProjects, getProjects, loadProjects } from './projectManager.js';
import { loadFromStorage } from './storage.js';
import { initApp } from '../dom/domController.js';


const savedData = loadFromStorage();


if (savedData) {
    loadProjects(savedData);
} else {
    initializeProjects();
}

initApp();