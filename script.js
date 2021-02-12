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

    

    return { addPoint, displayPoints, getPoints }
}

const fieldFactory = (a, b) => {
    const fieldName = "x" + a + "-" + "y" + b;
    const fieldPositionX = a;
    const fieldPositionY = b;
    let fieldSign = "";

    console.log("createdObject");
    const getSign = () => {
        return fieldSign
    }
    const getFieldName = () => {
        return fieldName;
    }

    const changeFieldSign = (sign) => {
        
        if ((sign === "X" || sign === "O") && fieldSign == "") {
            fieldSign = sign;
        }
        else {
            console.log(sign);
            console.log((sign === "X" || sign === "O") && fieldSign == "");
            console.error("Tried to enter wrong sign");
        }

    }

    const clearField = () => {
        fieldSign = "empty";
    }

    return { changeFieldSign, getSign, getFieldName, clearField }
}

const gameBoard = (() => {
    let board = {};
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            const fieldTemp = fieldFactory(i, j);
            board[fieldTemp.getFieldName()] = fieldTemp;
        }
    }
    console.log(board);

/*     const showFieldsConsole = () => {
        let fieldGrid = "";
        for(let i = 0; i < board.length; i++) {
            fieldGrid += "|"
            if(board[i].getSign() == "cross"){
                fieldGrid += " X ";
            }
            else if(board[i].getSign() === "circle") {
                fieldGrid += " O ";
            }
            else {
                fieldGrid += " _ ";
            }
            
            if((i+1)%3 === 0) {
                fieldGrid += "| \n";
            }
        }
        console.log(fieldGrid);
    } */

    const getBoard = () => {
        return board;
    }

    const playerPlay = (position, sign) => {
        board[position].changeFieldSign(sign);
    }

    return {getBoard, playerPlay};

})();

const displayController = (() => {
    const refreshBoard = (board) => {
        let fieldsNames = Object.keys(board);
        
        let container = document.querySelector("#board");

        const toDelete = document.querySelectorAll(".field");
        for(let i = 0; i < toDelete.length; i++) {
            toDelete[i].remove()
        }

        fieldsNames.forEach(fieldName => {
            let field = document.createElement("button");
            field.setAttribute("data-field", fieldName);
            field.classList.add("field");
            field.textContent = board[fieldName].getSign();
            field.addEventListener("click", (e) => {
                gameBoard.playerPlay(e.target.getAttribute("data-field"), "O");
                displayController.refreshBoard(gameBoard.getBoard());
            });
            container.appendChild(field);
        });
    }

    return {refreshBoard};
    
})();



gameBoard.playerPlay("x1-y1", "O");
gameBoard.playerPlay("x1-y2", "X");


displayController.refreshBoard(gameBoard.getBoard());
