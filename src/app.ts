import express, { Request, Response, NextFunction, Errback } from 'express';

import cors from 'cors';

import { errorMiddleware } from './middlewares/error.middleware';
import { authMiddleware } from './middlewares/auth.middleware'

import { UserRoutes, QuestionRoutes, AuthRoutes } from './routes'

require('express-async-errors');

const app = express();
import './database';

// Settings
app.set('port', 3001);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/questions", QuestionRoutes);

app.use(errorMiddleware);

app.listen(app.get('port'), () => {
    console.log("App listening on port 3001")
})


