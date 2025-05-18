import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { getCart, updateCart } from '../controllers/cart.js';

const router = Router();
router.get('/', auth, getCart);
router.post('/', auth, updateCart);

export default router;