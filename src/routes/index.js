import express from 'express';
import authRouter from './auth.js';
import verifyToken from '../../middleware/verifyToken.js';
import { requireRole } from '../../middleware/requireRole.js';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getUsers,
} from '../../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', verifyToken, createTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, requireRole('admin'), deleteTask);
router.get('/users', getUsers);

router.use('/auth', authRouter);

export default router;