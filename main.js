canvas = document.querySelector("canvas");
ctx =  canvas.getContext("2d");

var mvLeft = mvRigth=false, speed=4, deslocaY=6, deslocaX = -3, bingoCpu=0, bingoHuman=0, theEnd=false;
const RIGTH=39, LEFT=37;

var raquete_one = {
	posY: 570,
	posX: 100,
	width: 100,
	height: 20,
	color: '#fff',
}
var raquete_two = {
	posY: 10,
	posX: 0,
	width: 100,
	height: 20,
	color: '#fff',
}
var bola = {
	raio: 10,
	posX: (canvas.width /2) - 10,
	posY: (canvas.height/2) - 10,
	color: '00f', 
	
	fx: 0,
}
render()
function render (){
	if(theEnd == false){  
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = raquete_one.color;
	ctx.fillRect(raquete_one.posX, raquete_one.posY, raquete_one.width, raquete_one.height);
//desenha a segunda raquete
	ctx.fillStyle = raquete_two.color;
	ctx.fillRect(bola.posX - raquete_two.width/2, raquete_two.posY, raquete_two.width, raquete_two.height);
// desenha a bolinha
	ctx.beginPath();
	ctx.arc(bola.posX, bola.posY, bola.raio, 0, Math.PI *2, true);
	ctx.closePath();
	ctx.fill();	
//  imprime a caixa de texto do placar
	ctx.fillStyle = "#fff"; 
	ctx.fillText("Player 1:  "+bingoCpu, 10, 50)
	ctx.fillStyle = "#fff"; 
	ctx.fillText("Player 2:  "+bingoHuman, 340, 50)	
	}
}

window.addEventListener("keydown", moveDown, false);
window.addEventListener("keyup", moveup, false)

function update(){
		
		//controle da bola
			bola.posY += deslocaY;
			bola.posX += deslocaX;
		if(bateuRaqueteOne() || bateuRaqueteTwo()){
			deslocaY *= -1;
		}
		
		cpuMove();

		if (bolaMove()){
			deslocaX *= -1;
		}

		//verifica se cpu pontuou no jogo
		if (pointer()){
			bola.posY = raquete_two.height +20;
			bingoCpu++;
			gameOver();

		}
		
		//controle da raqueteb		
		if (mvRigth ==true){
			raquete_one.posX +=speed;
		} 
		if (mvLeft == true){
			raquete_one.posX -= speed;
		} 

		if (raquete_one.posX < 0){
			raquete_one.posX =  0;
		}
		if(raquete_one.posX + raquete_one.width > canvas.width){
			raquete_one.posX = canvas.width - raquete_one.width;
		}
		if (raquete_two.posX < 0){
			raquete_two.posX = 0;
		}
		if(raquete_two.posX + raquete_two + raquete_two.width > canvas.width){
			raquete_two.posX = canvas.width - raquete_two.width;
		}
}


function moveDown(e){
	var key = e.keyCode;

	switch (key){
		case LEFT:
			mvLeft=true;
			break;
		case RIGTH:
			mvRigth=true;
			break;		
	}
	
}

function moveup(e){ 
		var key = e.keyCode;
		switch (key){
			case LEFT:
				mvLeft = false;
				break;
			case RIGTH:
				mvRigth = false;
				break;
														

		}	
	}



function loop(){
	window.requestAnimationFrame(loop, canvas);
	update();
	render();

}

function bateuRaqueteOne(){
	if(
		bola.posY + bola.raio > raquete_one.posY && 
		bola.posX + bola.raio > raquete_one.posX &&
		bola.posX - bola.raio < raquete_one.posX + raquete_one.width){
		return true;
	}
	return false;
}

function bateuRaqueteTwo(){
	if(
		bola.posY - bola.raio < raquete_two.posY + raquete_two.height && 
		bola.posX + bola.raio > raquete_two.posX &&
		bola.posX - bola.raio < raquete_two.posX + raquete_one.width){
		return true;
	}
	return false;
}

function bolaMove (){
	//veirifca a colisão da bola contra as extremidades esquerda e direita do canvas
	if (bola.posX - bola.raio < 0 || bola.posX + bola.raio > canvas.width){
		return true;
	}
	return false;
}

function cpuMove (){
	//controla o movimento da segunda raquete, correspondente ao movimento da cpu
	raquete_two.posX = bola.posX - raquete_two.width /2;

}
function pointer (){
		if (bola.posY + bola.raio > canvas.height){
			return true;
		}
		return false;
}

function gameOver (){

	if (bingoCpu == 7){ 

	theEnd =true;	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
//=========gameover=================\\	
	ctx.fillStyle = "#fff";
	ctx.font = "40px Stencil";
	ctx.fillText("Game Over", 80, 200);
//==========restart================\\		
	ctx.fillStyle = "#fff";
	ctx.font = "30px Stencil";
	ctx.fillText("Restart", 120, 230);
//============exit=================\\
	ctx.fillStyle = "#fff";
	ctx.font = "30px Stencil";
	ctx.fillText("Exit", 150, 260);		
	}

}
loop();








