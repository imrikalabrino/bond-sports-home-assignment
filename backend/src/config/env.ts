import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    BALLDONTLIE_API_KEY: process.env.BALLDONTLIE_API_KEY,
    // REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    RATE_LIMIT_WINDOW_MS: 60 * 1000,
    RATE_LIMIT_MAX_REQUESTS: 30,
};

const requiredEnvVars = ['BALLDONTLIE_API_KEY'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});
