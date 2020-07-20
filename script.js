//create questions and add to an array
var qObj0 = {question: "How do you add a comment in javascript?",
            choices: ["//this is a comment", "'this is a comment'", "<!--this is a comment -->", "comment 'this is a comment"],
            correctIndex: 0};
var qObj1 = {question: "How do you declare a JavaScript variable?",
            choices: ["var = varName", "variable = varName", "var varName", "declare varName"],
            correctIndex: 2};
var qObj2 = {question: "Javascript is the same as Java.",
            choices: ["True", "False"],
            correctIndex: 1};
var qObj3 = {question: "what is the correct syntax for external script called \"xxx.js\"",
            choices: ["<script ref=\"xxx.js\">", "<script name=\"xxx.js\">", "<script div=\"xxx.js\">", "<script src=\"xxx.js>\">"],
            correctIndex: 3};
var qObj4 = {question: "Is JavaScript case sensitive?",
            choices: ["False", "True"],
            correctIndex: 1};
var qObj5 = {question: "How do you write \"Hello World\" in an alert box?",
            choices: ["msgBox(\"Hello World\")", "alert(\"Hello World\")", "msg(\"Hello World\")", "alertBox(\"Hello World\")"],
            correctIndex: 1};
var qObj6 = {question: "How do you create a function in JavaScript?",
            choices: ["function = myFunction()", "function: myFunction()", "myFunction()", "function myFunction()"],
            correctIndex: 3};
var qObj7 = {question: "Which is a correct start to a for loop?",
            choices: ["for i = 0 to i = 5", "for(i=0; i=5)", "for(i=0; i = 5; i++)", "for(i=0; i++)"],
            correctIndex: 2};
var qObj8 = {question: "What is the correct way to write a JavaScript array?",
            choices: ["var array =[\"e1\", \"e2\", \"e3\"]", "var array =(\"e1\", \"e2\", \"e3\")", "var array = \"e1\", \"e2\", \"e3\""],
            correctIndex: 0};
var qObj9 = {question: "Inside which HTML element do we put the JavaScript?",
            choices: ["<scripting>", "<script>", "<js>", "<javascript>"],
            correctIndex: 1};
var questions = [qObj0, qObj1, qObj2, qObj3, qObj4, qObj5, qObj6, qObj7, qObj8, qObj9];

//Other global variables
var timeLeft = 75;
var qIndex = 0;
var win = false;
var numCorrect = 0;
var correct = false;
var highScores = [];
var hsStr ="";

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
  
  //initiate highScores
  storedScores = JSON.parse(localStorage.getItem("highScores"));
  if(storedScores !== null){
    highScores = storedScores;
  }

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

//function that display the question at the index of the array
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

//stars the timer 
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

//checks of button click was correct answer
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

//displays the result of the game and get high score name
function endGame(){
  removeBtns();
  
  //If all questions were answered, else if not
  if(qIndex === questions.length){
    //correct time for score
    timeLeft++;
    cardTextDiv.textContent = "You correctly answered all 10.  You had " + timeLeft + " seconds left! Enter your name to record your score.";
  }else{
    cardTextDiv.textContent = "You ran out of time. You answered " + numCorrect + " questions correctly! Enter your name to record your score.";
  }

  //create form for high score input
  var hsForm = document.createElement("form");
  hsForm.setAttribute("class", "form-inline");
  var inputFld = document.createElement("input");
  inputFld.setAttribute("class", "form-control mb-2 mr-sm-2");
  inputFld.setAttribute("type", "text");
  inputFld.setAttribute("id", "hs-text");
  inputFld.setAttribute("placeholder", "name or initials");
  var subBtn = document.createElement("button");
  subBtn.setAttribute("type", "button");
  subBtn.setAttribute("class", "btn mb-2 mr-sm-2");
  subBtn.setAttribute("id", "submit-hs");
  subBtn.textContent = "Submit";

  hsForm.appendChild(inputFld);
  hsForm.appendChild(subBtn);
  listDiv.appendChild(hsForm);
};

//displays the high score array
function displayHS(){
  removeBtns();
  cardTextDiv.textContent = "High Scores";

  for (let i = 0; i < highScores.length; i++) {
    var score = highScores[i];
    var li = document.createElement("li");
    li.textContent = score;
    listDiv.appendChild(li);
  }

  var clearBtn = document.createElement("button");
  clearBtn.setAttribute("class", "button btn");
  clearBtn.setAttribute("id", "clear-button")
  clearBtn.textContent= "Clear high scores";
  var playBtn = document.createElement("button");
  playBtn.setAttribute("class", "button btn");
  playBtn.setAttribute("id", "play-button");
  playBtn.textContent = "Play again!";

  listDiv.appendChild(clearBtn);
  listDiv.appendChild(document.createElement("br"));
  listDiv.appendChild(playBtn);
};

// event listeners for button clicks
highScoreBtn.addEventListener("click", displayHS);
listDiv.addEventListener("click", function(event){

  if(event.target.matches("button")){
    event.preventDefault();

    //start button
    if(event.target.id === "start"){
      playGame();

    //submit button
    }else if(event.target.id === "submit-hs"){
      hsStr = document.getElementById("hs-text").value.trim() +" - "+ timeLeft;
      highScores.push(hsStr);                                        //add string to array
      localStorage.setItem("highScores", JSON.stringify(highScores)); //store array locally
      displayHS();
    
    //Clear high scores button
    }else if(event.target.id === "clear-button"){
      highScores.splice(0, highScores.length);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      displayHS();
    
    //Play again button
    }else if(event.target.id === "play-button"){
      startGame();

    //answer buttons
    }else{
      checkButton(event);
    }
  }
});

startGame();

