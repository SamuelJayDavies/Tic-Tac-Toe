const gameBoard = (function () {
    const numOfRows = 3;
    const numOfColumns = 3;

    let hasGameFinishedBool = false;
    let movesMade = 0;

    const initialiseBoard = () => {
        return Array.from({length: numOfRows},
            () => Array(numOfColumns).fill("-"));
    }

    let gameArray = initialiseBoard();

    const resetBoard = () => {
        gameArray = initialiseBoard();
        movesMade = 0;
        hasGameFinishedBool = false;
    }

    const placeTile = (row, col, tileChar) => {
        if (!hasGameFinishedBool) {
            if (gameArray[row][col] == "-") {
                gameArray[row][col] = tileChar;
                movesMade++;
                return true;
            } else {
                return false;
            }
        }
    }

    const printState = () => {
        for(let i=0; i<numOfRows; i++) {
            for(let j=0; j<numOfColumns; j++) {
                console.log(gameArray[i][j]);
            }
            console.log("\n");
        }
    }

    const hasGameFinished = () => {
        hasGameFinishedBool = true;
        let currentTileChar;
        for(let i=0; i<numOfRows; i++) {
            hasGameFinishedBool = true;
            currentTileChar = gameArray[i][0];
            console.log(currentTileChar);
            for (let j=0; j<numOfColumns; j++) {
                if (gameArray[i][j] == "-" || gameArray[i][j] != currentTileChar) {
                    hasGameFinishedBool = false;
                } 
            }
            if (hasGameFinishedBool) {
                return true;
            }
        }

        for(let i=0; i<numOfColumns; i++) {
            hasGameFinishedBool = true;
            currentTileChar = gameArray[0][i];
            for (let j=0; j<numOfRows; j++) {
                if (gameArray[j][i] == "-" || gameArray[j][i] != currentTileChar) {
                    hasGameFinishedBool = false;
                }
            }
            if (hasGameFinishedBool) {
                return true;
            }
        }   

        hasGameFinishedBool = true;
        currentTileChar = gameArray[0][0];
        for(let i=0; i<numOfRows; i++) {
            if (gameArray[i][i] == "-" || gameArray[i][i] != currentTileChar) {
                hasGameFinishedBool = false;
            }
        }
        if (hasGameFinishedBool) {
            return true;
        }

        hasGameFinishedBool = true;
        let currentRow = numOfRows-1;
        let currentColumn = 0;
        currentTileChar = gameArray[currentRow][currentColumn];
        for(let i=0; i<numOfColumns; i++) {
            if (gameArray[currentRow][currentColumn] == "-" || 
                gameArray[currentRow][currentColumn] != currentTileChar) {
                    hasGameFinishedBool = false;
            }
            currentRow--;
            currentColumn++;
        }
        if (hasGameFinishedBool) {
            return true;
        } 

        return false;
    }

    const hasGameDrawn = () => {
        return movesMade == numOfColumns * numOfRows;
    }

    const testMethod = () => {
        console.log(gameArray);
    }

    return {resetBoard, placeTile, printState, hasGameFinished, hasGameDrawn};

})();

const Player = function (name, tileGraphic, tileChar) {
    let score = 0;

    const setScore = (newScore) => {
        score = newScore;
    }

    const getScore = () => {
        return score;
    }

    const getTileGraphic = () => {
        return tileGraphic;
    }

    const getTileChar = () => {
        return tileChar;
    }

    return {name, setScore, getScore, getTileGraphic, getTileChar};
}

const GameController = (function () {

    const player1Graphic = "icons/x-alt-icon.png";
    const player2Graphic = "icons/o-alt-icon.png";

    const player1 = Player("Player", player1Graphic, "x");
    const player2 = Player("Robot", player2Graphic, "o");
    let currentPlayer = player1;

    const gameTiles = document.getElementsByClassName("game-tile");
    const gameWinMessage = document.getElementById("congrats-message");

    for (let gameTile of gameTiles) {
        gameTile.addEventListener("click", function() {
            selectTile(gameTile, currentPlayer);
        })
    }

    const selectTile = (gameTile, player) => {
        /** Validation */
        const tileRow = gameTile.getAttribute('data-tileRow');
        const tileColumn = gameTile.getAttribute('data-tileColumn');

        console.log(tileRow + " " + tileColumn)
        
        if (gameBoard.placeTile(tileRow, tileColumn, player.getTileChar())) {
            const img = gameTile.getElementsByClassName("game-tile-img");
            img[0].src= player.getTileGraphic();

            if (gameBoard.hasGameFinished()) {
                gameWinMessage.textContent = "Congrats " + player.name + " You Have Won!";
                gameWinMessage.classList.remove("invisible");
                console.log(currentPlayer.name + " has won!");
                player.setScore(player.getScore() + 1);
                GameViewController.gameFinished(player1, player2);
            } else if (gameBoard.hasGameDrawn()) {
                gameWinMessage.textContent = "Game Has Drawn...";
                gameWinMessage.classList.remove("invisible");
                console.log("Nobody has won!");
            } else {
                switchPlayer();
            }
        } else {
            /** Logic here for when a move is invalid */
            console.log("Invalid Move");
        }
    }

    const resetBoard = () => {
        for (let gameTile of gameTiles) {
            const img = gameTile.getElementsByClassName("game-tile-img");
            img[0].src = "icons/dash.png";
        }
        gameWinMessage.classList.add("invisible");
        currentPlayer = player1;
    }

    const resetPlayers = () => {
        player1.setScore(0);
        player2.setScore(0);
        GameViewController.updateScore(player1, player2);
    }

    const switchPlayer = () => {
        (currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1);
    }

    const gameStart = () => {
        
    }

    return {resetBoard, resetPlayers};

})();

const GameViewController = (function () {
    const dialogBox = document.getElementById("dialog-box");
    const gameModeBtns = document.getElementById("gamemode-buttons");
    const cpuBtn = document.getElementById("cpuBtn");
    const humanBtn = document.getElementById("humanBtn");
    const beginBtn = document.getElementById("beginBtn");

    const player1Score = document.getElementById("player1-score");
    const player2Score = document.getElementById("player2-score");

    const textContainer = document.getElementById("text-container");
    const resetBtn = document.getElementById("resetBtn");

    const gameFinished = (player1, player2) => {
        updateScore(player1, player2);
        let newGameBtn = document.createElement("button");
        newGameBtn.classList.add("menuBtn");
        newGameBtn.id = "newGameBtn";
        newGameBtn.textContent = "Play Again?";
        newGameBtn.addEventListener("click", () => {
            gameBoard.resetBoard();
            GameController.resetBoard();
            textContainer.removeChild(newGameBtn);

        })
        textContainer.appendChild(newGameBtn);
    }

    const updateScore = (player1, player2) => {
        console.log(player1.getScore());
        player1Score.textContent = player1.getScore();
        player2Score.textContent = player2.getScore();
    }

    cpuBtn.addEventListener("click", () => {
        gameModeBtns.removeChild(humanBtn);
        beginBtn.style.backgroundColor = "#008D9A";
    })

    humanBtn.addEventListener("click", () => {
        gameModeBtns.removeChild(cpuBtn);
        beginBtn.style.backgroundColor = "#F48FF9";
    })

    beginBtn.addEventListener("click", () => {
        dialogBox.classList.remove("open");
    })

    document.addEventListener("DOMContentLoaded", () => {
        dialogBox.classList.add("open");
    })

    resetBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        GameController.resetBoard();
        GameController.resetPlayers();

        const newGameBtn = document.getElementById("newGameBtn");


        if (newGameBtn != null) {
            textContainer.removeChild(newGameBtn);
        }
    })

    return {gameFinished, updateScore};

})();

const player1 = Player('Alice', 'X', 'A');
console.log(player1.getScore()); // Should log 0
player1.setScore(10);
console.log(player1.getScore()); // Should log 10