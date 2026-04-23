const GRID_SIZE = 20;
const CANVAS_SIZE = 600;
const OFFSET = GRID_SIZE /2;
let headX = [300];
let headY = [300];
let xDir = 0;
let yDir = 0;
let foodX;
let foodY;
let score = 0;

function setup()
{
    createCanvas(CANVAS_SIZE,CANVAS_SIZE)
    background(0);
    createFood();
    frameRate(3);
    
}
function draw()
{
    background(0);
    checkerBoard();
    snakeLogic();
    circleLogic();
    boundaryCheck(headX,headY);   
    console.log(headX[0],headY[0])
}
function boundaryCheck(x,y)
{
    //checks values of the snakes head against the canvas, ends game if out of bounds 
    if (headX[0] >= CANVAS_SIZE|| headX[0] <=0 || headY[0] >= CANVAS_SIZE || headY[0]<=0 )
    {
        restartGame();
    }

}
function createFood()
{
    //generates the food 
    foodX = (round (random(0,CANVAS_SIZE)/GRID_SIZE) * GRID_SIZE + OFFSET)
    foodY = (round (random(0,CANVAS_SIZE)/GRID_SIZE) * GRID_SIZE + OFFSET)
}
function keyPressed()
{ 
    if (key === 'w' || keyCode === UP_ARROW)
    {        
        if (!(yDir === 1))
        {
            xDir = 0;
            yDir = -1;
        }
        //up
    
    }
    if (key === 's' || keyCode === DOWN_ARROW)
    {
        if (!(yDir === -1))
        {
            xDir = 0;
            yDir = 1;
        }
        //down
    }
    if (key === 'a' || keyCode === LEFT_ARROW)
    {
        if (!(xDir === 1))
        {
            xDir = -1;
            yDir = 0;
        }
        //left
        
    }
    if (key === 'd' || keyCode === RIGHT_ARROW)
    {
        if (!(xDir === -1))
        {
            xDir = 1;
            yDir = 0;
        }
        //right
    }
    
    
}
function snakeLogic()
{
    
    for(let i = headX.length - 1; i > 0; i--)
    {
        headX[i] = headX[i-1];
        headY[i] = headY[i-1];
    }

    headX[0] += GRID_SIZE * xDir;
    headY[0] += GRID_SIZE * yDir;

    for(let i =0; i<headX.length; i++)
    {    
        fill(0);
        square(headX[i],headY[i],GRID_SIZE);        
    }
    
}
function circleLogic()
{
    circle(foodX, foodY, GRID_SIZE);
    if ((headX[0] + OFFSET) === foodX && (headY[0] + OFFSET) === foodY)
    {
        createFood();
        headX.push(headX[headX.length-1]+ GRID_SIZE)
        headY.push(headY[headY.length-1])
    }
}

function checkerBoard()
{
    noStroke();
    let i =0;
    for (let x = 0; x < CANVAS_SIZE; x += GRID_SIZE) 
    {
        i++;
        for (let y = 0; y < CANVAS_SIZE; y += GRID_SIZE) 
        {
            i++;
            if(i % 2 === 0)
            {
                fill (0,255,255)
                square(x, y, GRID_SIZE);
            }
            else
            { 
                fill(127,255,212);
                square(x, y, GRID_SIZE);
            }
            
        }
    }
}
function restartGame()
{
    gameOver = false;
    headX = [300];
    headY = [300];
    xDir = 1;
    yDir = 0;
    score = 0;
    createFood();
}