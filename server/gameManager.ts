import { Matrix } from "../client/classes/matrix.ts";

export type Game = {
    players: string[];
    shipPlacementDone: Record<string, boolean>;
    board: Record<string, Matrix>;
    turn: string;
  };
  
  export const createGame = (games: Record<string, Game>, player1Id: string): string => {
    const gameId = Math.random().toString(36).substring(2, 8);
    games[gameId] = {
      players: [player1Id],
      shipPlacementDone: { [player1Id]: false },
      board: {},
      turn: player1Id,
    };
    return gameId;
  };
  
  export const joinGame = (games: Record<string, Game>, gameId: string, player2Id: string) => {
    const game = games[gameId];
    if (!game) return { success: false, message: 'Game not found' };
    if (game.players.length >= 2) return { success: false, message: 'Game full' };
  
    game.players.push(player2Id);
    game.shipPlacementDone[player2Id] = false;
    return { success: true };
  };
  
  export const setShipsPlaced = (games: Record<string, Game>, gameId: string, playerId: string) => {
    const game = games[gameId];
    if (!game) return false;
  
    game.shipPlacementDone[playerId] = true;
  
    const bothPlaced = game.players.every(id => game.shipPlacementDone[id]);
    return bothPlaced;
  };
  