//inplementação de jquery

canvas = document.querySelector("canvas");
ctx =  canvas.getContext("2d");

var mvLeft = mvRigth=false, speed=4, deslocaY=8, deslocaX = -5, bingoCpu=0, bingoHuman=0, theEnd=false;
const RIGTH=39, LEFT=37, DOWN =40, ENTER=13, ESC=27;

///sistema de cores 

key=0;


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
			soundBatida();
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
	 key = e.keyCode;

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
		 key = e.keyCode;
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
	if (theEnd == false){ 
	window.requestAnimationFrame(loop, canvas);
	update();
	render();

	}

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

	ctx.clearRect(0, 0, canvas.width, canvas.height);
//=========gameover=================\\	
	ctx.fillStyle = '#f00';
	ctx.font = "40px Stencil";
	ctx.fillText("Game Over", 80, 200);
//==========restart================\\		
	ctx.fillStyle = '#0f0';
	ctx.font = "20px Stencil";
	ctx.fillText("Press 'Enter' for restart", 40, 230);

	soundGameover();



	theEnd =true;	


	}
	

}

function soundGameover (){
	var div_pai = document.getElementById("som");
	var audio = document.createElement("audio");
	audio.src = "sons/gameover.mp3";
	audio.autoplay = "autoplay";
	audio.loop = "loop";
	div_pai.appendChild(audio);

}

function soundBatida(){
	var div_pai = document.getElementById("som");
	var audio2 = document.createElement("audio");
	audio2.src = "sons/batida.wav";
	audio2.autoplay = "autoplay";
	div_pai.appendChild(audio2);
}

window.addEventListener("keydown", restart, false);
function restart (e){
		var key = e.keyCode;
		//reinicia o jogo

		switch(key){
			case ENTER:
				location.reload();
				break;
			case ESC:
				location.reload();
				break;	
		}

}

function gameStart (){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#f00';
	ctx.font = '30px Stencil';
	ctx.fillText('Enter for  Start', 80, 220);
	ctx.fillStyle = '#0f0';
	ctx.fillText('PgUp for   Help', 80, 260);
	ctx.fillStyle = '#00f';
	ctx.fillText('Pg dn for  Nivel', 80, 300);

	switch (key){
		case ENTER:
			loop();
			break;
		case PGUP:
			help();
			break;
		case PGDOWN:
			nivel();
			break;				
	}
}
loop();








