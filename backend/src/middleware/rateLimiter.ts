import { Store } from 'express-rate-limit';
import { ENV } from '../config/env';

interface CustomRateLimitInfo {
    totalHits: number;
    resetTime: Date;
    remainingPoints: number;
}

class InMemoryStore implements Store {
    private storage: Map<string, { totalHits: number; resetTime: number }>;

    constructor() {
        this.storage = new Map();
    }

    async increment(key: string): Promise<CustomRateLimitInfo> {
        const now = Date.now();
        const record = this.storage.get(key);

        if (!record || record.resetTime <= now) {
            const resetTime = now + ENV.RATE_LIMIT_WINDOW_MS;
            this.storage.set(key, { totalHits: 1, resetTime });
            return {
                totalHits: 1,
                resetTime: new Date(resetTime),
                remainingPoints: ENV.RATE_LIMIT_MAX_REQUESTS - 1
            };
        }

        record.totalHits += 1;
        return {
            totalHits: record.totalHits,
            resetTime: new Date(record.resetTime),
            remainingPoints: Math.max(0, ENV.RATE_LIMIT_MAX_REQUESTS - record.totalHits)
        };
    }

    async decrement(key: string): Promise<void> {
        const record = this.storage.get(key);
        if (record) {
            record.totalHits = Math.max(0, record.totalHits - 1);
        }
    }

    async resetKey(key: string): Promise<void> {
        this.storage.delete(key);
    }
}

import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: ENV.RATE_LIMIT_WINDOW_MS,
    max: ENV.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.',
    store: new InMemoryStore(),
});
