import express from 'express';
import { fetchSampleUsers, validateTask, mergeTaskUpdate, mockTasks } from '../utils.js';

const router = express.Router();
const tasks = mockTasks;

const sampleUsers = await fetchSampleUsers();
const cachedUsers = Array.isArray(sampleUsers)
  ? sampleUsers.map(({ id, name, email }) => ({ id, name, email }))
  : [];

router.get('/tasks', (req, res) => {
  res.json(tasks);
});

router.get('/tasks/:id', (req, res) => {
  const task = tasks.find((item) => item.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

router.post('/tasks', (req, res) => {
  const taskData = req.body;
  if (!validateTask(taskData)) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const createdTask = {
    id: String(Date.now()),
    completed: false,
    ...taskData,
  };

  tasks.push(createdTask);
  res.status(201).json(createdTask);
});

router.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = mergeTaskUpdate(tasks[index], req.body);
  tasks[index] = updatedTask;
  res.json(updatedTask);
});

router.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});

router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;