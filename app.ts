import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.json());

app.get('/users', (req, res) => {
  res.json({ message: 'Fetching users...' });
});

app.post('/users', (req, res) => {
  res.json({ message: 'Creating user...' });
});

app.get('/incidents', (req, res) => {
  res.json({ message: 'Fetching incidents...' });
});

app.post('/incidents', (req, res) => {
  res.json({ message: 'Creating incident...' });
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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});