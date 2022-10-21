const board = document.querySelector("#board");
const ctx = board.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetbutton = document.querySelector("resetbutton");

const gameWidth = board.width;
const gameHeight = board.height;

const boardBg="lightgreen";

const snakeColor="red";
const snakeBorder="red";
const foodColor="gold";

const unitSize=25;

const food ={x:15,y:10};

let running =false;
let xVelocity=unitSize;
let yVelocity=0;
let xFood;
let yFood;
let score=0;
let snake=[
	{x:unitSize*4, y:0},
	{x:unitSize*3, y:0},
	{x:unitSize*2, y:0},
	{x:unitSize, y:0},
	{x:0, y:0}
	];

window.addEventListener("keydown",changeDirection);
resetButton.addEventListener("click",resetGame);

gameStart();
// createFood();
// drawFood();

function gameStart(){
	running=true;
	scoreText.textContent=score;
	createFood();
	drawFood();
	nextTick();
};
function nextTick(){
	if(running){
		setTimeout(()=>{
			clearBoard();
			drawFood();
			moveSnake();
			drawSnake();
			checkGame();
			nextTick();
		},110)
	}
	else{
		displayGame();
	}
};
function clearBoard(){
	ctx.fillStyle=boardBg;
	ctx.fillRect(0,0, gameWidth, gameHeight);
};
function createFood(){
	function randomFood(min, max){
		const randNum= Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
		return randNum;
	}
	xFood=randomFood(0,gameWidth- unitSize);
	yFood=randomFood(0,gameWidth- unitSize);
	// console.log(xFood); displaying in console
};
function drawFood(){
	ctx.fillStyle=foodColor;
	ctx.fillRect(xFood,yFood,unitSize,unitSize);
	// var foodElement = document.creteElement("div");
	// foodElement.style.gridColumnStart=food.x;
	// foodElement.style.gridRowStart=food.y;
	// foodElement.classList.add("apple");
	// board.appendChild(FoodElement);

};
function moveSnake(){
	const head={x:snake[0].x+xVelocity,
				y:snake[0].y+yVelocity};

				snake.unshift(head);
				if (snake[0].x==xFood && snake[0].y==yFood) {
					score+=1;
					scoreText.textContent=score;
					createFood();

				}
				else{
					snake.pop();
				}
};
function drawSnake(){
	ctx.fillStyle=snakeColor;
	ctx.strokeStyle=snakeBorder;
	snake.forEach(snakePart=>{
		ctx.fillRect(snakePart.x,snakePart.y, unitSize, unitSize);
		ctx.strokeRect(snakePart.x,snakePart.y, unitSize, unitSize);
	})
};
function changeDirection(event){
	const keyPressed=event.keyCode;
	// console.log(keyPressed);
	const LEFT=37;
	const RIGHT=39;
	const UP=38;
	const DOWN=40;

	const goingUP=(yVelocity== -unitSize);
	const goingDown=(yVelocity== unitSize);
	const goingRight=(xVelocity== unitSize);
	const goingLeft=(xVelocity== -unitSize);

	switch(true){
		case(keyPressed==LEFT && !goingRight):
			xVelocity=-unitSize;
			yVelocity=0;
			break;
		case(keyPressed==UP && !goingDown):
			xVelocity=0;
			yVelocity=-unitSize;
			break;
		case(keyPressed==RIGHT && !goingLeft):
			xVelocity=unitSize;
			yVelocity=0;
			break;
		case(keyPressed==DOWN && !goingUP):
			xVelocity=0;
			yVelocity=unitSize;
			break;
	}
};
function checkGame(){
	switch(true){
		case(snake[0].x<0):
		running=false;
		break;
		case(snake[0].x>gameWidth):
		running=false;
		break;
		case(snake[0].y<0):
		running=false;
		break;
		case(snake[0].y>=gameHeight):
		running=false;
		break;
	}
	for(let i =1; i<snake.length; i+=1){
		if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
			running=false;
		
	}
	}
};
function displayGame(){
	ctx.font="75px chiller";
	ctx.fillStyle="red";
	ctx.textAlign="center";
	ctx.fillText("Game Over",gameWidth/2,gameHeight/2);
	running=false;
};
function resetGame(){
	score=0;
	xVelocity=unitSize;
	yVelocity=0;
	snake=[
		{x:unitSize*4, y:0},
		{x:unitSize*3, y:0},
		{x:unitSize*2, y:0},
		{x:unitSize, y:0},
		{x:0, y:0}
	];
	gameStart();
};

