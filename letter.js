
class Letter{
    constructor(stringVal){
        this.stringVal = stringVal;
        this.guessed = false;
    }
    toString(){
        if(this.guessed)    
            return this.stringVal;
        else 
            return "_ ";
    }
    check(letter){
        if(letter.toUpperCase() == this.stringVal){
            this.guessed = true;    
        }
        // this.toString();  
    }
}

module.exports = Letter