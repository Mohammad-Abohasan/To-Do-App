const readline = require('readline');

let rl = readline.createInterface(process.stdin, process.stdout);
let tasks = [];

class Task {
    constructor(description, dueDate, priority) {
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.completed = false;
    }
}

Task.prototype.newTask = (description, dueDate, priority) => {
    return new Task(description, dueDate, priority);
}

Task.prototype.isCompleted = function () {
    this.completed = true;
}

Task.prototype.print = function () {
    console.log(`Task description: ${this.description}`);
    console.log(`Task due date: ${this.dueDate.getFullYear()}/${this.dueDate.getMonth() + 1}/${this.dueDate.getDate()}`);
    console.log(`Task priority: ${this.priority}`);
    console.log(`Task is Complete: ${this.completed ? 'Yes' : 'No'}`);
}

const addTask = () => {
    rl.question("Enter task description: ", (description) => {
        rl.question("Enter due date (2023/5/19, 2025/9/27, ...): ", (dueDate) => {
            rl.question("Enter priority (1, 2, ...): ", (priority) => {
                date = new Date(dueDate);
                if (isNaN(date)) {
                    console.log("Invalid date. Please enter a valid date in the format YYYY-MM-DD.");
                } else if (isNaN(priority) || priority < 1) {
                    console.log('Invalid priority. Please enter a valid number greater than or equal to 1.');
                } else {
                    const task = Task.prototype.newTask(description, date, priority);
                    tasks = [...tasks, task];
                    console.log('Task Added Successfully 🙂');
                }
                showActions();
            });
        });
    });
}

const deleteTask = () => {
    rl.question('Enter task number to delete (1, 2, ...): ', (index) => {
        index--;
        if (isNaN(index) || index < 0 || index > tasks.length - 1) {
            console.log('Invalid task number. Please enter a valid number greater than or equal to 1.');
        } else {
            tasks.splice(index, 1);
            console.log('Task Deleted Successfully 🙂');
        }
        showActions();
    });
}

const markAsDone = () => {
    rl.question('Enter task number to mark as done (1, 2, ...): ', (index) => {
        index--;
        if (isNaN(index) || index < 0 || index > tasks.length - 1) {
            console.log('Invalid task number. Please enter a valid number greater than or equal to 1.');
        } else {
            tasks[index].isCompleted();
            console.log(`Task Number #${index + 1} is done ✅`);
        }
        showActions();
    });
}

const printTasks = (tasks) => {
    if (tasks.length === 0) {
        console.log('Tasks List is empty.');
    }
    tasks.forEach(t => {
        t.print();
    });
    showActions();
}

const viewCompletedTasks = () => {
    const filterCompletedTasks = [...tasks].filter(t => t.completed);
    printTasks(filterCompletedTasks);
}

const sortByDueDate = () => {
    const tasksSortbyDueDate = [...tasks];
    tasksSortbyDueDate.sort((t1, t2) => new Date(t1.dueDate) - new Date(t2.dueDate));
    printTasks(tasksSortbyDueDate);
}

const sortByPriority = () => {
    const tasksSortByPriority = [...tasks];
    tasksSortByPriority.sort((t1, t2) => t1.priority - t2.priority);
    printTasks(tasksSortByPriority);
}

const clearAllTasks = () => {
    if (tasks.length === 0) {
        console.log('Tasks List already is empty');
    } else {
        tasks = [];
        console.log('Clear All Tasks Successfully 🙂');
    }
    showActions();
}

showActions = () => {
    console.log(`
    
**************************************
******* Welcome to JS TODO-APP *******
**************************************
** Select an action:                **
**   1) Add a new task              **
**   2) List all tasks              **
**   3) List completed tasks        **
**   4) Mark the task as done       **
**   5) Delete a task               **
**   6) Sort tasks by the due date  **
**   7) Sort tasks by priority      **
**   8) Clear all tasks             **
**   9) Exit                        **
**************************************
`   );

    rl.question('What\'s your choice? ', (choice) => {
        console.log('Your choice is: ' + choice + '\n');
        switch (choice) {
            case '1':
                addTask();
                break;
            case '2':
                printTasks(tasks);
                break;
            case '3':
                viewCompletedTasks();
                break;
            case '4':
                markAsDone();
                break;
            case '5':
                deleteTask();
                break;
            case '6':
                sortByDueDate();
                break;
            case '7':
                sortByPriority();
                break;
            case '8':
                clearAllTasks();
                break;
            case '9':
                console.log('Good Bye :)');
                rl.close();
                break;
            default:
                console.log('Invalid choice');
                return showActions();
        }
    })
}

showActions();