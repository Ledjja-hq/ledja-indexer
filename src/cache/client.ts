import Redis from 'ioredis';
import { config } from '../config';

export const redis = new Redis(config.redisUrl);

redis.on('connect', () => console.log('Redis connected'));
redis.on('error', (err) => console.error('Redis error:', err));

export async function cacheGet(key: string): Promise<string | null> {
  return redis.get(key);
}

export async function cacheSet(key: string, value: string, ttlSeconds?: number): Promise<void> {
  if (ttlSeconds) {
    await redis.set(key, value, 'EX', ttlSeconds);
  } else {
    await redis.set(key, value);
  }
}

export async function cacheDel(key: string): Promise<void> {
  await redis.del(key);
}
