// call p5.js explicitly as per
//  https://github.com/processing/p5.js/wiki/p5.js-overview#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup
new p5();

// the board defined as a list of lists
let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

// width and height need to be global
// they are instantiated in setup() but
// need to be visible in dra()
let w;
let h;

// the players
let ai = 'X';
let human = 'O';
// human starts the game
let currentPlayer = human;
// array of available squares on the board

function setup(){
    createCanvas(400,400);

    //  w and h are the width and height of a square
    w = width/3;
    h = height/3;

    bestMove();
}

// function testing the equality of three parameters
function equals3(a,b,c){
    return a==b && b==c && a != '';
}

function checkWinner(){
    let winner = null;
    
    // check rows for a winner
    for (let i = 0 ; i < 3; i++){
        if (equals3(board[i][0],board[i][1],board[i][2])){
            winner = board[i][0];
        }
    }

   // check columns for a winner
    for (let i = 0 ; i < 3; i++){
    if (equals3(board[0][i],board[1][i],board[2][i])){
        winner = board[0][i];
        }
    }

   // check diagonals
    for (let i = 0 ; i < 3; i++){
    if (equals3(board[0][0],board[1][1],board[2][2])){
        winner = board[0][0];
        }
    }
    for (let i = 0 ; i < 3; i++){
        if (equals3(board[2][0],board[1][1],board[0][2])){
            winner = board[2][0];
        }
    }
    
    // count the avaliable spots
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }
    // if there are no more available squares
    // It's a tie
    if (winner == null && openSpots == 0){
        return 'tie';
    } else {
        return winner;
    }
}

function bestMove(){
    // ai to play
    // make all square available at the beginning of the game
    // let available = [];

    // track the score for the best move
    let bestScore = -Infinity;
    // track the best move
    let move;
    for (let i=0; i<3; i++){
        for (let j=0; j<3; j++){
            // check if the spot available
            if (board[i][j]==''){
                // try that spot
                board[i][j] = ai;
                // get the minimax score for this move
                // passing a board, a depth, and a T/F for isMaximising 
                // i.e. which player is about to play (the one trying to get the high score
                // or the one trying to get the low score). In this case, the next to play
                // is the human 
                let score = minimax(board, 0, false);
                // undo the move (we're just testing the move, not "playing" for good)
                board[i][j] = '';
                // if the score is better than the previosu bestScore
                // this score becomes the new bestScore
                // this move becomes the bestMove
                if (score > bestScore){
                    bestScore = score;
                    move = {i,j};
                }
            }
        }
    }
    // ai plays this move
    board[move.i][move.j] = ai;
    // human to play
    currentPlayer = human;
}

// score lookup table
let scores = {
    X: 1,
    O: -1,
    tie: 0
};

function minimax(board, depth, isMaximising){
    // first thing to check is if somebody would win with that move 
    let result = checkWinner();
    if (result !== null){
        return scores[result];
    }

    // if the next player is the maximising player
    if (isMaximising){
        let bestScore = -Infinity;
        for (let i=0; i<3; i++){
            for (let j=0; j<3; j++){
                // try all the possible spots again
                if (board[i][j]==''){
                    board[i][j] = ai;
                    let score = minimax(board,depth+1,false);
                    board[i][j]='';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
         // if the next player is the minimising player
        } else {
            let bestScore = Infinity;
            for (let i=0; i<3; i++){
                for (let j=0; j<3; j++){
                    // try all the possible spots again
                    if (board[i][j]==''){
                        board[i][j] = human;
                        let score = minimax(board,depth+1,true);
                        board[i][j]='';
                        bestScore = min(score, bestScore);
                    }
                }
            }
        return bestScore;
        }
    }


function mousePressed(){
    if (currentPlayer == human){
        // human to play
        // detect which square the click was in.
        // floor() calculates the closest int value that is less than or equal to 
        // the value of the parameter.
        let i = floor(mouseX/w);
        let j = floor(mouseY/h);
        // if the square the click was detected is avalable
        if (board[i][j]==''){
            // assign the square to the human i.e. "O"
            board[i][j] = human;
            // hand over to ai player
            currentPlayer = ai;
            bestMove();
        }
    }
}

function draw(){
    background(220);
    strokeWeight(4);

    // draw the grid
    // two vertical lines
    line(w,0,w,height);
    line(w*2, 0, w*2,height);
    // two horizontal lines
    line(0, h, width, h);
    line(0, h*2, width, h*2);


    // render the board
    // embeded loop to draw colums and rows 
    for (let j=0; j<3; j++){
        for (let i=0; i<3; i++){
            // move the x and y of where you're drawing 
            // to the centre of the square you're in 
            let x = w * i + w/2;
            let y = h *j +h/2;
            let spot = board[i][j];

            // player1 is 'O';
            if (spot == human){
                noFill();
                // ellipse is drawn from its top left "corner"
                // width of the ellipse is half the width of a square
                ellipse(x,y,w/2);
            // player2 is 'X';
            } else if (spot == ai){
                //  xr is the "radius" offset of the cross
                let xr = w/4;
                line(x-xr,y-xr, x+xr,y+xr);
                line(x+xr, y-xr, x-xr, y+xr);
            }
        }
    }

    let result = checkWinner();
    // if the result is not null i.e. has been assigned
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
    }
}