// utils.js
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
