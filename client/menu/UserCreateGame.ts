import { Matrix } from "../classes/matrix.ts";
import { placeShip } from "./helpers/placeShip.ts";
import { createGame } from "../api.ts";
import { shoot } from "./helpers/shoot.ts";

export const UserCreateGame = async () => {
  createGame();
  console.log("Game created successfully!");
  const userMatrix = new Matrix(10, 10);
  console.log("You can now start placing your ships on the board.");
  console.log("Use the coordinates (row, column) to place your ships.");
  console.log("For example, to place a ship at (2, 3), you would enter: 2 3");
  console.log("Once you have placed all your ships, you can start the game!");
  console.log(
    "You have 5 ships, 1 ship that takes 5 spaces(horizontaly), 2 ships that take 3 spaces(horizontaly), and 2 ships that take 2 spaces(horizontaly)."
  );
  console.log("This is your game board:");
  console.log("--------------------------");
  userMatrix.print();
  console.log("--------------------------");
  await placeShip(userMatrix, 5);
  await placeShip(userMatrix, 3);
  await placeShip(userMatrix, 3);
  await placeShip(userMatrix, 2);
  await placeShip(userMatrix, 2);
  console.log("You have placed all your ships!");
  console.log("Now you can start the game!");
  console.log("Pick a position to shoot at the computer's ships.");
  await shoot(userMatrix)
};