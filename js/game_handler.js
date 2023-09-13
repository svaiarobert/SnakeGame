//Game Class Declaration
class Game{
    static score = 0;
    static isRunning = false;
    static snake;

    static #createSnakeHead(){
        const head = new SnakePart(0, {x:1, y:3});
        $(".playground").append('<div #id="part-0" class="snake-part snake-head" style="grid-row:1; grid-column:3"></div>');
        Game.snake.parts.push(head);
        return head;

    }

    static #createSnakePart(position){
        const counter = Game.snake.parts.length;
        const part = new SnakePart(counter, {x: position.x, y: position.y});
        $(".playground").append(`<div #id='part-${counter}' class="snake-part" style="grid-row:${position.x}; grid-column:${position.y}"></div>`);
        Game.snake.parts.push(part);
        return part;
    }

    static initialize(){
        //delete existing divs from last game
        $(".playground > div").remove();

        //init snake parts and snake
        Game.snake = new Snake({}, []);

        Game.#createSnakePart({ x:1, y:1 });
        Game.#createSnakePart({ x:1, y:2 });
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
        if( !Game.isRunning ){
            Game.initialize();
            Game.start();
            console.log(Game.snake);
        }  
    }
});