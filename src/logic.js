const squares = document.querySelectorAll(".square");
console.log(squares);
let currentPlayer = "x";
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];

for (let i = 0; i < squares.length; i++) {
    everysquare(squares[i], i);
};

function everysquare(square, index) {
    square.addEventListener("click", working);

    function working() {
        if (gameOver) {
            return;
        }
        if (board[index] !== "") {
            document.getElementById("message").textContent="Oopsie! That slot is already taken. "
            return;
        }
        square.textContent = currentPlayer;
        board[index] = currentPlayer;
        if (checkForWin()) {
            document.getElementById("message").textContent = currentPlayer.toUpperCase() + " wins!";
            markWinningSquares();
            gameOver = true;
        } 
        else if (board.indexOf("") === -1) {
            document.getElementById("message").textContent = "It's a tie!";
            gameOver = true;
        } 
        else {
            currentPlayer = currentPlayer === "x" ? "o" : "x";
            document.getElementById("message").textContent = "It's " + currentPlayer.toUpperCase() + "'s turn";
        }
    };
}

function checkForWin() {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}
function markWinningSquares() {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
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