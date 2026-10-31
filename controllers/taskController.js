import models from '../models/index.cjs';

const { Task, User } = models;

export async function getTasks(req, res) {
  try {
    const where = req.user?.role === 'admin' ? {} : { userId: req.user.id };
    const tasks = await Task.findAll({ where, include: User });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTaskById(req, res) {
  try {
    const where = req.user?.role === 'admin' ? {} : { userId: req.user.id };
    const task = await Task.findOne({ where: { id: req.params.id, ...where }, include: User });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createTask(req, res) {
  try {
    const { title, dueDate, completed = false } = req.body;
    const safeTitle = typeof title === 'string' ? title.trim() : '';
    const safeDueDate = dueDate || new Date().toISOString().slice(0, 10);

    if (!safeTitle || !safeDueDate) {
      return res.status(400).json({ error: 'Invalid task data' });
    }

    const task = await Task.create({ title: safeTitle, dueDate: safeDueDate, completed, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTask(req, res) {
  try {
    const where = req.user?.role === 'admin' ? {} : { userId: req.user.id };
    const task = await Task.findOne({ where: { id: req.params.id, ...where } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await task.update(req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const where = req.user?.role === 'admin' ? {} : { userId: req.user.id };
    const task = await Task.findOne({ where: { id: req.params.id, ...where } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
