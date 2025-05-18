import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/products.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = Router();

// публичный список и просмотр
router.get('/', getAll);
router.get('/:id', getById);

// операции только для admin
router.post('/', auth, adminOnly, create);
router.put('/:id', auth, adminOnly, update);
router.delete('/:id', auth, adminOnly, remove);

export default router;

