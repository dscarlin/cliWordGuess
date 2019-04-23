const Letter = require('./letter.js');

class Word{
    constructor(word){
        this.letters = word.split("").map(letter => new Letter(letter));
    }
    print(){
        return this.letters.join(' ');
    }
}   

module.exports = Word