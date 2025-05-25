import { Matrix } from "../../classes/matrix.ts";


export const shoot = (matrix: Matrix) => {
    console.log("Shoot at the computer's ships by entering the coordinates (row, column).");
    console.log("For example, to shoot at (2, 3), you would enter: 2 3");
    matrix.print()
}