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
    let fieldSign = "empty";

    console.log("createdObject");
    const getSign = () => {
        return fieldSign
    }
    const getFieldName = () => {
        return fieldName;
    }

    const changeFieldSign = (sign) => {
        
        if ((sign === "cross" || sign === "circle") && fieldSign != "empty") {
            fieldSign = sign;
        }
        else {
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

    const showFieldsConsole = () => {
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
    }

    return {showFieldsConsole};

})();

