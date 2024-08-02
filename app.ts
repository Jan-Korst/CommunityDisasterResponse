import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.json());

enum LogLevel {
  INFO = "info",
  ERROR = "error"
}

function log(message: string, level: LogLevel = LogLevel.INFO) {
  const timestamp = new Date().toISOString();
  console.log(`[${level.toUpperCase()}] - ${timestamp}: ${message}`);
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  log(err.stack, LogLevel.ERROR);
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

app.get('/users', (req, res, next) => {
  try {
    res.json({ message: 'Fetching users...' });
    log('Fetched users successfully.', LogLevel.INFO);
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(500, 'Failed to fetch users'));
    }
  }
});

app.post('/users', (req, res, next) => {
  try {
    res.json({ message: 'Creating user...' });
    log('Created user successfully.', LogLevel.INFO);
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(500, 'Failed to create user'));
    }
  }
});

app.get('/incidents', (req, res, next) => {
  try {
    res.json({ message: 'Fetching incidents...' });
    log('Fetched incidents successfully.', LogLevel.INFO);
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(500, 'Failed to fetch incidents'));
    }
  }
});

app.post('/incidents', (req, res, next) => {
  try {
    res.json({ message: 'Creating incident...' });
    log('Created incident successfully.', LogLevel.INFO);
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(500, 'Failed to create incident'));
    }
  }
});

io.on('connection', (socket) => {
  log('A user connected', LogLevel.INFO);

  const sendIncidentsUpdate = () => {
    socket.emit('incidentsUpdate', { message: 'Incidents updated' });
  };

  const sendUsersUpdate = () => {
    socket.emit('usersUpdate', { message: 'Users updated' });
  };

  sendIncidentsUpdate();
  sendUsersUpdate();

  socket.on('disconnect', () => {
    log('A user disconnected', LogLevel.INFO);
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  log(`Server running on port ${PORT}`, LogLevel.INFO);
});