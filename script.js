let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Um array que adiciona 1 elemento e retira o último: fazendo a cobrinha andar
//O for percorre todo o tamanho do array e incrementa
function criarCobrinha(){
   for(i=0;i< snake.length; i++){
      context.fillStyle = "green";
      //Posição de x e y, altura e largura 
      context.fillRect(snake[i].x, snake[i].y, box, box);
   }
}

criarBG();
criarCobrinha();

