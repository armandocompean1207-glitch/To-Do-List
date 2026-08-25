// Project class
class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }

    addToDo(todo) {
        this.todos.push(todo);
    }

    removeToDo(todoOrIndex) {
        // remove by numeric index
        if (typeof todoOrIndex === 'number') {
            if (todoOrIndex >= 0 && todoOrIndex < this.todos.length) {
                return this.todos.splice(todoOrIndex, 1)[0];
            }
            return null;
        }

        // remove by ID or title
        if (typeof todoOrIndex === 'string') {
            const idx = this.todos.findIndex(t =>
                t.id === todoOrIndex || t.title === todoOrIndex
            );
            if (idx > -1) return this.todos.splice(idx, 1)[0];
            return null;
        }

        // remove by object reference
        const index = this.todos.indexOf(todoOrIndex);
        if (index > -1) return this.todos.splice(index, 1)[0];

        // fallback: match by title property on the provided object
        if (todoOrIndex && todoOrIndex.title) {
            const idx = this.todos.findIndex(t => t.title === todoOrIndex.title);
            if (idx > -1) return this.todos.splice(idx, 1)[0];
        }

        return null;
    }
}

export default Project;
