import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import cartRouter     from './routes/cart.js';
import ordersRouter   from './routes/orders.js';

const app = express();

app.use(cors());                // чтобы фронт мог обращаться
app.use(express.json());        // чтобы парсились JSON-тела запросов

// ВСЕ api-роуты
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

// глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

export default app;
