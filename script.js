const gameBoard = (function () {
    const numOfRows = 3;
    const numOfColumns = 3;

    const initialiseBoard = () => {
        return Array.from({length: numOfRows},
            () => Array(numOfColumns).fill("-"));
    }

    let gameArray = initialiseBoard();

    const resetBoard = () => {
        for(let i=0; i<numOfRows; i++) {
            for(let j=0; j<numOfColumns; j++) {
                gameArray[i][j] = "-";
            }
        }
    }

    const placeTile = (row, col, tileChar) => {
        if (gameArray[row][col] == "-") {
            gameArray[row][col] = tileChar;
            return true;
        } else {
            return false;
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
        let gameFinished = true;
        let currentTileChar;
        for(let i=0; i<numOfRows; i++) {
            gameFinished = true;
            currentTileChar = gameArray[i][0];
            console.log(currentTileChar);
            for (let j=0; j<numOfColumns; j++) {
                if (gameArray[i][j] == "-" || gameArray[i][j] != currentTileChar) {
                    gameFinished = false;
                } 
            }
            if (gameFinished) {
                return true;
            }
        }

        for(let i=0; i<numOfColumns; i++) {
            gameFinished = true;
            currentTileChar = gameArray[0][i];
            for (let j=0; j<numOfRows; j++) {
                if (gameArray[j][i] == "-" || gameArray[j][i] != currentTileChar) {
                    gameFinished = false;
                }
            }
            if (gameFinished) {
                return true;
            }
        }   

        gameFinished = true;
        currentTileChar = gameArray[0][0];
        for(let i=0; i<numOfRows; i++) {
            if (gameArray[i][i] == "-" || gameArray[i][i] != currentTileChar) {
                gameFinished = false;
            }
        }
        if (gameFinished) {
            return true;
        }

        gameFinished = true;
        let currentRow = numOfRows-1;
        let currentColumn = 0;
        currentTileChar = gameArray[currentRow][currentColumn];
        for(let i=0; i<numOfColumns; i++) {
            if (gameArray[currentRow][currentColumn] == "-" || 
                gameArray[currentRow][currentColumn] != currentTileChar) {
                gameFinished = false;
            }
            currentRow--;
            currentColumn++;
        }
        if (gameFinished) {
            return true;
        } 

        return false;
    }

    const testMethod = () => {
        console.log(gameArray);
    }

    return {resetBoard, placeTile, printState, hasGameFinished};

})();

const Player = function (name, tileGraphic, tileChar) {
    let score = 0;

    const getScore = () => {
        return score;
    }

    const incrementScore = () => {
        score++;
    }

    const getTileGraphic = () => {
        return tileGraphic;
    }

    const getTileChar = () => {
        return tileChar;
    }

    return {name, getScore, incrementScore, getTileGraphic, getTileChar};
}

const GameController = (function () {

    const player1Graphic = "icons/x-icon.png";
    const player2Graphic = "icons/o-icon.png";

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
            } else {
                switchPlayer();
            }
        } else {
            /** Logic here for when a move is invalid */
            console.log("Invalid Move");
        }
    }

    const switchPlayer = () => {
        (currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1);
    }

    const gameStart = () => {
        
    }

})();