# Memory Game Project

## Table of Contents

* [General](#general)
* [How To Play The Game](#how-to-play-the-game)
* [Interface Design](#interface-design)
* [Dependencies](#dependencies)

## General

Udacity Front-End Developer Nanodegree Third Project

The game starts when you make the first choice move and the timer begins to record your total time gameplay.

* Game preview
<img src="img/play.gif" alt="Game-preview">


# How To Play The Game
You have to match two identical cards to proceed and win the game. There are eight identical pair of cards randomly shuffled in a deck. Each card identity is shown when the user clicks on the card.

* Each move is counted when the user opens two cards. For example: if the user opens 8 cards, the number of moves the user made is counted as 4.
* If the cards match, both cards stay opened.
* If the cards do not match, both cards are closed again.

Star-Rating is counted depending on the number of moves:
* :star::star::star: If the moves  are less than 14.
* :star::star: If the moves  are between 13 and 20.
* :star: If the moves  are  20 or more.

The game ends once all cards have been correctly matched.
The player could restart the game at any time by clicking on the restart icon.

# Interface Design

Application uses CSS to style components for the game.
All application components are usable across modern desktop, tablet, and phone browsers. It is tested and running well at the latest Chrome, Firefox and Safari browser(2019).


## Dependencies
* Shuffle function from [stackoverflow](http://stackoverflow.com/a/2450976).
* Icons from Font [fontawesome](https://fontawesome.com/v4.7.0/icons/) - [cdn](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css).
* [Acme](https://fonts.google.com/specimen/Acme) from Google Fonts.
