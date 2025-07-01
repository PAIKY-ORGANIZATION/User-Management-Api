import './bootstrap.js' // This  needs to be imported at the top in order for environment variables to be loaded successfully.

import express from 'express';
import { errorMiddleware } from './middleware/error-middleware.js';
import { reqLogger } from './middleware/req-logger.js';
import { router as usersRouter } from './routes/users-router.js';
import { router as loggerRouter } from './routes/logger-router.js';
import { UserService } from '../users/user-service.js';
import { JwtTokenProvider } from '../users/providers/jwt-provider.js';

const app = express();




const jwtTokenProvider = new JwtTokenProvider()


const userService = new UserService()


app.use(express.json());

//Custom middleware
app.use(reqLogger)

//Routes
app.use('/api',  usersRouter);
app.use('/api',  loggerRouter);

//Error Middleware
app.use(errorMiddleware) // Optional, recommended

// I exported the app for testing in vitest without running the server:
export default app
