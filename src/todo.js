// Todo Item class
class ToDoItem {
    constructor(title, description, dueDate, priority, completed = false){
        this.id = crypto.randomUUID();
        this.completed = completed;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.title = title;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

export default ToDoItem;