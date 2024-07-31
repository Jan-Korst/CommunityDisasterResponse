import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.json());

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

class AppError extends Error {
  public statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

app.get('/users', (req, res) => {
  try {
    res.json({ message: 'Fetching users...' });
  } catch (error) {
    next(new AppError(500, 'Failed to fetch users'));
  }
});

app.post('/users', (req, res) => {
  try {
    res.json({ message: 'Creating user...' });
  } catch (error) {
    next(new AppError(500, 'Failed to create user'));
  }
});

app.get('/incidents', (req, res) => {
  try {
    res.json({ message: 'Fetching incidents...' });
  } catch (error) {
    next(new AppError(500, 'Failed to fetch incidents'));
  }
});

app.post('/incidents', (req, res, next) => {
  try {
    res.json({ message: 'Creating incident...' });
  } catch (error) {
    next(new AppError(500, 'Failed to create incident'));
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  const sendIncidentsUpdate = () => {
    socket.emit('incidentsUpdate', { message: 'Incidents updated' });
  };

  const sendUsersUpdate = () => {
    socket.emit('usersUpdate', { message: 'Users updated' });
  };

  sendIncidentsUpdate();
  sendUsersUpdate();

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});