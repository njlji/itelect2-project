// utils.js
export const mockTasks = [
  { id: '1', title: 'Task One', completed: false },
  { id: '2', title: 'Task Two', completed: true },
  { id: '3', title: 'Task Three', completed: false },
];

export const formatDate = (date) => {return `Due : ${date.toLocaleDateString()}`};

export const validateTask = (task = {}) => {const {title,dueDate} = task;return title && dueDate ? true : false;};

export const mergeTaskUpdate = (original, ...updates) => updates.at(-1);

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export const createTask = (taskData) => {
  if (!validateTask(taskData)) {
    throw new TaskValidationError("Invalid task data");
  }
  return { id: Date.now(), completed: false, ...taskData };
};

export async function fetchSampleUsers() {
  return [
    { id: '1', name: 'Leanne Graham', email: 'Sincere@april.biz' },
    { id: '2', name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
    { id: '3', name: 'Clementine Bauch', email: 'Nathan@yesenia.net' },
  ];
}
