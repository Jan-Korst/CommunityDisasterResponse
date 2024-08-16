import express, { Request, Response } from 'express';
require('dotenv').config();
const router = express.Router();
const isAuthenticated = (req: Request, res: Response, next: Function) => {
  const userIsAuthenticated = true;
  if (userIsAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
router.post('/register', (req: Request, res: Response) => {
  res.json({ message: 'Registration successful' });
});
router.post('/login', (req: Request, res: Response) => {
  res.json({ message: 'Login successful', token: 'fake-jwt-token' });
});
router.get('/session', isAuthenticated, (req: Request, res: Response) => {
  res.json({ message: 'You are authenticated', user: { id: 1, username: 'User123' } });
});
export default router;