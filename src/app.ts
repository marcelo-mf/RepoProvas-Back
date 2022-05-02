import express, {json} from 'express';
import cors from 'cors';
import "express-async-errors";
import authRouter from './routers/authRouter.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import dotenv from 'dotenv';
import contentRouter from './routers/contentRouter.js';
dotenv.config();


const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(contentRouter);
app.use(errorHandlerMiddleware);

const PORT = 5000 || process.env.PORT; 
app.listen(PORT, () => console.log('running on port ' + PORT));
