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
        gameArray[row][col] = "X";
    }

    const printState = () => {
        for(let i=0; i<numOfRows; i++) {
            for(let j=0; j<numOfColumns; j++) {
                console.log(gameArray[i][j]);
            }
            console.log("\n");
        }
    }

    const testMethod = () => {
        console.log(gameArray);
    }

    return {resetBoard, placeTile, printState};

})();

const Player = function (name) {
    let score = 0;
    return {name, score};
}

let newPlayer = Player("Sam");
console.log(newPlayer);
gameBoard.placeTile(1,2);
gameBoard.printState();