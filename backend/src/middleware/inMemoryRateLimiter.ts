import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env';

class InMemoryRateLimiter {
    private requests: Map<string, number[]> = new Map();

    isRateLimited(ip: string): boolean {
        const now = Date.now();
        const windowStart = now - ENV.RATE_LIMIT_WINDOW_MS;

        const requestTimestamps = this.requests.get(ip) || [];
        const requestsInWindow = requestTimestamps.filter(timestamp => timestamp > windowStart);

        if (requestsInWindow.length >= ENV.RATE_LIMIT_MAX_REQUESTS) {
            return true;
        }

        requestsInWindow.push(now);
        this.requests.set(ip, requestsInWindow);

        return false;
    }
}

const limiter = new InMemoryRateLimiter();

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';

    if (ip === 'unknown') {
        console.warn('Unable to determine IP address for rate limiting');
        return next();
    }

    if (limiter.isRateLimited(ip)) {
        res.status(429).json({ message: 'Too many requests, please try again later.' });
    } else {
        next();
    }
};
