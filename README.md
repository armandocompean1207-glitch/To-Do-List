# To-Do List

A simple to-do list application built with vanilla JavaScript, HTML, CSS, and webpack.

## Features

- Create and switch between projects
- Add todos with a title, description, due date, and priority
- View todo details in a centered popup
- Delete individual todos from the detail popup
- Delete the active project
- Save projects and todos in browser `localStorage`
- Responsive pastel-themed interface

## Getting Started

### Requirements

- Node.js and npm

### Installation

Install the project dependencies:

```bash
npm install
```

### Development

Start the webpack development server:

```bash
npm start
```

The development server opens the application in your browser and supports hot reloads.

### Production Build

Create a production bundle in the `dist` directory:

```bash
npm run build
```

## Project Structure

```text
src/
  index.js          Application entry point
  project.js        Project data model
  projectManager.js Project creation, selection, and deletion logic
  storage.js        localStorage save/load logic
  todo.js           Todo data model
  styles.css        Application styles
  template.html     HTML template

dom/
  domController.js  Event handlers and UI coordination
  sidebar.js        Project sidebar rendering
  todoView.js       Todo list and detail rendering
```

## Data Storage

Projects are stored in the browser's `localStorage` under the `projects` key. Clearing site data removes the saved projects and restores the initial example projects on the next load.

## Testing

No automated test suite is configured yet. The available validation command is:

```bash
npm run build
```
