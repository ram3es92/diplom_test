import Redis from 'ioredis';

// Используем URL из .env: REDIS_URL=redis://redis:6379
const redis = new Redis(process.env.REDIS_URL);

redis.on('error', err => {
  console.error('[ioredis] Error connecting to Redis:', err);
});

export default redis;