//create questions and add to an array
var qObj0 = {question: "question0",
            choices: ["0choice1", "choice2", "choice3", "choice4"],
            correctIndex: 0};
var qObj1 = {question: "question1",
            choices: ["1choice1", "choice2", "choice3", "choice4"],
            correctIndex: 1};
var qObj2 = {question: "question2",
            choices: ["2choice1", "choice2", "choice3", "choice4"],
            correctIndex: 2};
var qObj3 = {question: "question3",
            choices: ["3choice1", "choice2", "choice3", "choice4"],
            correctIndex: 3};
var qObj4 = {question: "question4",
            choices: ["4choice1", "choice2", "choice3", "choice4"],
            correctIndex: 0};
var qObj5 = {question: "question5",
            choices: ["5choice1", "choice2", "choice3", "choice4"],
            correctIndex: 1};
var qObj6 = {question: "question6",
            choices: ["6choice1", "choice2", "choice3", "choice4"],
            correctIndex: 2};
var qObj7 = {question: "question7",
            choices: ["7choice1", "choice2", "choice3", "choice4"],
            correctIndex: 3};
var qObj8 = {question: "question8",
            choices: ["8choice1", "choice2", "choice3", "choice4"],
            correctIndex: 0};
var qObj9 = {question: "question9",
            choices: ["9choice1", "choice2", "choice3", "choice4"],
            correctIndex: 1};
var questions = [qObj0, qObj1, qObj2, qObj3, qObj4, qObj5, qObj6, qObj7, qObj8, qObj9];

//Other global variables
var timeLeft = 75;
var qIndex = 0;
var win = false;
var numCorrect = 0;
var correct = false;

// get DOM elements needed
var cardTextDiv = document.getElementById("card-text");
var listDiv = document.getElementById("list-div");
var timeCounter = document.getElementById("time");
var highScoreBtn = document.getElementById("high-score");
var aCheckText = document.getElementById("answer-check");

//function to remove child buttons
function resetVars(){
  timeLeft = 75;
  qIndex = 0;
  win = false;
  numCorrect = 0;
}

//function to remove buttons from html
function removeBtns(){
  while(listDiv.firstChild) {
    listDiv.removeChild(listDiv.firstChild);
  } 
};

//function to show if answer was correct or wrong
function answerCheck(correct){
  if(correct){
    aCheckText.textContent = "correct";
  }else{
    aCheckText.textContent = "wrong";
  }

var setTO = setTimeout(function(){
  aCheckText.textContent = "";
}, 500);
}

// function render start button and to start timer
function startGame(){
  removeBtns();
  resetVars();

  //get card-body by id and set text
  cardTextDiv.textContent = "There are 10 questions, each wrong anwer will cost you 5 seconds. How fast can you get through them? Click the Start button to start Quiz";

  // add start button
  var startBtn = document.createElement("button");
  startBtn.setAttribute("type", "button");
  startBtn.setAttribute("class", "btn");
  startBtn.setAttribute("id", "start");
  startBtn.textContent = "Start";
  listDiv.appendChild(startBtn);
};

function displayQ(index){
  removeBtns();

  //displayquestion
  cardTextDiv.textContent = questions[index].question;

  //create answer buttons
  for(i = 0; i < questions[index].choices.length; i++){
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("type", "button");
    choiceBtn.setAttribute("class", "btn");
    choiceBtn.setAttribute("id", i);
    choiceBtn.textContent = questions[index].choices[i];
    listDiv.appendChild(choiceBtn);
    listDiv.appendChild(document.createElement("br"));
  }

};

function playGame(){
  win = false;
  numCorrect = 0;
 
  //visble countdown timer
  var timer = setInterval(function(){
    timeCounter.textContent = timeLeft;
    timeLeft--;

    //end game and timer when done
    if(timeLeft <= 0 || win){
      clearInterval(timer);
      endGame();
    }
  }, 1000);
  
  //ask first question
  displayQ(qIndex);
};

function checkButton(event){
  var targetId = parseInt(event.target.id);
    //check answer if correct
    if(targetId === questions[qIndex].correctIndex){
      numCorrect++;
      qIndex++;
      correct = true;
      answerCheck(correct);
      //If there are more questions, display next, else end game
      if(qIndex < questions.length){
        displayQ(qIndex);
      }else{
        win = true;
        endGame();
      }
    }else{
      timeLeft -= 5;
      correct = false;
      answerCheck(correct);
    }
};

function endGame(){
  removeBtns();
  //If all questions were answered, else if not
  if(qIndex === questions.length){
    cardTextDiv.textContent = "You correctly answered all 10.  You had " + (timeLeft + 1) + " seconds left! Enter your name to record your score.";
  }else{
    cardTextDiv.textContent = "You ran out of time. You answered " + numCorrect + " questions correctly! Enter your name to record your score.";
  }

  //create form for high score input
  var hsForm = document.createElement("form");
  hsForm.setAttribute("class", "form-inline");
  var inputFld = document.createElement("input");
  inputFld.setAttribute("class", "form-control mb-2 mr-sm-2");
  inputFld.setAttribute("type", "text");
  inputFld.setAttribute("placeholder", "name or initials");
  var subBtn = document.createElement("button");
  subBtn.setAttribute("type", "submit");
  subBtn.setAttribute("class", "btn mb-2 mr-sm-2");
  subBtn.setAttribute("id", "submit-hs");
  subBtn.textContent = "Submit";

  hsForm.appendChild(inputFld);
  hsForm.appendChild(subBtn);
  cardTextDiv.appendChild(hsForm);
};

function displayHS(){

};

// event listeners for button clicks
listDiv.addEventListener("click", function(event){
  if(event.target.matches("button")){
    if(event.target.id === "start"){
      playGame();
    }else{
      checkButton(event);
    }
  }
});
highScoreBtn.addEventListener("click", displayHS);

startGame();

