const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

class SnakePart{
    constructor(counter, position){
        this.counter = counter;
        this.position = position;
        console.log(counter);
        if( counter == 0)
            $(".playground").append(`<div id="part-0" class="snake-part snake-head"></div>`);
        else
            $(".playground").append(`<div id='part-${counter}' class="snake-part"></div>`);

        $(`#part-${counter}`).css({
            'grid-row-start': position.row.toString(), 
            'grid-row-end': position.row.toString(), 
            'grid-column-start': position.col.toString(),
            'grid-column-end': position.col.toString(),
        });
        
    }

    move(direction){
        switch(direction){
            case( LEFT ):
                this.position.col = this.position.col - 1;
                $(`#part-${this.counter}`).css({
                    'grid-column-start': this.position.col.toString(),
                    'grid-column-end': this.position.col.toString(),
                });
                break;
            case( UP ):
                this.position.row = this.position.row - 1;
                $(`#part-${this.counter}`).css({
                    'grid-row-start': this.position.row.toString(), 
                    'grid-row-end': this.position.row.toString(), 
                });
                break;
            case( RIGHT ):
                this.position.col = this.position.col + 1;
                $(`#part-${this.counter}`).css({
                    'grid-column-start': this.position.col.toString(),
                    'grid-column-end': this.position.col.toString(),
                });
                break;
            case( DOWN ):
                this.position.row = this.position.row + 1;
                $(`#part-${this.counter}`).css({
                    'grid-row-start': this.position.row.toString(), 
                    'grid-row-end': this.position.row.toString(), 
                });
                break;
        }
            
    }
}

class Snake{
    constructor(head, parts){
        this.head = head;   //SnakePart
        this.parts = parts; //aray of SnakeParts 
    }
}