import Order from '../models/Order.js';

export async function getCart(req, res, next) {
  try {
    const userId = req.user.id;
    let order = await Order.findOne({ userId, status: 'pending' }).populate('items.productId');
    if (!order) return res.json([]);
    const items = order.items.map(it => ({
      id: it.productId._id,
      name: it.productId.name,
      price: it.productId.price,
      qty: it.qty
    }));
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function updateCart(req, res, next) {
  try {
    const userId = req.user.id;
    const items = req.body; // expect [{ id, qty }]
    let order = await Order.findOne({ userId, status: 'pending' });
    if (!order) {
      order = new Order({ userId, items: items.map(i => ({ productId: i.id, qty: i.qty })) });
    } else {
      order.items = items.map(i => ({ productId: i.id, qty: i.qty }));
    }
    await order.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}