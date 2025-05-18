import { Router } from 'express';
import { createOrder, listOrders, listUserOrders } from '../controllers/orders.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = Router();

// для авторизованных — оформить заказ
router.post('/', auth, createOrder);

// для авторов — свои заказы
router.get('/me', auth, listUserOrders);

// для админа — посмотреть все заказы
router.get('/', auth, adminOnly, listOrders);

export default router;
