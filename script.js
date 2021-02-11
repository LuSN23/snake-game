let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

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
/*Função que atualiza o jogo de tempos em tempos para que a cobrinha consiga se mexer 
nesse intervalo. Para quando o jogo acabar a função parar o jogo quando a cobrinha tocar 
no próprio corpo dela.*/
//Uso do método de Window setInterval()
function iniciarJogo(){
    criarBG();
    criarCobrinha();
    //Criando a posição x e y da cobrinha para quando formos setar os movimentos, ela ter um ponto de partida 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Movimentos a partir de condicionais(para o lado direito = + 1 quadrado no lado direito, lado esquerdo = - 1 quadrado do lado esquerdo)
    //Plano cartesiano para a direita aumenta, para a esquerda diminui = ilusão de movimento
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Para tirar o último elemento do array e "andar"
    //Temos o movimento, mas não a cabeça nova da cobrinha
    snake.pop();
    //método unshift, que acrescenta a frente do array
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}
//A cada 100 milisegundos a variável jogo é renovada(dá continuidade ao jogo sem travar)
let jogo = setInterval(iniciarJogo, 100);
