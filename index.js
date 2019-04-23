const inquire = require('inquirer');
const Word = require('./word.js');

const words = ['PIZZA', 'CROISSANT', 'BAGUETTE', 'BOULE', 'BIALY', 'BAGEL', 'DANISH', 'CIABATTA', 'FOCCACIA' ];
const guesses = 12;
const newLine = "\n";
const white = "\u001b[0m"
const red = "\u001b[31m"
const green = "\u001b[32m"

const playQuestion = [
    {
    type: 'input',
    name: 'guess',
    message: 'Guess a letter!'
    }
];
const replayQuestion = [
    {
        type: 'confirm',
        name: 'replay',
        message: 'Would you like to play Again?'
    }
];



//------------------------------------------//
//              start program               //
//------------------------------------------//
beginGame()

//------------------------------------------//
//   Begin loop sequence of getting guesses //
//              from the user               //
//------------------------------------------//

function beginGame(){
    console.log(
        newLine + 
        'Welcome to Bread Baker Word Guess!' +
        newLine + newLine +
        'All words are based on baked bread products.' + 
        newLine + newLine + 
        'Type "exit" to leave the game at any time.' + 
        newLine + newLine + 
        'Have Fun!'
        )
    startRound()
}
function startRound(){
    getGuess(playQuestion, randomWord(words), guesses)
}
//------------------------------------------//
//          select random word from array   //
//------------------------------------------//

function randomWord(wordsArray){
    let randomIndex = Math.floor(Math.random() * words.length)
    let randomWord = wordsArray[randomIndex]
    let chosenWord = new Word(randomWord)
    //-------------- for Dev ---------------//
    // console.log(chosenWord)
    //________________________________________//
    return chosenWord
}

//------------------------------------------//
//   get user input and 
//------------------------------------------//


function getGuess(chooseALetter, currentWord, guessesLeft) {
    printWordWithBlanks(currentWord)
    
    if(!guessesLeft)
        console.log('You are all out of guesses!' + newLine);

    else if (wordIsComplete(currentWord))
        console.log('Way to go! You guessed the word!' + newLine)

    else
        return askUser(chooseALetter, currentWord , guessesLeft); 

    return askUser(replayQuestion, randomWord(words), guesses)
   
    
}

function printWordWithBlanks(wordObject){
    console.log(newLine,newLine,wordObject.print(),newLine,newLine );
}

function wordIsComplete(word){
    return (word.print().indexOf("_ ") == -1 )
}

function askUser(questionObject, wordToGuess, remainingGuesses){
    inquire
    .prompt(questionObject)
    .then(response => handleInput(response, remainingGuesses, wordToGuess));
}

function handleInput(userInput, remainingGuesses, word) { 
    // console.log(userInput)
    if(userInput.guess && userInput.guess != '')
        var guess = userInput.guess.toUpperCase();

    if(userInput.replay)
        return startRound()

    else if (userDesiresToExit(guess) || userInput.replay == false)
        return console.log('Thanks for playing Word Guess!');
    
    else if (userInput.guess != '' && UserGuessIsCorrect(guess, word))
        console.log(green + 'Correct!' + white);

    else{
        remainingGuesses--
        console.log(red + 'Incorrect!' + white + newLine + newLine + 'Remaining Guesses:' + remainingGuesses);
    } 

    getGuess(playQuestion, word, remainingGuesses);
    }
   
function UserGuessIsCorrect(guess, word){
    let guessCorrect = false;
    word.letters.forEach(letter =>{
        letter.check(guess);
        if (letter.stringVal == guess) 
            guessCorrect = true;
    });
    return guessCorrect
}

function userDesiresToExit(input) {
    return input == "EXIT"
}
