import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res, next) {
  console.log('=== Register handler entered ===');
  console.log('Request body:', req.body);
  try {
    const { email, password } = req.body;
    console.log(`Registering ${email}`);
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash: hash, role: 'user' });
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '24h' });
    console.log('Registration successful, sending token');
    res.json({ token });
  } catch (err) {
    console.error('Error in register handler:', err);
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}
