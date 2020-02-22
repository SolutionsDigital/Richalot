// call p5.js explicitly as per
//  https://github.com/processing/p5.js/wiki/p5.js-overview#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup
new p5();

// the board defined as a list of lists
let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

// the players
let players = ['X','O'];

let currentPlayer;
// array of available squares on the board
let available = [];

function setup(){
    createCanvas(400,400);
    frameRate(1);
    // randomly pick a player
    currentPlayer = floor(random(players.length));
    for (let j=0; j<3; j++){
        for (let i=0; i<3; i++){
            // make all square available at the beginning of the game
            available.push([i,j]);
        }
    }
}

function nextTurn(){
    // choose a random number between 0 and the length 
    // of the aray of how many squares are available
    let index = floor(random(available.length));
    // remove the chosen square and put it in spot
    // using splice function
    let spot = available.splice(index,1)[0];
    let i = spot[0];
    let j = spot[1];

    board[i][j] = players[currentPlayer];
    // switch to the next player
    // add one to current player and get the modulus (remainder)
    // when divided by the length of the players array 
    currentPlayer = (currentPlayer + 1 ) % players.length;
}

// function testing the equality of three parameters
function equals3(a,b,c){
    return (a==b && b==c && a != '');
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
        winner = board[0][2];
        }
    }
    for (let i = 0 ; i < 3; i++){
        if (equals3(board[2][0],board[1][1],board[0][2])){
            winner = board[2][0];
        }
    }
    
    // if there are no more available squares
    // It's a tie
    if (winner == null && available.length ==0){
        return 'tie';
    } else {
        return winner;
    }
}

function draw(){
    background(220);

    //  w and h are the width and height of a square
    let w = width/3;
    let h = height/3;
    
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
            strokeWeight(4);

            // player1 is 'O';
            if (spot == players[1]){
                noFill();
                // ellipse is drawn from its top left "corner"
                // width of the ellipse is half the width of a square
                ellipse(x,y,w/2);
            // player2 is 'X';
            } else if (spot == players[0]){
                //  xr is the "radius" offset of the cross
                let xr = w/4;
                line(x-xr,y-xr, x+xr,y+xr);
                line(x+xr, y-xr, x-xr, y+xr);
            };
        };
    };

    let result = checkWinner();
    // if the result is not null i.e. has been assigned
    if (result != null ){
        // stop the loop
        noLoop();
        createP(`... and the winner is: ${result}`).style('font-size', '32px');
        console.log(result);
    }
    nextTurn();
}