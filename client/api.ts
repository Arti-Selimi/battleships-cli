import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export function createGame() {
  socket.emit('createGame');
}

export function joinGame(gameId: string) {
  socket.emit('joinGame', { gameId });
}
