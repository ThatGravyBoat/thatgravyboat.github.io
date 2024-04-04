const FLAG_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag-triangle-right">
    <path d="M7 22V2l10 5-10 5"/>
</svg>
`;



const mines = [];
let cells = [];
let exposed = true;
let placed = false;

const loopAround = (x, y, callback) => {
    for (let i = Math.max(0, x - 1); i < Math.min(x + 2, mines.length); i++) {
        for (let j = Math.max(0, y - 1); j < Math.min(y + 2, mines[i].length); j++) {
            if (i === x && j === y) continue;
            callback(i, j);
        }
    }
}

function getMinesAround(x, y) {
    let minesAround = 0;
    loopAround(x, y, (i, j) => minesAround += mines[i][j] ? 1 : 0);
    return minesAround;
}

function placeMines(posX, posY) {
    if (placed) return;
    let placedMines = 0;
    while (placedMines < 10) {
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 9);
        if (Math.abs(x - posX) <= 1 && Math.abs(y - posY) <= 1) continue;
        if (!mines[x][y]) {
            mines[x][y] = true;
            placedMines++;
        }
    }
    placed = true;
}

function expose() {
    for (let cell of cells) {
        if (mines[cell.game.x][cell.game.y]) {
            cell.classList.add("mine");
        }
    }
    exposed = true;

    setTimeout(start, 3000);
}

const win = () => {
    for (let cell of cells) {
        if (!mines[cell.game.x][cell.game.y] && !cell.classList.contains("safe")) {
            return;
        }
    }
    exposed = true;
    cells.forEach(cell => cell.classList.add("win"));
    setTimeout(start, 3000);
}

function start() {
    exposed = false;
    placed = false;
    cells = [];
    for (let i = 0; i < 9; i++) {
        mines[i] = [];
        for (let j = 0; j < 9; j++) {
            mines[i][j] = false;
        }
    }

    const body = document.getElementById("body");
    body.innerHTML = "";
    body.classList.add("game");

    const board = document.createElement("div");
    board.classList.add("board");
    board.addEventListener("contextmenu", (event) => event.preventDefault());

    for (let i = 0; i < 81; i++) {
        let x = i % 9;
        let y = Math.floor(i / 9);
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.game = {
            x: x,
            y: y
        };
        cell.addEventListener("click", (event) => {
            if (exposed) return;
            if (event.button === 0 && !cell.classList.contains("flag")) {
                if (mines[x][y]) {
                    cell.classList.add("mine");
                    expose();
                } else {
                    placeMines(x, y);
                    const minesAround = getMinesAround(x, y);
                    cell.classList.add("safe");
                    win()
                    if (minesAround > 0) {
                        cell.innerText = `${minesAround}`
                        cell.dataset.neighbors = minesAround;
                    } else {
                        loopAround(x, y, (i, j) => {
                            const cell = cells[i + j * 9];
                            if (!cell.classList.contains("safe")) {
                                cell.click();
                            }
                        });
                    }
                }
            }
        });
        cell.addEventListener("contextmenu", (event) => {
            if (!cell.classList.contains("safe")) {
                cell.innerHTML = cell.classList.toggle("flag") ? FLAG_SVG : "";
            }
            event.preventDefault();
        });
        board.appendChild(cell);
        cells.push(cell);
    }

    body.appendChild(board);
}

const konmiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
]
let konmiIndex = 0;

document.addEventListener("keydown", (event) => {
    if (konmiCode[konmiIndex] === event.key) {
        konmiIndex++;
        if (konmiIndex === konmiCode.length) {
            konmiIndex = 0;
            start();
        }
    } else if (event.key === konmiCode[0]) {
        konmiIndex = 1;
    } else {
        konmiIndex = 0;
    }
});



for (let details of document.querySelectorAll("details")) {
    details.addEventListener("toggle", (event) => {
        if (event.target.open) {

        }
    });
}