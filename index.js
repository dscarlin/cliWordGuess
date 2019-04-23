const inquire = require('inquirer');
const Word = require('./word.js');

const words = ['GAME OF THRONES', 'CHICAGO FIRE', 'GREYS ANATOMY', 'THE SIMPSONS', 'RENO 911', 'THE GOLDBERGS', 'FAMILY MATTERS'];
const guesses = 12;
const newLine = "\n";
const white = "\u001b[0m"
const red = "\u001b[31m"
const green = "\u001b[32m"
const divider = "-----------------------------------------------"

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


function beginGame(){
    console.log(
        newLine + divider + newLine + newLine +
        '    Welcome to TV Show Word Guess!' +
        newLine + newLine + 
        ' Type "exit" to leave the game at any time.' + 
        newLine + newLine + 
        '            Have Fun!' + 
        newLine + newLine + divider
        )
    startRound()
}

//------------------------------------------//
//   Begin loop sequence of getting guesses //
//              from the user               //
//------------------------------------------//

function startRound(){
    let guessedLetters = []
    printWordAndDetermineQuestionToAsk(randomWord(words), guesses, guessedLetters)
}
//------------------------------------------//
//          select random word from array   //
//------------------------------------------//

function randomWord(wordsArray){
    let randomIndex = Math.floor(Math.random() * words.length)
    let randomWord = wordsArray[randomIndex]
    let chosenWord = new Word(randomWord)
    //-------------- for Dev ---------------//
    //      console.log(chosenWord)         //
    //--------------------------------------//
    return chosenWord
}

//------------------------------------------//
//     Show Word and give user message      //
//     depending on status of gameplay      //
//    and determine whether to continue     //
//           or start new round             //
//------------------------------------------//

function printWordAndDetermineQuestionToAsk(currentWord, guessesLeft, guessedLetters) {
    printWordWithBlanks(currentWord)
    
    if(!guessesLeft)
        console.log('You are all out of guesses!' + newLine);

    else if (wordIsComplete(currentWord))
        console.log('Way to go! You guessed the word!' + newLine)

    else
        return askUser(playQuestion, currentWord , guessesLeft, guessedLetters); 
    
    return askUser(replayQuestion, randomWord(words), guesses, guessedLetters)
   
    
}

//------------------------------------------//
//     show word at current completion      //
//------------------------------------------//

function printWordWithBlanks(wordObject){
    console.log(newLine,newLine,wordObject.print(),newLine,newLine );
}

//------------------------------------------//
//        check word for completion         //
//------------------------------------------//

function wordIsComplete(word){
    return (word.print().indexOf("_ ") == -1 )
}

//------------------------------------------//
//             prompt user                  // 
//         with relevant question           //
//------------------------------------------//

function askUser(questionObject, wordToGuess, remainingGuesses, guessedLetters){
    inquire
    .prompt(questionObject)
    .then(response => handleInput(response, remainingGuesses, wordToGuess, guessedLetters));
}

//------------------------------------------//
//    handle response from either question  //
//------------------------------------------//

function handleInput(userInput, remainingGuesses, word, guessedLetters) { 
    
        //user guessed  and   guess is not blank
    if(userInput.guess && userInput.guess != '')
        var guess = userInput.guess.trim().toUpperCase();

        // user decided to play again (exits func and starts a new round)
    if(userInput.replay)
        return startRound()

            //user wants to exit early or does not want to replay (exits program)
    else if (userDesiresToExit(guess) || userInput.replay == false)
        return console.log(newLine + 'Thanks for playing Word Guess!' + newLine);

            //guess is blank
    else if (userInput.guess == '')
        console.log(newLine + red + "Blank guesses don't count!" + white)

        //guess is longer than one character
    else if(guess.length > 1)
        console.log(newLine + red + "One at a time!" + white)

            //letter is guessed (regardless of whether it was correct)
    else if(word.print().indexOf(guess) != -1 || guessedLetters.indexOf(guess) != -1)
        console.log(newLine + red + "Already guessed!" + white)

            //guess is correct
    else if (UserGuessIsCorrect(guess, word))
        console.log(newLine + green + 'Correct!' + white);

         //guess is not correct (only remaining possible case)
    else{
        remainingGuesses--
        guessedLetters.push(guess)
        console.log(newLine + red + 'Incorrect!' + white + newLine + newLine + 'Remaining Guesses:' + remainingGuesses);
    } 
                                    //current status of gameplay passed as parameters
    printWordAndDetermineQuestionToAsk(word, remainingGuesses, guessedLetters);
    }
   

//------------------------------------------//
//    Iterate through each letter object    //
//      omitting spaces, and check if       // 
//     the stringvalue property is equal    //
//       to the user's guessed letter       //
//------------------------------------------//
function UserGuessIsCorrect(guess, word){
    let guessCorrect = false;
    word.letters.forEach(letter =>{
        if (letter == " ")
            return
        guessCorrect = (letter.check(guess)) ? true : guessCorrect
    });
    return guessCorrect
}

//------------------------------------------//
//     Determine if user has typed exit     //
//------------------------------------------//
function userDesiresToExit(input) {
    return input == "EXIT"
}
