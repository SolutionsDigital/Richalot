// call p5.js explicitly as per
//  https://github.com/processing/p5.js/wiki/p5.js-overview#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup
new p5();

// the board defined as a list of lists
let board = [
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
];

// height and width of each square to be defined in setup()
// but needs to be global
let w;
let h;

// the players
// Human will be red
let human = 'R';
let ai = 'Y';

// Human to start
let currentPlayer = human;

// There is a finite number of coins that can be played
// counting them as they are played will help determine...
// ... when to start checking for a winner (not implemented)
// ... when the game finished in a tie ie coinsPLayed == 42 AND winner == null
let coinsPlayed = 0;

// array of available squares on the board
let available = [];

function setup(){
    createCanvas(400,400);

       //  w and h are the width and height of a square
        w = floor(width/7);
        h = floor(height/6);

};

// click to play
function mousePressed(){
    if (currentPlayer == human){
        // human to play
        let result;

        // detect which column the human clicked in.
        // floor() calculates the closest int value that is less than or equal to 
        // the value of the parameter.
        let j = floor(mouseX/w);
        
        // detect which is the lowest available square in that column
        // drop a red coin in that column
        // i.e. assign 'R' to the position on the board and let 
        // draw() draw a red ellipse in that position
        for (let i = 5; i>=0; i--){
            if (board[i][j] == ''){
                board[i][j] = human;
                console.log(`Human played ${i},${j}`);
                coinsPlayed++;
                // once the human has played, check for a winner
                result = checkWinner(i,j);
                console.log("Checking human resutlt -> result", result)
                // ULTIMATELY HERE IF Result = R GAME OVER
                i=0;
            };
        };

        if (result != null ){
            // stop the loop
            noLoop();
            let resultP = createP('');
            resultP.style('font-size', '32px' );
            if (result == 'tie'){
                resultP.html('Tie!');
            } else {
                resultP.html(`${result} wins!`)
            }
            console.log(result);
        } else{
            // human has played and not won switch to ai
            currentPlayer = ai;
            bestMove();
        };
    }; 
};

function bestMove(){
    let i;
    let j;
    // ai is the maximising player i.e. trying to get the highest score
    // human is the minimising player i.e. trying to get the lowest score

    // track the score of the best move for ai
    // anything better than -infinity will become the best move fo ai
    let bestScore = -Infinity;

    // track the best move itself i.e. the coordinates of the best move "move{i.j}"
    let move; 
    // for each row (0 to 6)
    for (j = 0; j < 7; j++){
        // for each column startin from the bottom (hello gravity!) (5 to 0)
        for (i = 5; i >= 0; i--){
            // if the position = '' the position is a potential option
            // so these are all possible positions for ai
            if (board[i][j] == ''){
                // try the position
                board[i][j] = ai;
                // call minimax() on the board as it is
                // and return the score for that board
                // board is the configuration of the board being tested
                // i and j are the position of the coin that has just been played (necessary for checkwinner())
                // 0 is the depth of the algorithm (how many times it has recursively called itself)
                // false is the isMaximising boolean. is the next player the minimising or the maximising player?
                let score = minimax(board, i, j, 0, false);
                // undo the move. At this stage, ai is testing only, not playing
                board[i][j] = '';
                // if the score is greater than the best score, the score becomes the new best score
                // and the move becomes the new best move
                if (score > bestScore){
                    bestScore = score;
                    move = {i,j};
                }
                i=0;
            } 
        }
    }
    board[move.i][move.j]=ai;
    coinsPlayed++
    // ai has played switch back to human
    currentPlayer = human;
}

function checkWinner(wi,wj){

    // Winner can only happen once at least 8 coins (10 for diagonal)/4 rounds have been played
    // MAYBE SET UP A COUNTER FOR ROUNDS AND PUT checkWinner in an If then conditional sutructure 

    let winner = null;

    // CHECK HORIZONTAL
    let Rconnect = 0;
    let Lconnect  = 0;
    let i = 0;
    // check to the right of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (Rconnect)
    try {
        do { 
            Rconnect++;
            i++;
        }
        while (board[wi][wj] == board[wi][wj+i]);
        
        i = 0;
        
        // check to the left of the coin just played
        // as long as coins are the same colour
        // save the number of consecutive coins of the same colour (Lconnect)
        do { 
            Lconnect++;
            i++;
        }
        while (board[wi][wj] == board[wi][wj-i]);
        
        // once Right and left have been checked add the scores
        // substract 1 as the coin being played is effectively counted twice
        // If the score is equal or superior to 4
        // 4 coins of the same colour have been connected horizontally.
        // we have a winner
        if (Rconnect+Lconnect-1 >= 4){
            // console.log(`${board[wi][wj]} wins`);
            winner = board[wi][wj];
            return winner
        }
    } catch {}
    
    // CHECK VERTICAL.
    // only need to check below the coin that has just been played
    // only need to do this check if j=2 i.e. the coin is on the 
    //  fourth row from the bottom
    try {
        if (wi <= 2){
            let Bconnect = 1;
            let j = 1;
            // check to the right of the coin just played
            // as long as coins are the same colour
            // save the number of consecutive coins of the same colour (Rconnect)
            do {
                if (board[wi][wj] == board[wi+j][wj]){
                    Bconnect++;
                    j++;
                    if (Bconnect == 4){
                        // console.log(`${board[wi][wj]} wins`);
                        winner = board[wi][wj];
                        return winner
                    }
                }         
            }
            while (board[wi][wj] == board[wi+j][wj] && [wi+j] < 6);            
        }
    } catch {}

    // CHECK TOP RIGHT TO BOTTOM LEFT DIAGONAL
    // Combines vertical and horizontal checks 
    let LBconnect = 0;
    let RTconnect  = 0;
    
    let k = 0;
    let l = 0;
    let m = 0;
    let n = 0;
    // check one to the left and one to the bottom of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            LBconnect++;
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            k++;
            l--;
        }
        while (board[wi][wj] == board[wi+k][wj+l]);
        
        k = 0;
        l = 0;
    } catch {};


    // check one to the right and one to the top of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            RTconnect++;
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            m--;
            n++;
        }
        while (board[wi][wj] == board[wi+m][wj+n]);
        
        m = 0;
        n = 0;
    } catch {};

    // Once bottom left and top right directions have been checked, 
    // substract 1 as the coin being played is effectively counted twice
    // If the score is equal or superior to 4
    // 4 coins of the same colour have been connected horizontally.
    // we have a winner
    if (LBconnect+RTconnect-1 >= 4){
        // console.log(`${board[wi][wj]} wins`);
        winner = board[wi][wj];
        return winner
    }

    // CHECK TOP LEFT TO BOTTOM RIGHT DIAGONAL

    let RBconnect = 0;
    let LTconnect  = 0;
    
    let o = 0;
    let p = 0;
    let q = 0;
    let r = 0;
    // check one to the left and one to the bottom of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            RBconnect++;
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            o++;
            p++;
        }
        while (board[wi][wj] == board[wi+o][wj+p]);
        
        o = 0;
        p = 0;
    } catch {};


    // check one to the right and one to the top of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            LTconnect++;
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            q--;
            r--;
        }
        while (board[wi][wj] == board[wi+q][wj+r]);
        
        q = 0;
        r = 0;
    } catch {};

    // Once bottom left and top right directions have been checked, 
    // substract 1 as the coin being played is effectively counted twice
    // If the score is equal or superior to 4
    // 4 coins of the same colour have been connected horizontally.
    // we have a winner
    if (RBconnect+LTconnect-1 >= 4){
        // console.log(`${board[wi][wj]} wins`);
        winner = board[wi][wj];
        return winner
    }

    // if all coins have been played and there is no winner
    // we have a tie
    if (coinsPlayed == 42 && winner !== null){
        winner = 'tie';
        return winner
    }

    // if non of the above have been resulted in any winner, 
    // just return winner as null
    return winner;
}


let scores = {
    R: -1,
    Y: 1,
    tie:0
}

function minimax(board, i, j, depth, isMaximising){

    let result = checkWinner(i,j);
    console.log("Checking ai resutlt -> result", result);
    // IF AI WINS WITH THE FIRST MOVE THEY TRY IT WILL BE CAUGHT HERE
    // RETURN THE "WIN STATUS" SOMHOW AND DO NOT GO FURTHER
    if (result !== null){
        console.log("exiting minimax", result)
        console.log("TCL: minimax -> scores[result]", scores[result])
        return scores[result];
    } else {
        if(isMaximising){
            // if the value that ws passed is true
            // i.e. the move to be tested is ai's. ai is the maximising player
            // calculate and return the score of that move to bestMove()
            // bestMove() will assess if the score is higher than the best score and the move the best move 

            // Any score will be greater than -Infinity  so a best score will happen
            let bestScore = -Infinity;

            for (j = 0; j < 7; j++){
                // for each column startin from the bottom (hello gravity!) (5 to 0)
                for (i = 5; i >= 0; i--){
                    // if the position = '' the position is a potential option
                    // so these are all possible positions for human to play after ai has played
                    if (board[i][j] == ''){
                        // try the position
                        board[i][j] = ai;
                        let score = minimax(board, i,j, depth++, false);
                        board[i][j] = '';
                        bestScore = max(score, bestScore);
                    }
                }
            }
            return bestScore;

        } else {
            // the value that was passed is false
            // i.e. the move to be tested is the human's. human is the maximising player
            // calculate and return the score of that move to bestMove()
            // bestMove() will assess if the score higher than the best score and the move the best move 

            // any score will be lower than Infinity so a best score will happen
            let bestScore = Infinity;

            for (j = 0; j < 7; j++){
                // for each column startin from the bottom (hello gravity!) (5 to 0)
                for (i = 5; i >= 0; i--){
                    // if the position = '' the position is a potential option
                    // so these are all possible positions for human to play after ai has played
                    if (board[i][j] == ''){
                        // try the position
                        board[i][j] = human;
                        let score = minimax(board, i,j, depth++, true);
                        board[i][j] = '';
                        bestScore = min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
}

function draw(){
    background(220);
    strokeWeight(4);
    fill('blue');


    let posx = 0;
    let posy = 0;

    // additions and substractions offset the strokeWeight(4)
    rect(posx+2, posy+2, width-4, height-4);

    // draw 7 horizontal lines
    for (x = 0; x < 5; x++) {
        line(posx, posy+h, posx+width, posy+h);
        posy = posy+h;
    };

    posx = 0;
    posy = 0;

    // draw 8 vertical lines
    for (y = 0; y < 6; y++){        
        line(posx+w, posy, posx+height/7, posy+height);
        posx = posx+w
    }; 


    // render the board with coins
    // check per colum, stop when you get to a blank 
    // or to the top of the column
    
    for (let i=0; i<7; i++){
        for (let j=0; j<6; j++){
            let x = w * i + w/2;
            let y = h *j +h/2;

            let spot = board[j][i];
            if (spot=='R'){
                fill('red');
                ellipse(x,y,w/1.2);
            } else if (spot=='Y') {
                fill('yellow');
                ellipse(x,y,w/1.2);
            } else {
                fill('white');
                ellipse(x,y,w/1.2);
            };
        };
    };

    // // display winner
    // let result = checkWinner();
    // // if the result is not null i.e. has been assigned

    // if (winner !== null) {
    // console.log("TCL: draw -> and the winner is winner", winner);
    // }
}