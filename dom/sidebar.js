function renderSidebar(projects, activeProjectId) {
    const sidebarEl = document.querySelector('#sidebar-projects');
    sidebarEl.innerHTML = '';

    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.dataset.projectId = project.id;

        if (project.id === activeProjectId) {
            li.classList.add('active');
        }

        sidebarEl.appendChild(li);
    });
}

export { renderSidebar };