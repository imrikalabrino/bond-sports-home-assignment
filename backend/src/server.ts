import express from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { rateLimiter } from './middleware/inMemoryRateLimiter';
import playerRoutes from './routes/players';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
// app.use(rateLimiter);

app.use('/api/players', playerRoutes);

app.use(errorHandler);

const server = app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
});

export { app, server };
