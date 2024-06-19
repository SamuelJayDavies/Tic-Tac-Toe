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

    const placeTile = (row, col) => {
        if (gameArray[row][col] != "-") {
            gameArray[row][col] = "X";
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
        for(let i=0; i<numOfRows; i++) {
            let gameFinished = true;
            for (let j=0; j<numOfColumns; j++) {
                if (gameArray[i][j] == "-") {
                    gameFinished = false;
                }
            }
            if (gameFinished) {
                return true;
            }
        }

        for(let i=0; i<numOfColumns; i++) {
            let gameFinished = true;
            for (let j=0; j<numOfRows; j++) {
                if (gameArray[j][i] == "-") {
                    gameFinished = false;
                }
            }
            if (gameFinished) {
                return true;
            }
        }

        return false;
    }

    const testMethod = () => {
        console.log(gameArray);
    }

    return {resetBoard, placeTile, printState, hasGameFinished};

})();

const Player = function (name) {
    let score = 0;

    const getScore = () => {
        return score;
    }

    const incrementScore = () => {
        score++;
    }
    return {name, getScore, incrementScore};
}

const GameController = (function () {

    const player1 = Player("Player");
    const player2 = Player("Robot");

    const gameStart = () => {
        
    }

})();

let newPlayer = Player("Sam");
console.log(newPlayer);
gameBoard.placeTile(0,1);
gameBoard.placeTile(1,1);
gameBoard.placeTile(2,1);
gameBoard.printState();
console.log(gameBoard.hasGameFinished());