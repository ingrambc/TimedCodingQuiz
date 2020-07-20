# TimedCodingQuiz
Multiple choice Coding quiz that is timed.
User clicks start button and 10 queston quiz sarts with 75 second timer.
A correct answer moves to the next queston.
An incorrect answer deducts 5 seconds from your time.
Finishing all questions or running out of time ends game.
Scores are stored locally, and can be cleared with button when veiwng high scores.

# tech
build in Visual Studio Code 
  using HTML, CSS, and JavaScript.

# Flow
start with call to startGame().

with start button Click, moves to playGame() and starts time.

with button click, moves to checkButton().

if correct answer, goes to displayQ() to show next question.

if no more questions, goes to endGame().

with button click, goes to displayHS().

with button click goes back to startGame().

# content
the questions were borrowed from W3 School Quiz.


