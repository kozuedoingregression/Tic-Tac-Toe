const squares = document.querySelectorAll(".square");
        let currentPlayer = "x";
        let gameOver = false;
        let board = ["", "", "", "", "", "", "", "", ""];

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
                    gameOver = true;
                } else if (board.indexOf("") === -1) {
                    document.getElementById("message").textContent = "It's a tie!";
                    gameOver = true;
                } else {
                    currentPlayer = currentPlayer === "x" ? "o" : "x";
                    document.getElementById("message").textContent =
                        "It's " + currentPlayer.toUpperCase() + "'s turn";
                    if (currentPlayer === "o") {
                        makeAIMove();
                    }
                }
            });
        }

        function makeAIMove() {
            // Find the best move using the minimax algorithm
            const bestMove = brain();
            console.log(bestMove);
            board[bestMove] = currentPlayer;
            squares[bestMove].textContent = currentPlayer;

            if (checkForWin()) {
                document.getElementById("message").textContent =
                    currentPlayer.toUpperCase() + " wins!";
                markWinningSquares();
                gameOver = true;
            } else if (board.indexOf("") === -1) {
                document.getElementById("message").textContent = "It's a tie!";
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === "x" ? "o" : "x";
                document.getElementById("message").textContent =
                    "It's " + currentPlayer.toUpperCase() + "'s turn";
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
                if (
                    board[a] !== "" &&
                    board[a] === board[b] &&
                    board[a] === board[c]
                ) {
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
                if (
                    board[a] !== "" &&
                    board[a] === board[b] &&
                    board[a] === board[c]
                ) {
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

                if (board[a] !== "" && board[a] == board[c] && possibleMoves.includes(b)) {
                    return b;
                }

            }
            for (let i = 0; i < len; i++) {
                if (possibleMoves[i] === 4) {
                    return 4;
                }
            }
            for (let i = 0; i < len; i++) {
                if (possibleMoves[i] === 0 || possibleMoves[i] === 2 || possibleMoves[i] === 6 || possibleMoves[i] === 8) {
                    cornerOpen.push(possibleMoves[i]);
                }
            }
            console.log(cornerOpen)
            if (cornerOpen.length > 0) {
                return getRandomItem(cornerOpen);
            }


            for (let i = 0; i < len; i++) {
                if (possibleMoves[i] === 1 || possibleMoves[i] === 3 || possibleMoves[i] === 5 || possibleMoves[i] === 7) {
                    edgeOpen.push(possibleMoves[i]);
                }
            }
            console.log(edgeOpen)
            if (edgeOpen.length > 0) {
                return getRandomItem(edgeOpen);
            }
        }