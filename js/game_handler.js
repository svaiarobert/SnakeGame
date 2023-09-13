//Game Class Declaration
class Game{
    static score = 0;
    static isRunning = false;
    static snake;

    static #createSnakePart(position, isHead = false){
        const counter = Game.snake.parts.length;
        const part = new SnakePart(counter, {row: position.row, col: position.col});

        Game.snake.parts.push(part);
        if ( isHead )
            Game.snake.head = part;
        
        return part;
    }

    static initialize(){
        //delete existing divs from last game
        $(".playground > div").remove();

        //init snake parts and snake
        Game.snake = new Snake({}, []);

        Game.#createSnakePart({ row:1, col:3 }, true);  //head
        Game.#createSnakePart({ row:1, col:2 });
        Game.#createSnakePart({ row:1, col:1 });
        
    }

    static start(){   
        $(".enter-to-start").hide();
    }

    static end(){
        $(".game-over").show();
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
            Game.snake.head.move(LEFT);
            break;
        case( UP ):
            console.log('right');
            Game.snake.head.move(UP);
            break;
        case( RIGHT ):
            console.log('right');
            Game.snake.head.move(RIGHT);
            break;
        case( DOWN ):
            console.log('right');
            Game.snake.head.move(DOWN);
            break;
    }
})