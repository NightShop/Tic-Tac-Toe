const playerFactory = (name, signChoice) => {
    let score = 0;
    const sign = signChoice;
    const addPoint = () => {
        score++;
    }
    const displayPoints = () => {
        console.log(score);
    }
    const getPoints = () => {
        return score;
    }

    const getAssignedSign = () => {
        return sign;
    }



    return { name, addPoint, displayPoints, getPoints, getAssignedSign }
}

//Fields of gameboard grid
const fieldFactory = (a, b) => {
    const fieldName = "x" + a + "-" + "y" + b;
    let fieldSign = "";

    console.log("createdObject");

    const getSign = () => {
        return fieldSign;
    }

    //Fieldname aka position
    const getFieldName = () => {
        return fieldName;
    }

    const changeFieldSign = (sign) => {

        if ((sign === "X" || sign === "O") && fieldSign == "") {
            fieldSign = sign;
            return true;
        }
        else {
            console.log(sign);
            console.log((sign === "X" || sign === "O") && fieldSign == "");
            console.error("Tried to enter wrong sign");
            return false;
        }

    }

    const clearField = () => {
        fieldSign = "";
    }

    return { changeFieldSign, getSign, getFieldName, clearField }
}

const game = (() => {
    let board = {};
    let players = [];

    let currentSignToInsert = "";

    //create board
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            const fieldTemp = fieldFactory(i, j);
            board[fieldTemp.getFieldName()] = fieldTemp;
        }
    }

    const setFirstSign = (sign) => {
        if (currentSignToInsert === "") {
            currentSignToInsert = sign;
        }
    }

    const setPlayers = (playerOne, playerTwo) => {
        players.push(playerFactory(playerOne, "O"));
        players.push(playerFactory(playerTwo, "X"));
        console.log(players);
    }

    const getPlayers = () => {
        return players;
    }

    const changeSignToInsert = () => {
        if (currentSignToInsert == "O") {
            currentSignToInsert = "X";
        }
        else if (currentSignToInsert == "X") {
            currentSignToInsert = "O";
        }
        else {
            console.error("not valid input sign in changeSignToInsert")
        }
    };

    const getBoard = () => {
        return board;
    }

    const playerPlay = (position) => {
        const isValidChange = board[position].changeFieldSign(currentSignToInsert);
        if (isValidChange) {
            changeSignToInsert();
        }
        displayController.refreshBoard(game.getBoard());
        afterGameProcedure(ifWinnerReturn());
    }

    const ifWinnerReturn = () => {
        if(Object.values(board).every(value => value.getSign() != "")) {
            return "tie";
        }

        if (board["x0-y0"].getSign() === board["x1-y0"].getSign() &&
            board["x0-y0"].getSign() === board["x2-y0"].getSign() &&
            board["x0-y0"].getSign() !== "") {
            let winner = players.find(player => board["x0-y0"].getSign() === player.getAssignedSign());
            return winner;
        }

        else if (board["x0-y0"].getSign() === board["x0-y1"].getSign() &&
            board["x0-y0"].getSign() === board["x0-y2"].getSign() &&
            board["x0-y0"].getSign() !== "") {
            let winner = players.find(player => board["x0-y0"].getSign() === player.getAssignedSign());
            return winner;
        }

        else if (board["x2-y2"].getSign() === board["x1-y2"].getSign() &&
            board["x2-y2"].getSign() === board["x0-y2"].getSign() &&
            board["x2-y2"].getSign() !== "") {
            let winner = players.find(player => board["x2-y2"].getSign() === player.getAssignedSign());
            return winner;
        }

        else if (board["x2-y2"].getSign() === board["x2-y1"].getSign() &&
            board["x2-y2"].getSign() === board["x2-y0"].getSign() &&
            board["x2-y2"].getSign() !== "") {
            let winner = players.find(player => board["x2-y2"].getSign() === player.getAssignedSign());
            return winner;
        }

        else if (board["x1-y1"].getSign() === board["x1-y0"].getSign() &&
            board["x1-y1"].getSign() === board["x1-y2"].getSign() &&
            board["x1-y1"].getSign() !== "") {
            let winner = players.find(player => board["x1-y1"].getSign() === player.getAssignedSign());
            return winner;
        }

        else if (board["x1-y1"].getSign() === board["x0-y1"].getSign() &&
            board["x1-y1"].getSign() === board["x2-y1"].getSign() &&
            board["x1-y1"].getSign() !== "") {
            let winner = players.find(player => board["x1-y1"].getSign() === player.getAssignedSign());
            return winner;
        }

        else if (board["x1-y1"].getSign() === board["x0-y0"].getSign() &&
            board["x1-y1"].getSign() === board["x2-y2"].getSign() &&
            board["x1-y1"].getSign() !== "") {
            let winner = players.find(player => board["x1-y1"].getSign() === player.getAssignedSign());
            return winner;
        }

        else if (board["x1-y1"].getSign() === board["x2-y0"].getSign() &&
            board["x1-y1"].getSign() === board["x0-y2"].getSign() &&
            board["x1-y1"].getSign() !== "") {
            let winner = players.find(player => board["x1-y1"].getSign() === player.getAssignedSign());
            return winner;
        }

        else {
            return "";
        }





    }

    const afterGameProcedure = (winner) => {
        if(winner === "tie") {
            window.alert(`It's a tie!`);
            resetBoard();
        }
        else if (winner != "") {
            winner.addPoint();
            window.alert(`Winner is ${winner.name}`);
            resetBoard();
        }
    }

    const resetBoard = () => {
        for (field in board) {
            board[field].clearField();
        }
        displayController.refreshBoard(game.getBoard());
    }


    return { getPlayers, getBoard, playerPlay, setFirstSign, setPlayers, resetBoard };

})();

const displayController = (() => {
    const refreshBoard = (board) => {
        let fieldsNames = Object.keys(board);

        let container = document.querySelector("#board");

        const toDelete = document.querySelectorAll(".field");
        for (let i = 0; i < toDelete.length; i++) {
            toDelete[i].remove()
        }

        fieldsNames.forEach(fieldName => {
            let field = document.createElement("button");
            field.setAttribute("data-field", fieldName);
            field.classList.add("field");
            field.textContent = board[fieldName].getSign();
            field.addEventListener("click", (e) => {
                game.playerPlay(e.target.getAttribute("data-field"), "O");
                displayController.refreshBoard(game.getBoard());
            });
            container.appendChild(field);
        });

        const players = game.getPlayers();
        const playerOneScore = document.querySelector("#playerOneScore");
        playerOneScore.textContent = players[0].getPoints();
        const playerTwoScore = document.querySelector("#playerTwoScore");
        playerTwoScore.textContent = players[1].getPoints();


    }



    return { refreshBoard };

})();

//event listeners
let yourSignButtons = document.querySelectorAll(".yourSign");
yourSignButtons.forEach(button => button.addEventListener("click", e => game.setFirstSign(e.target.textContent)));

let startGameButton = document.querySelector("#startGame");
startGameButton.addEventListener("click", () => {
    let playerOneName = document.querySelector("#playerOneName").value;
    let playerTwoName = document.querySelector("#playerTwoName").value;
    game.setPlayers(playerOneName, playerTwoName);
    displayController.refreshBoard(game.getBoard());

});

let restartGameButton = document.querySelector("#restartGame");
restartGameButton.addEventListener("click", game.resetBoard);




