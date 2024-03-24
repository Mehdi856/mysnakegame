let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let scoreDiv = document.getElementById('score')
let score = 0
let resetBtn = document.getElementById('rst')
let unitSize = 25
let foodX;
let foodY;
let dx = unitSize
let dy = 0
let running = false
let snake = [
    {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
]

window.addEventListener('keydown', changeDiection)
resetBtn.addEventListener('click', resetGame)
gameStart()

function gameStart(){
    running = true
    createFood()
    drawFood()
    nextTick()
    scoreDiv.textContent = score
}

function nextTick(){
    if(running){
        setTimeout(()=>{
            clear()
            drawFood()
            drawSnake()
            moveSnake()
            checkGameOver()
            nextTick()
        }, 75)
    }else{
        displayGameOver()
    }
}
function clear(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
function createFood(){
    function randNum(min,max){
        const rand = Math.round((Math.random() * (max-min) + min) / unitSize) * unitSize
        return rand
    }
    foodX = randNum(0,canvas.width - unitSize)
    foodY = randNum(0,canvas.height - unitSize)
}
function drawFood(){
    ctx.fillStyle = 'red'
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
}
function drawSnake(){
    ctx.fillStyle = 'lightGreen'
    ctx.lineWidtth = 3
    ctx.strokeStyle = 'blck'
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)
    })
}
function moveSnake(){
    const head = {x:snake[0].x + dx , y:snake[0].y + dy}
    snake.unshift(head)

    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1
        scoreDiv.textContent = score
        createFood()
    }else{
        snake.pop()
    }
}
function changeDiection(e){
    let keyPressed = e.key
    let goingUp = (dy == -unitSize)
    let goingDown = (dy == unitSize)
    let goingRight = (dx == unitSize)
    let goingLeft = (dx == -unitSize)

    switch(true){
        case(keyPressed == 'ArrowRight' && !goingLeft):
            dx = unitSize
            dy = 0
            break;
        case(keyPressed == 'ArrowLeft' && !goingRight):
            dx = -unitSize
            dy = 0
            break;
        case(keyPressed == 'ArrowUp' && !goingDown):
            dx = 0
            dy = -unitSize
            break;
        case(keyPressed == 'ArrowDown' && !goingUp):
            dx = 0
            dy = unitSize
            break
    }
}
function checkGameOver(){
    if(snake[0].x+unitSize>canvas.width || snake[0].x<0 || snake[0].y+unitSize>canvas.height || snake[0].y<0){
        running = false
    }
    for(i=1;i<snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false
        }
    }
}
function displayGameOver(){
    ctx.font = '50px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText('Game Over !!', canvas.width/4, canvas.height/2)
}
function resetGame(){
    dx = unitSize
    dy = 0
    score = 0
    snake = [
        {x:unitSize*4,y:0},
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
    ]
    gameStart()
}
