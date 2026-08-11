import express from 'express';
import { fetchSampleUsers } from '../utils.js';

const router = express.Router();

const tasks = [
  { id: '1', title: 'Task One', completed: false },
  { id: '2', title: 'Task Two', completed: true },
  { id: '3', title: 'Task Three', completed: false },
];

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

router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;