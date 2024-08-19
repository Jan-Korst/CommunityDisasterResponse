import express, { Request, Response, NextFunction } from 'express';
require('dotenv').config();

const app = express();
const router = express.Router();

app.use(express.json());

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

app.use(requestLogger);

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const userIsAuthenticated = true;

  if (userIsAuthenticated) {
    console.log('User is authenticated');
    next();
  } else {
    console.log('User is unauthorized');
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'An error occurred on the server.' });
};

router.post('/register', (req: Request, res: Response) => {
  try {
    console.log('Register attempt by:', req.body.username);
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', (req: Request, res: Response) => {
  try {
    console.log('Login attempt by:', req.body.username);
    res.json({ message: 'Login successful', token: 'fake-jwt-token' });
  } catch (error) {
    console.error('Login failed', error);
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

router.get('/session', isAuthenticated, (req: Request, res: Response) => {
  try {
    console.log('Authenticated session access by user ID:', req.body.id);
    res.json({ message: 'You are authenticated', user: { id: 1, username: 'User123' } });
  } catch (error) {
    console.error('Failed to retrieve session information', error);
    res.status(400).json({ message: 'Failed to retrieve session information', error: error.message });
  }
});

app.use('/api', router);

app.use(errorHandler);

export default app;