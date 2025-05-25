import { Ship } from "./ships.ts";

type Shoot = 0 | 1;

export class Matrix {
  private matrix: number[][];
  private ships: Ship[] = [];

  constructor(rows: number, cols: number) {
    this.matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  setValue(row: number, col: number, value: Shoot): void {
    if (this.isValidPosition(row, col)) {
      this.matrix[row][col] = value;
    } else {
      throw new Error("Invalid position");
    }
  }

  getValue(row: number, col: number): number {
    if (this.isValidPosition(row, col)) {
      return this.matrix[row][col];
    } else {
      throw new Error("Invalid position");
    }
  }

  addShip(ship: Ship): void {
    this.ships.push(ship);
  }

  private isValidPosition(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.matrix.length &&
      col >= 0 &&
      col < this.matrix[0].length
    );
  }

  print(): void {
    for (let row = 0; row < this.matrix.length; row++) {
      let line = "";
      for (let col = 0; col < this.matrix[row].length; col++) {
        const hasShip = this.ships.some(ship =>
          ship.getPositions().some(([r, c]) => r === row && c === col)
        );
        line += hasShip ? "■ " : "▫ ";
      }
      console.log(line.trim());
    }
  }
}
