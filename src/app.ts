import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
