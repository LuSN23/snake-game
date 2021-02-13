let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
/* Para que a comida não fique sempre no mesmo lugar 
quando a cobrinha passa por ela, usaremos 2 métodos para a criação
de números aleatórios. */
//Math.floor = retorna número sem casas decimais/para tirá-las
//Math.random = retorna um número aleatório entre(no meio de) 0 e 1
//"Setei" o tamanho do canvas também para não haver ultrapassagem
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
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

//Comida
function drawFood(){
   context.fillStyle = "red";
   context.fillRect(food.x, food.y, box, box);
}

/*Função que atualiza o jogo de tempos em tempos para que a cobrinha consiga se mexer 
nesse intervalo. Para quando o jogo acabar a função parar o jogo quando a cobrinha tocar 
no próprio corpo dela.*/
//Uso do método de Window setInterval()

//Captura de teclas com evento de escuta
//keydown = evento de clique do teclado e chama a função update
document.addEventListener('keydown', update);

//A nossa direção não pode ser oposta se não dá um bug, por isso o uso do &&
function update(event){
    //Se o botão for 37 e a direção não for right muda-se a direção para left
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up" ) direction = "down";
}

function iniciarJogo(){
    /*Quando passar do tamanho do canvas vai para a posição 0 */ 
    //Aqui ela só recebe uma nova propriedade, mas dá uma ilusão
    /*Se a cabeça dela(snake) na posição x for maior que 15 vezes o tamanho do box(canvas) ela sairia da tela, 
    se a direção fosse para a direita, então se isso acontecer ela recebe o valor de 0 para aparecer no começo da tela(plano cartesiano que vai de 0 a 16)*/
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    criarBG();
    criarCobrinha();
    drawFood();
    //Criando a posição x e y da cobrinha para quando formos setar os movimentos, ela ter um ponto de partida 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Movimentos a partir de condicionais(para o lado direito = + 1 quadrado no lado direito, lado esquerdo = - 1 quadrado do lado esquerdo)
    //Plano cartesiano para a direita aumenta, para a esquerda diminui = ilusão de movimento
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    /*Caso a posição de snakeX seja diferente de foodX e a snakeY seja diferente da foodY vai-se retirar o último elemento
    da cobrinha, caso não ela vai aumentar e teremos novamente a função de gerar a comida em lugar aleatório para posicionar a
    comida automaticamente. */

    if(snakeX != food.x || snakeY != food.y){
       //Para tirar o último elemento do array e "andar"
       //Temos o movimento, mas não a cabeça nova da cobrinha
       snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box    
    }
    
    //método unshift, que acrescenta a frente do array
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}
//A cada 100 milisegundos a variável jogo é renovada(dá continuidade ao jogo sem travar)
let jogo = setInterval(iniciarJogo, 100);

