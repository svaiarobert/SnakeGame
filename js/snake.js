const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
const START_DIRECTION = RIGHT;

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

    moveAtPosition(position){
        this.position.row = position.row;
        this.position.col = position.col;

        $(`#part-${this.counter}`).css({
            'grid-row-start': this.position.row.toString(), 
            'grid-row-end': this.position.row.toString(), 
            'grid-column-start': this.position.col.toString(),
            'grid-column-end': this.position.col.toString()});

    }
}

class Snake{
    constructor(head, parts, direction = RIGHT){
        this.head = head;   //SnakePart
        this.parts = parts; //aray of SnakeParts
        this.tailLastPos = null;
        this.direction = START_DIRECTION; 
    }

    initiateSnakePart(position, isHead = false){
        const counter = this.parts.length;
        const part = new SnakePart(counter, {row: position.row, col: position.col});

        this.parts.push(part);
        if ( isHead )
            this.head = part;
        
        return part;
    }

    createSnakePart(){
        const newPart = new SnakePart(this.parts.length, this.tailLastPos);
        this.parts.push(newPart);

        return newPart;

    }

    #isCrashing(){
        switch( this.direction ){
            case( LEFT ):
                if( this.head.position.col <= 0 )
                    return true;
                break;
            case( UP ):
                if( this.head.position.row <= 0 )
                    return true;
                break;
            case( RIGHT ):
                if( this.head.position.col >= 16 )
                    return true;
                break;
            case( DOWN ):
                if( this.head.position.row >= 16 )
                    return true;
                break;
        }

        return false;
    }

    move(){
        let tempPosition1 = {row: this.head.position.row, col:this.head.position.col}, tempPosition2;
        this.head.move(this.direction);

        for(let i=1; i<this.parts.length; i++)
        {   
            if( i == this.parts.length - 1 ) //tails
                this.tailLastPos = {row: this.parts[i].position.row, col: this.parts[i].position.col};

            tempPosition2 = {row: this.parts[i].position.row, col: this.parts[i].position.col};
            this.parts[i].moveAtPosition(tempPosition1)
            tempPosition1 = tempPosition2;
        }

        

        if( this.#isCrashing() )
            return -1;
            
    }
}