//Game Class Declaration
class Game{
    static score = 0;
    static isRunning = false;
    static snake;
    static #intervalId;

    static initialize(){
        //delete existing divs from last game
        $(".playground > div").remove();
        $(".game-over").hide();

        //init snake parts and snake
        Game.snake = new Snake({}, []);

        Game.snake.initiateSnakePart({ row:1, col:3 }, true);  //head
        Game.snake.initiateSnakePart({ row:1, col:2 });
        Game.snake.initiateSnakePart({ row:1, col:1 });
        
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