let cPoints = [
     [0, 0],
     [4, 4],
];
let isError = 0;
let stepsSolve = -1;
let best = [];

let run = (matrix, i, j, move, lastMove) => {
     let sMatrix, auxMaze;

     sMatrix = copyMatrix(matrix);

     if (
          i < 0 ||
          i >= rows ||
          j < 0 ||
          j >= columns ||
          matrix[i][j] == "0" ||
          matrix[i][j] == "-1" ||
          parseInt(matrix[i][j]) >= 3
     )
          return null;

     if (lastMove != move && lastMove != -1)
          switch (move.toString()) {
               case "3":
                    sMatrix[i][j - 1] = move.toString();
                    break;
               case "4":
                    sMatrix[i - 1][j] = move.toString();
                    break;
               case "5":
                    sMatrix[i][j + 1] = move.toString();
                    break;
               case "6":
                    sMatrix[i + 1][j] = move.toString();
                    break;
          }

     if (cPoints[1][0] == i && cPoints[1][1] == j) {
          return copyMatrix(sMatrix);
     }
     sMatrix[i][j] = move.toString();

     auxMaze = run(sMatrix, i, j + 1, 3, move);

     if (auxMaze == null) auxMaze = run(sMatrix, i + 1, j, 4, move);
     if (auxMaze == null) auxMaze = run(sMatrix, i, j - 1, 5, move);
     if (auxMaze == null) auxMaze = run(sMatrix, i - 1, j, 6, move);

     if (auxMaze != null) {
          return copyMatrix(auxMaze);
     } else return null;
};

let run2 = (matrix, i, j, move, lastMove, steps) => {
     let sMatrix, auxMaze;

     sMatrix = copyMatrix(matrix);

     if (
          i < 0 ||
          i >= rows ||
          j < 0 ||
          j >= columns ||
          matrix[i][j] == "0" ||
          matrix[i][j] == "-1" ||
          parseInt(matrix[i][j]) >= 3
     )
          return null;

     if (lastMove != move && lastMove != -1)
          switch (move.toString()) {
               case "3":
                    sMatrix[i][j - 1] = move.toString();
                    break;
               case "4":
                    sMatrix[i - 1][j] = move.toString();
                    break;
               case "5":
                    sMatrix[i][j + 1] = move.toString();
                    break;
               case "6":
                    sMatrix[i + 1][j] = move.toString();
                    break;
          }

     if (cPoints[1][0] == i && cPoints[1][1] == j) {
          if (steps < stepsSolve || stepsSolve == -1) {
               stepsSolve = steps;
               best = copyMatrix(sMatrix);
               return copyMatrix(sMatrix);
          }
          return null;
     }
     sMatrix[i][j] = move.toString();

     auxMaze = run2(sMatrix, i, j + 1, 3, move, steps + 1);

     auxMaze = run2(sMatrix, i + 1, j, 4, move, steps + 1);
     auxMaze = run2(sMatrix, i, j - 1, 5, move, steps + 1);
     auxMaze = run2(sMatrix, i - 1, j, 6, move, steps + 1);

     if (auxMaze != null) {
          return copyMatrix(auxMaze);
     } else return null;
};

let getMatrix = () => {
     let matrix = [];

     for (let i = 0; i < rows; i++) {
          matrix.push([]);
          let row = document.getElementById(`fila${i + 1}`);
          for (let j = 0; j < columns; j++) {
               let value = row.children[j].getAttribute("value");
               matrix[i].push(value);
          }
     }

     return matrix;
};

let buildWay = (matrix) => {
     for (let i = 0; i < rows; i++) {
          let row = document.getElementById(`fila${i + 1}`);
          for (let j = 0; j < columns; j++) {
               if (!row.children[j].classList.contains("point")) {
                    let image = "";
                    switch (matrix[i][j]) {
                         case "3":
                              image = "derecha";
                              break;
                         case "4":
                              image = "abajo";
                              break;
                         case "5":
                              image = "izquierda";
                              break;
                         case "6":
                              image = "arriba";
                              break;
                         default:
                              image = "";
                              break;
                    }

                    row.children[
                         j
                    ].style.backgroundImage = `url(Resources/${image}.png)`;
               }
          }
     }
};

let solve = () => {
     if (cPoints.length >= 2) {
          let matrix = getMatrix();
          if (1) {
               let succes = run(
                    matrix,
                    cPoints[0][0],
                    cPoints[0][1],
                    "-1",
                    "-1"
               );
               if (succes != null) {
                    removeErrorWay();
                    buildWay(succes);
               } else {
                    buildWay(matrix);
                    errorWay();
               }
          } else {
               best = [];
               let succes = run2(
                    matrix,
                    cPoints[0][0],
                    cPoints[0][1],
                    "-1",
                    "-1",
                    0
               );
               stepsSolve = -1;
               if (best.length != 0) {
                    removeErrorWay();
                    buildWay(best);
               } else {
                    buildWay(matrix);
                    errorWay();
               }
          }
     }
};

let errorWay = () => {
     for (let i = 0; i < rows; i++) {
          let row = document.getElementById(`fila${i + 1}`);
          for (let j = 0; j < columns; j++) {
               if (!row.children[j].classList.contains("wall"))
                    row.children[j].classList.add("error");
          }
     }
     isError = 1;
};

let removeErrorWay = () => {
     for (let i = 0; i < rows; i++) {
          let row = document.getElementById(`fila${i + 1}`);
          for (let j = 0; j < columns; j++) {
               if (!row.children[j].classList.contains("wall"))
                    row.children[j].classList.remove("error");
          }
     }
     isError = 0;
};

let copyMatrix = (bMatrix) => {
     return bMatrix.map(function (arr) {
          return arr.slice();
     });
};
