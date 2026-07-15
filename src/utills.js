// utils.js
export const formatDate = (date) => {return `Formatted Date : ${date.toLocaleDateString()}`};

export const validateTask = (task = {}) => {const {title,dueDate} = task;return title && dueDate ? true : false;};



export const mergeTaskUpdate = (original, ...updates) => updates.at(-1)