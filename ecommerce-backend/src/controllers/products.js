import Product from '../models/Product.js';
import redis from '../services/redis.js';

export async function getAll(req, res, next) {
  try {
    // 1. Пытаемся взять из кэша
    const cache = await redis.get('products:all');
    if (cache) {
      return res.json(JSON.parse(cache));
    }
    // 2. Если нет — из базы
    const items = await Product.find().sort({ name: 1 }).lean();
    // 3. Кладём в кэш на 60 секунд
    await redis.set('products:all', JSON.stringify(items), 'EX', 60);
    res.json(items);
  } catch (err) {
    next(err);
  }
}
export async function getById(req, res, next) {
  try {
    const item = await Product.findById(req.params.id).lean();
    if (!item) return res.sendStatus(404);
    res.json(item);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const newItem = await Product.create(req.body);
    // сброс кэша, чтобы новые товары сразу появились
    await redis.del('products:all');
    res.status(201).json(newItem);
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await redis.del('products:all');
    res.json(updated);
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    await redis.del('products:all');
    res.sendStatus(204);
  } catch (e) { next(e); }
}

