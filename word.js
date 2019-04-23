const Letter = require('./letter.js');

class Word{
    constructor(word){
        
            let letters = []
            word.split("").forEach(function(letter){
                if(letter != ' ')
                    letter = new Letter(letter)
                letters.push(letter)
            });
            this.letters = letters

                
        
    }
    print(){
        return this.letters.join(' ');
    }
}   

module.exports = Word