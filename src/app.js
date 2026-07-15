// app.js - Main application entry point
console.log('Server starting...'); 

import { formatDate, validateTask, mergeTaskUpdate} from './utills.js';

console.log(formatDate(new Date("2026-07-22")))
console.log(validateTask({title:"fortnite", dueDate:"asdf"}))
console.log(mergeTaskUpdate({title:"Old"}, {title:"New"}))