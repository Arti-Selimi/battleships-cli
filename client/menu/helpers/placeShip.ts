import { Matrix } from "../../classes/matrix.ts";
import { Ship } from "../../classes/ships.ts";

import * as readline from 'readline';

function ask(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    return new Promise(resolve => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

export const placeShip = async (matrix: Matrix, length: number): Promise<void> => {
    let valid = false;
  
    while (!valid) {
      try {
        const answer = await ask(
          `Enter starting position (row col) for a ship of length ${length}: `
        );
        const [rowStr, colStr] = answer.trim().split(' ');
        const row = parseInt(rowStr, 10);
        const col = parseInt(colStr, 10);
  
        if (isNaN(row) || isNaN(col)) {
          console.log("❌ Invalid input. Please enter numbers like: 2 3");
          continue;
        }
  
        if (col + length > 10 || row >= 10 || row < 0 || col < 0) {
          console.log("❌ Ship does not fit on the board. Try again.");
          continue;
        }
  
        let overlap = false;
        for (let i = 0; i < length; i++) {
          if (matrix.getValue(row, col + i) !== 0) {
            overlap = true;
            break;
          }
        }
        if (overlap) {
          console.log("❌ Ship overlaps with another. Try a different position.");
          continue;
        }
  
        for (let i = 0; i < length; i++) {
          matrix.setValue(row, col + i, 1);
        }
  
        console.log(`✅ Ship of length ${length} placed at (${row}, ${col})`);
        const positions: [number, number][] = [];
        for (let i = 0; i < length; i++) {
          positions.push([row, col + i]);
        }

        const ship = new Ship(length, positions);    

        matrix.addShip(ship);

        matrix.print();
        
        valid = true;
      } catch (err) {
        console.log("❌ Error placing ship:", err);
      }
    }
  };
  
