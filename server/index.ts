import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createGame, joinGame, setShipsPlaced } from './gameManager.ts';
import type { Game } from './gameManager.ts';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

type GameMap = Record<string, ReturnType<typeof createGame>>;
const games: Record<string, Game> = {};

server.listen(3000, '0.0.0.0' , () => {
  console.log('🚀 Server listening on http://localhost:3000');
});

io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on('createGame', () => {
      const gameId = createGame(games, socket.id);
      socket.join(gameId);
      socket.emit('gameCreated', { gameId });
    });
  
    socket.on('joinGame', ({ gameId }) => {
      const result = joinGame(games, gameId, socket.id);
      if (result.success) {
        socket.join(gameId);
        socket.emit('gameJoined', { gameId });
      } else {
        socket.emit('error', { message: result.message });
      }
    });
    

    socket.on('shipsPlaced', ({ gameId }) => {
      const bothReady = setShipsPlaced(games, gameId, socket.id);
      if (bothReady) {
        io.to(gameId).emit('startGame', { gameId });
      }
    });
  });
  