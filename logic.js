const squares = document.querySelectorAll(".square");
let gameMode = "player";
let currentPlayer = "x";
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];
let xWins = 0;
let aiWins = 0;

function restart() {
    currentPlayer = "x";
    gameOver = false;
    board = ["", "", "", "", "", "", "", "", ""];

    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
        squares[i].classList.remove("win");
    }
    document.getElementById("message").textContent =
        "It's " + currentPlayer.toUpperCase() + "'s turn";
}

function switchGameMode() {
    gameMode = gameMode === "player" ? "ai" : "player";
    restart();
    if (gameMode === "ai") {
        document.getElementById("switchButton").textContent = "Switch to Player";
        document.getElementById("message").textContent =
            "Game mode switched. It's X's turn";
        document.getElementById("xWins").textContent = "0";
        document.getElementById("aiWins").textContent = "0";
        document.querySelector("#scoreboard .player").textContent = "AI";
    } else {
        document.getElementById("switchButton").textContent = "Switch to AI";
        document.getElementById("message").textContent =
            "Game mode switched. It's " + currentPlayer.toUpperCase() + "'s turn";
        document.getElementById("xWins").textContent = "0";
        document.getElementById("aiWins").textContent = "0";
        document.querySelector("#scoreboard .player").textContent = "O";
    }
}



function updateScoreboard() {
    document.getElementById("aiWins").textContent = aiWins;
    document.getElementById("xWins").textContent = xWins;

}

function incrementWinCounter(player) {
    if (player === "x" ) {
        xWins++;
    } else {
        aiWins++;
    }
    updateScoreboard();
}

for (let i = 0; i < squares.length; i++) {
    addClickHandler(squares[i], i);
}

function addClickHandler(square, index) {
    square.addEventListener("click", function () {
        if (gameOver || board[index] !== "") {
            return;
        }
        square.textContent = currentPlayer;
        board[index] = currentPlayer;

        if (checkForWin()) {
            document.getElementById("message").textContent =
                currentPlayer.toUpperCase() + " wins!";
            markWinningSquares();
            incrementWinCounter(currentPlayer);
            
            gameOver = true;
        } else if (board.indexOf("") === -1) {
            document.getElementById("message").textContent = "It's a tie!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "x" ? "o" : "x";
            document.getElementById("message").textContent =
                "It's " + currentPlayer.toUpperCase() + "'s turn";
            if (currentPlayer === "o" && gameMode === "ai") {
                setTimeout(() => {
                    makeAIMove();
                }, 300);
            }
        }
    });
}


function makeAIMove() {
    const bestMove = brain();
    board[bestMove] = currentPlayer;
    squares[bestMove].textContent = currentPlayer;

    if (checkForWin()) {
        document.getElementById("message").textContent =
            currentPlayer.toUpperCase() + " wins!";
            incrementWinCounter(currentPlayer);
        markWinningSquares();
        gameOver = true;
    } else if (board.indexOf("") === -1) {
        document.getElementById("message").textContent = "It's a tie!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "x" ? "o" : "x";
        if (gameMode === "ai") {
            document.getElementById("message").textContent = "It's X's turn";
        } else {
            document.getElementById("message").textContent = "It's AI's turn";
        }
    }
}

function checkForWin() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}

function markWinningSquares() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            squares[a].classList.add("win");
            squares[b].classList.add("win");
            squares[c].classList.add("win");
            break;
        }
    }
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function brain() {
    let possibleMoves = [];
    let cornerOpen = [];
    let edgeOpen = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            possibleMoves.push(i);
        }
    }
    let len = possibleMoves.length;

    const lines = [
        [0, 1, 2],
        [2, 1, 0],
        [2, 0, 1],
        [1, 0, 2],
        [0, 2, 1],
        [1, 2, 0],
        [3, 4, 5],
        [5, 4, 3],
        [3, 5, 4],
        [4, 5, 3],
        [5, 3, 4],
        [4, 3, 5],
        [6, 7, 8],
        [8, 7, 6],
        [7, 8, 6],
        [6, 8, 7],
        [7, 6, 8],
        [8, 6, 7],
        [0, 3, 6],
        [6, 3, 0],
        [3, 0, 6],
        [6, 0, 3],
        [3, 6, 0],
        [0, 6, 3],
        [1, 4, 7],
        [7, 4, 1],
        [4, 7, 1],
        [1, 7, 4],
        [4, 1, 7],
        [7, 1, 4],
        [2, 5, 8],
        [8, 5, 2],
        [2, 8, 5],
        [5, 8, 2],
        [8, 2, 5],
        [5, 2, 8],
        [0, 4, 8],
        [8, 4, 0],
        [8, 0, 4],
        [4, 0, 8],
        [4, 8, 0],
        [0, 8, 4],
        [2, 4, 6],
        [6, 4, 2],
        [4, 6, 2],
        [2, 6, 4],
        [4, 2, 6],
        [6, 2, 4],

    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (board[a] == "o" && board[b] == "o" && board[c] == "") {
            return c;
        }
        if (board[b] == "o" && board[c] == "o" && board[a] == "") {
            return a;
        }
        if (board[a] == "o" && board[c] == "o" && board[b] == "") {
            return b;
        }
        if (board[a] == "x" && board[b] == "x" && board[c] == "") {
            return c;
        }
        if (board[b] == "x" && board[c] == "x" && board[a] == "") {
            return a;
        }
        if (board[a] == "x" && board[c] == "x" && board[b] == "") {
            return b;
        }
    }
    for (let i = 0; i < len; i++) {
        if (possibleMoves[i] === 4) {
            return 4;
        }
    }
    for (let i = 0; i < len; i++) {
        if (
            possibleMoves[i] === 1 ||
            possibleMoves[i] === 3 ||
            possibleMoves[i] === 5 ||
            possibleMoves[i] === 7
        ) {
            edgeOpen.push(possibleMoves[i]);
        }
    }
    console.log(edgeOpen);
    if (edgeOpen.length > 0) {
        return getRandomItem(edgeOpen);
    }
    for (let i = 0; i < len; i++) {
        if (
            possibleMoves[i] === 0 ||
            possibleMoves[i] === 2 ||
            possibleMoves[i] === 6 ||
            possibleMoves[i] === 8
        ) {
            cornerOpen.push(possibleMoves[i]);
        }
    }
    console.log(cornerOpen);
    if (cornerOpen.length > 0) {
        return getRandomItem(cornerOpen);
    }


}
