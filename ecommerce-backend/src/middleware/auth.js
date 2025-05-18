import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // подтягиваем полный объект пользователя
    req.user = await User.findById(payload.id).lean();
    next();
  } catch {
    res.sendStatus(403);
  }
}

// middleware только для админов
export function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  next();
}
