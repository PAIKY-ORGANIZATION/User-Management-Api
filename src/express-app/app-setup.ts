import './bootstrap.js' // This  needs to be imported at the top in order for environment variables to be loaded successfully.

import express from 'express';
import { errorMiddleware } from 'custom-exceptions-express';
import { router as usersRouter } from './routes/users-router.js';
import { router as loggerRouter } from './routes/logger-router.js';
import { UserService } from '../users/user-service.js';
import { JwtTokenProvider } from '../users/providers/jwt-provider.js';
import { BcryptHasher } from '../users/providers/hash-provider.js';
import { PrismaUserRepository } from '../users/providers/prisma-provider.js';
import { prisma } from './lib/db.js';
import reqLoggerExpress from 'req-logger-express';
const app = express();




//* Initialize all objects
const jwtTokenProvider = new JwtTokenProvider(process.env.JWT_SECRET!)
const bcryptHasher = new BcryptHasher()
const prismaUserRepository = new PrismaUserRepository(prisma)
export const userService = new UserService(jwtTokenProvider, bcryptHasher, prismaUserRepository)


app.use(express.json());

//Custom middleware
app.use(reqLoggerExpress('User_Manager_API'));

//Routes
app.use('/api',  usersRouter);
app.use('/api',  loggerRouter);

//Error Middleware
app.use(errorMiddleware) // Optional, recommended

// I exported the app for testing in vitest without running the server:
export default app
