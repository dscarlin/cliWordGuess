# cliWordGuess
### A word guess game platform using node.js

[![asciicast](https://asciinema.org/a/J0c979HsasIWamlUoAuLAs2Ft.svg)](https://asciinema.org/a/J0c979HsasIWamlUoAuLAs2Ft)

## Description

cliWordGuess uses the command line as the user interface for a TV show themed word guess game.

The User will be shown the word as blanks similar to hangman, and will be prompted to guess letters.

Incorrect entries will result in appropriate error messages, and wrong guesses will decrease the number of guesses that the user has left for each round.

## Technologies Used
- node.js
- JavaScript
- inquirer 


## Usage

In order to use this app, you will need to fork the repo and clone it to your local machine.

Once the repo is cloned, navigate to the root directory and run npm install to pull in all necessary dependenciesto your local machine.

Run the game using the command $node index.js

## Challenges

One difficulty in constructing this game was to handle TV show names that contain multiple words. This was solved by omitting blanks using an if statement when running each class Letter instance through it's check() method.

A second difficulty was constructing a functions that would handle either of the inquirer question objects, and all variations of responses from said inquiries.

The final difficulty was constructing the code in such a way that the only global variables were constants. This was achieved by feeding gameplay state values as parameters and returning the updated values to the next required function.

## Contributions

- Fork it
- Add to / Modify it
- Submit a pull request!
