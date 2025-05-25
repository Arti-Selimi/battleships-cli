import { io } from 'socket.io-client';
import { UserCreateGame } from './menu/UserCreateGame.ts';
import * as readline from 'readline';

const socket = io('http://localhost:3000');

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log("Welcome to Battleships CLI, a new programmer friendly way of playing!");

  socket.on('connect', () => {
    console.log(`Connected to server with id ${socket.id}`);
  });

  socket.on('gameCreated', ({ gameId }) => {
    console.log(`Game created! Your game ID is: ${gameId}`);
    UserCreateGame()
  });

  socket.on('gameJoined', ({ gameId }) => {
    console.log(`Game Joined! Your game ID is: ${gameId}`);
    UserCreateGame();
  });
  
  socket.on('error', ({ message }) => {
    console.log(`❌ Error: ${message}`);
  });

  const menu_choice = await ask('Pick your poison: \n 1. Create a new game \n 2. Join an existing game \n 3. Exit \n');

  if (menu_choice === '1') {
    socket.emit('createGame');
  } else if (menu_choice === '2') {
    const gameId = await ask('Enter the game ID to join: ');
    socket.emit('joinGame', { gameId });
  } else if (menu_choice === '3') {
    console.log('Exiting...');
    socket.disconnect();
    return;
  } else {
    console.log('Invalid choice, please try again.');
    return main();
  }
}

main();
