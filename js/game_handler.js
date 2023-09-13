//Game Class Declaration
class Game{
    static score = 0;
    static isRunning = false;
    static snake;

    static initialize(){
        //delete existing divs from last game
        $(".playground > div").remove();
        $(".game-over").hide();

        //init snake parts and snake
        Game.snake = new Snake({}, []);

        Game.snake.createSnakePart({ row:1, col:3 }, true);  //head
        Game.snake.createSnakePart({ row:1, col:2 });
        Game.snake.createSnakePart({ row:1, col:1 });
        
    }

    static start(){   
        Game.isRunning = true;
        $(".enter-to-start").hide();
        setInterval(() => {
            if( Game.isRunning )
                if (this.snake.move() == -1) //GameOver
                    Game.end();
        }, 300)
    }

    static end(){
        $(".game-over").show();
        Game.isRunning = false;
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
    }
});

$('html').on('keydown',function(event) {
    switch( event.which ){
        case( LEFT ):
            Game.snake.direction = LEFT;
            break;
        case( UP ):
            Game.snake.direction = UP;
            break;
        case( RIGHT ):
            Game.snake.direction = RIGHT;
            break;
        case( DOWN ):
            Game.snake.direction = DOWN;
            break;
    }
})