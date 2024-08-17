import express, { Request, Response, NextFunction } from 'express';
require('dotenv').config();

const app = express();
const router = express.Router();

app.use(express.json());

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const userIsAuthenticated = true;

  if (userIsAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'An error occurred on the server.' });
};

router.post('/register', (req: Request, res: Response) => {
  try {
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', (req: Request, res: Response) => {
  try {
    res.json({ message: 'Login successful', token: 'fake-jwt-token' });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

router.get('/session', isAuthenticated, (req: Request, res: Response) => {
  try {
    res.json({ message: 'You are authenticated', user: { id: 1, username: 'User123' } });
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve session information', error: error.message });
  }
});

app.use(errorHandler);

export default router;