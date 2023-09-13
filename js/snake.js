class SnakePart{
    constructor(counter, position){
        this.counter = counter;
        this.position = position;
    }
}

class Snake{
    constructor(head, parts){
        this.head = head;   //SnakePart
        this.parts = parts; //aray of SnakeParts 
    }
}