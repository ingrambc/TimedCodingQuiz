//create questions and add to an array
var qObj0 = {question: "question0",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 0};
var qObj1 = {question: "question1",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 1};
var qObj2 = {question: "question2",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 2};
var qObj3 = {question: "question3",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 3};
var qObj4 = {question: "question4",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 0};
var qObj5 = {question: "question5",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 1};
var qObj6 = {question: "question6",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 2};
var qObj7 = {question: "question7",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 3};
var qObj8 = {question: "question8",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 0};
var qObj9 = {question: "question9",
            choices: ["choice1", "choice2", "choice3", "choice4"],
            correctIndex: 1};
var questions = [qObj0, qObj1, qObj2, qObj3, qObj4, qObj5, qObj6, qObj7, qObj8, qObj9];

//Other global variables
var timeLeft = 75;
var qIndex = 0;
var win = false;

// get DOM elements needed
var cardTextDiv = document.getElementById("card-text");
var listDiv = document.getElementById("list-div");
var timeCounter = document.getElementById("time");

//function to remove child buttons
function removeBtns(){
  while(listDiv.firstChild) {
    listDiv.removeChild(listDiv.firstChild);
  } 
}

// function render start button and to start timer
function startGame(){
  removeBtns();
  win = false;
  //get card-body by id and set text
  cardTextDiv.textContent = "There are 10 questions, each wrong anwer will cost you 5 seconds. How fast can you get through them? Click the Start button to start Quiz";

  // add start button
  var startBtn = document.createElement("button");
  startBtn.setAttribute("class", "btn");
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
    choiceBtn.setAttribute("class", "btn");
    choiceBtn.textContent = questions[index].choices[i];
    listDiv.appendChild(choiceBtn);
    listDiv.appendChild(document.createElement("br"));
  }

}

function playGame(){
  
 
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
}

function endGame(){

}

displayQ(qIndex);