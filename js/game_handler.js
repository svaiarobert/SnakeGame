
//Game Class Declaration
class Game{
    static score = 0;
    static isRunning = false;

    static #createSnakeHead(){
        $(".playground").append('<div class="snake-part snake-head"></div>');
    }

    static #createSnakePart(counter, position){
        $(".playground").append('<div class="snake-part"></div>');
    }

    static initialize(){
        //delete existing divs from last game
        $(".playground > div").remove();

        //init snake parts and snake
        Game.#createSnakePart(1, { x:1, y:1 });
        Game.#createSnakePart(2, { x:1, y:2 });
        Game.#createSnakeHead();
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
    if(event.which == 13) {         //Enter
        if( !Game.isRunning){
            Game.initialize();
            Game.start();
        }  
    }
});