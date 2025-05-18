import Order from '../models/Order.js';

export async function createOrder(req, res, next) {
  try {
    const { items } = req.body; // [{ productId, qty }, ...]
    const order = await Order.create({
      userId: req.user._id,
      items,
      status: 'в обработке'
    });
    res.status(201).json(order);
  } catch (e) { next(e); }
}

export async function listOrders(req, res, next) {
  try {
    const orders = await Order.find().populate('userId','email').lean();
    res.json(orders);
  } catch (e) { next(e); }
}

export async function listUserOrders(req, res, next) {
  try {
    const orders = await Order
      .find({ userId: req.user._id })
      .populate('items.productId','name price image')
      .lean();
    res.json(orders);
  } catch (err) {
    next(err);
  }
}