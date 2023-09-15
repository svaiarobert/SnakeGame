//Game Class Declaration
class Game{
    static score = 0;
    static isRunning = false;
    static snake;
    static #intervalId;
    static currentApple;
    static #TABLE_SIZE = 15;
    static #MAP = new Map();

    static #generateApplePosition(allowedPositions){
        const generatePositionKey = Array.from(allowedPositions)[Math.floor(Math.random() * Array.from(allowedPositions).length)];
        return Game.#MAP.get(generatePositionKey);
    }

    static generateApple(){
        const deniedPositions = new Set();
        const allowedPositions = new Set();

        $(".playground > .apple").remove();

        for(let i=0; i<Game.snake.parts.length; i++)
            deniedPositions.add(searchObgValueInMap(Game.#MAP, Game.snake.parts[i].position));
        
        console.log('DN', deniedPositions);
        
        populateAllowedPositions(allowedPositions, deniedPositions, Game.#MAP);
        
        Game.currentApple = new Apple(Game.#generateApplePosition(allowedPositions));
    }
    
    static initialize(){
        //delete existing divs from last game
        $(".playground > div").remove();
        $(".game-over").hide();

        //initialize Map
        let c = 0;
        for(let i=1; i<=15; i++)
            for(let j=1; j<=15; j++){
                Game.#MAP.set(c, {row: i, col: j});
                c++;
            }

        //init snake parts and snake
        Game.snake = new Snake({}, []);

        Game.snake.initiateSnakePart({ row:1, col:3 }, true);  //head
        Game.snake.initiateSnakePart({ row:1, col:2 });
        Game.snake.initiateSnakePart({ row:1, col:1 });
        
        //Generate Apple
        Game.generateApple()

    }

    static start(){   
        Game.isRunning = true;
        $(".enter-to-start").hide();
        Game.#intervalId = setInterval(() => {
            if( Game.isRunning )
                if (this.snake.move() == -1) //GameOver
                    Game.end();
            else
                return -1;
        }, 300);
    }

    static end(){
        $(".game-over").show();
        Game.isRunning = false;
        clearInterval(Game.#intervalId);
    }

    static increaseScore(){
        Game.score++;
        $('.score').text(Game.score.toString());
    }

}


//Keyboard Event Handler
$(document).on('keypress',function(event) {
    switch( event.which ){
        case( 13 ):             //Enter
            if( !Game.isRunning ){
                Game.initialize();
                Game.start();
                console.log(Game.snake);
            } 
        break;   
        
        case(65):   //a for debug
            
    }
});

$('html').on('keydown',function(event) {
    switch( event.which ){
        case( LEFT ):
            if( Game.snake.direction != RIGHT)
                Game.snake.direction = LEFT;
            break;
        case( UP ):
            if( Game.snake.direction != DOWN)
                Game.snake.direction = UP;
            break;
        case( RIGHT ):
            if( Game.snake.direction != LEFT)
                    Game.snake.direction = RIGHT;
            break;
        case( DOWN ):
            if( Game.snake.direction != UP)
                Game.snake.direction = DOWN;
            break;
        case( 65 ):
            console.log('a pressed');
            Game.snake.createSnakePart();
            break;
    }
})