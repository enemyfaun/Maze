let grid;
let isActiveSelection = 0;
let rows = 5;
let columns = 5;

let inizializateGrid = () => {
     grid = document.getElementById("Grid");

     for (let i = 1; i <= rows; i++) {
          let row = document.createElement("fila");
          row.classList.add("flex-row");
          row.id = `fila${i}`;
          grid.appendChild(row);
          for (let j = 1; j <= columns; j++) {
               let square = document.createElement("cuadro");
               square.classList.add(`column${j}`);

               if ((i == 1 && j == 1) || (i == rows && j == columns)) {
                    square.setAttribute("value", "1");
                    square.classList.add("point");
               } else square.setAttribute("value", "2");

               square.setAttribute("onclick", "toggleWall(this)");
               row.appendChild(square);
          }
     }

     actualizateSizeSquares();
     actualizateTittle();
     solve();
};

let addRow = () => {
     let row = document.createElement("fila");
     row.classList.add("flex-row");
     row.id = `fila${rows + 1}`;
     grid.appendChild(row);
     for (let j = 1; j <= columns; j++) {
          let square = document.createElement("cuadro");
          square.classList.add(`column${j}`);
          square.setAttribute("value", "2");
          square.setAttribute("onclick", "toggleWall(this)");
          row.appendChild(square);
     }

     rows++;

     actualizateSizeSquares();
     actualizateTittle();
};

let removeRow = () => {
     if (rows > 1) {
          let row = document.getElementById(`fila${rows}`);

          grid.removeChild(row);

          rows--;

          removePoints();
          removeSteps();
          actualizateSizeSquares();
          actualizateTittle();
     }
};

let addColumn = () => {
     for (let i = 1; i <= rows; i++) {
          let row = document.getElementById(`fila${i}`);
          let square = document.createElement("cuadro");
          square.classList.add(`column${columns + 1}`);
          square.setAttribute("value", "2");
          square.setAttribute("onclick", "toggleWall(this)");
          row.appendChild(square);
     }

     columns++;
     actualizateSizeSquares();
     actualizateTittle();
};

let removeColumn = () => {
     if (columns > 1) {
          for (let i = 0; i < rows; i++) {
               document.getElementById(`fila${i + 1}`).lastChild.remove();
          }

          columns--;
          removePoints();
          removeSteps();
          actualizateSizeSquares();
          actualizateTittle();
     }
};

let toggleWall = (square) => {
     if (isError) square.classList.remove("error");
     if (!isActiveSelection) {
          if (square.getAttribute("value") == "2")
               square.setAttribute("value", "0");
          else if (square.getAttribute("value") == "1") {
               square.setAttribute("value", "0");
               removePoints();
          } else square.setAttribute("value", "2");
          square.classList.toggle("wall");
     } else {
          square.setAttribute("value", "1");
          square.classList.add("point");
          square.classList.remove("wall");
          if (isActiveSelection == 1)
               document
                    .getElementById("points")
                    .classList.remove("pointsButton");
          let i = parseInt(square.parentNode.id.replace("fila", "")) - 1;
          let j = parseInt(square.classList[0].replace("column", "")) - 1;
          console.log(square);
          cPoints.push([i, j]);
          isActiveSelection--;
     }
     solve();
};

let setPoints = () => {
     if (!isActiveSelection) {
          isActiveSelection = 2;
          removePoints();
          removeSteps();
          document.getElementById("points").classList.add("pointsButton");
     }
};

let removePoints = () => {
     for (let i = 1; i <= rows; i++) {
          let row = document.getElementById(`fila${i}`);
          for (let j = 0; j < columns; j++) {
               row.children[j].classList.remove("point");
               if (row.children[j].getAttribute("value") == "1")
                    row.children[j].setAttribute("value", 2);
          }
     }
};

let removeSteps = () => {
     for (let i = 1; i <= rows; i++) {
          let row = document.getElementById(`fila${i}`);
          for (let j = 0; j < columns; j++) {
               if (row.children[j].getAttribute("value") != "0") {
                    row.children[j].style.backgroundImage = "";
                    if (row.children[j].getAttribute("value") == "1")
                         row.children[j].setAttribute("value", "2");
               }
          }
     }
     cPoints = [];
};

let actualizateSizeSquares = () => {
     let squares = document.getElementsByTagName("cuadro");

     if (columns >= rows)
          for (let item of squares) {
               item.style.width = `calc(60vh / ${columns})`;
               item.style.height = `calc(60vh / ${columns})`;
          }
     else
          for (let item of squares) {
               item.style.width = `calc(60vh / ${rows})`;
               item.style.height = `calc(60vh / ${rows})`;
          }
};

let actualizateTittle = () => {
     let tittle = document.getElementById("size");
     size.innerHTML = `${rows} x ${columns}`;
};

let inizializateButtons = () => {
     document.getElementById("addRow").addEventListener("click", addRow);
     document.getElementById("removeRow").addEventListener("click", removeRow);
     document.getElementById("addColumn").addEventListener("click", addColumn);
     document
          .getElementById("removeColumn")
          .addEventListener("click", removeColumn);
     document.getElementById("points").addEventListener("click", setPoints);
};

let inizializate = () => {
     inizializateGrid();
     inizializateButtons();
};

window.onload = inizializate;
