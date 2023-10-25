// -----------------------------------------------------
//           Global variables
// -----------------------------------------------------

var currentQuestion = 0;
var gameTime = 40; // in seconds
var penulty = 10;
var correctAnswer = "";
var playerScore = 0;
var totalQuestions = 7;
var intervalId = 0;
// -----------------------------------------------------
//           Global variables - HTML Elements
// -----------------------------------------------------

var startButton = document.querySelector("#start-button");
var nextButton = document.querySelector("#next-btn");
//var previousButton = document.querySelector("#pre-btn");
var timer = document.querySelector("#timer");
var score = document.querySelector("#score");
var questionDescription = document.querySelector("#question");
// Get all radio button lables from document object
// Why - so that on first or next question, the program can show the latest question's options.
var optionR1Lable = document.querySelector("#for-answer1");
var optionR2Lable = document.querySelector("#for-answer2");
var optionR3Lable = document.querySelector("#for-answer3");
var optionR4Lable = document.querySelector("#for-answer4");
// Get all radio button object, so that later on the program can change or check it's value.
var optionR1 = document.querySelector("#answer1");
var optionR2 = document.querySelector("#answer2");
var optionR3 = document.querySelector("#answer3");
var optionR4 = document.querySelector("#answer4");

var questionContainer = document.querySelector("#question-container");
var initials = document.querySelector("#initials");
// get text box html element
// -----------------------------------------------------
//           Add Event Listners
// -----------------------------------------------------

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

// -----------------------------------------------------
//           Functions
// -----------------------------------------------------

// When quiz starts hide the question-container and only shows Start button.
function startQuiz() {

    // validate if the user has entered the name
    if(initials.value==""){
        alert("You must enter your name to start the quiz");
        return;
    } else{
        // now disable the textbox so that user can not change the name during the quiz
        initials.disabled = true;
        // set the timer and score div elements' css style visibility display
        timer.setAttribute("style","display: grid;");
        score.setAttribute("style", "display: grid;");
    }

    // initilize the current question as 1 - because the quiz is just starting
    currentQuestion = 1;

    // call showQuestion function with parameter - current question number that is 1
    showQuestion(currentQuestion);

    // hide the start button div
    var startDiv = document.querySelector("#start-show");
    startDiv.setAttribute("style","display: none;");

    // show question div
    questionContainer.classList.add("question-container-show");

    // display timer
    timer.innerHTML = "Time remaining:" + Math.floor(gameTime / 60) + ":" + gameTime % 60;

    // dispaly current score, the initial is 0 to begin
    score.innerHTML = "Score :" + playerScore;

    // call setInterval function of window, with parameters 1. checkGameTime function 2. 1000 miliseconds
    intervalId = setInterval(checkGameTime,1000);
}

// When user clicks on next button, this function will be called.
function nextQuestion(){

    currentQuestion = currentQuestion + 1;
   
    //Store the correct answer for the game.
    // If answer is correct then time reamin same else minus 10 for wrong answer.
    // Get all radio button elements
    const radioButtons = document.querySelectorAll('input[name="answers"]');

    let selectedAnswer;

    // using loop, find out the answer user has selected / provided
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedAnswer = radioButton.value;
            break;
        }
    }

    // compare the selected vs correct answer
    if(selectedAnswer == correctAnswer) {
        // user has provided correct answer, so increse the score by 1
        playerScore = playerScore + 1;
        // display latest score
        score.innerHTML = "Score :" + playerScore;
    } else {
        // user has provided wrong anwer, so apply the penulty
        gameTime = gameTime - penulty;
    }

    // check if this is last question remaining
    if(currentQuestion == totalQuestions) {
        // change the next button's text so 'submit'
        nextButton.innerHTML = "Submit";
    }

    // if current question is less than or equal to total questions then only call showQuestion function
    if(currentQuestion <= totalQuestions){
        showQuestion(currentQuestion);
    }

    // current question value should be less than or equial to total questions
    // if it goes above...
    if(currentQuestion > totalQuestions){
        // stop the window timer
        clearInterval(intervalId);
        // hide the question container
        var questionContainer = document.querySelector("#question-container");
        questionContainer.setAttribute("style","display: none;");
        // hide the timer display
        timer.setAttribute("style","display: none;");
        // save the score
        saveScore();
    }
    
}

// this function fetches question from local storage and displays on screen.
// this function need parameter question number.
function showQuestion(questionNumber) {
 
    // get the question number from local storage.
    var questionData = JSON.parse(localStorage.getItem(questionNumber));

    // Dispaly question id/number and description
    questionDescription.innerHTML = "Question" + questionData.id + ": " + questionData.question;

    // display the option value in first radio button label
    optionR1Lable.innerHTML = questionData.option1;
    // clear the radio button 1 selection
    optionR1.checked = false;
    // provide radio button a value from question data
    optionR1.value = questionData.option1;

    optionR2Lable.innerHTML = questionData.option2;
    optionR2.checked = false;
    optionR2.value = questionData.option2;
   
    optionR3Lable.innerHTML = questionData.option3;
    optionR3.checked = false;
    optionR3.value = questionData.option3;

    optionR4Lable.innerHTML = questionData.option4;
    optionR4.checked = false;
    optionR4.value = questionData.option4;
    // store the correction answer for later comparision
    correctAnswer = questionData.answer;
}


// is time up?
// this function is called at every 1000 milisecond
function checkGameTime(){

    // reduce the game time by 1 second
    gameTime = gameTime - 1;
    // display remaining time in minutes and seconds
    timer.innerHTML = "Time remaining:" + Math.floor(gameTime / 60) + ":" + gameTime % 60;

    if(gameTime <= 0 ){
        alert("Game time is over");
        // stop window clock function
        clearInterval(intervalId);
        // hide the question container
        var questionContainer = document.querySelector("#question-container");
        questionContainer.setAttribute("style","display: none;");
        timer.setAttribute("style","visibility: hidden;"); 
        // save the score
        saveScore();
    }    
 }

 // save the user score in local storage
 function saveScore(){
    // for given user initial, get any score saved in local storage
    var userScores = JSON.parse(localStorage.getItem(initials.value));

    var resultDiv = document.querySelector("#result");


    if (userScores == null){
        // there are no scores saved for given initials
        var score = {
            attempt: 1,
            score: playerScore,
            date: new Date()
        }
        var quizUser = {
            userName: initials.value,
            historicScores:[score]
        };
        // for the given initial, save the user score into local storage
        localStorage.setItem(initials.value, JSON.stringify(quizUser));
        // display result in raw JSON format
        resultDiv.innerHTML = JSON.stringify(quizUser.historicScores);
    } else{
        // there are historic scores for given user
        var score = {
            attempt: userScores.historicScores.length + 1,
            score: playerScore,
            date: new Date()
        }
        // save latest score in the user history
        userScores.historicScores.push(score);
        localStorage.setItem(initials.value, JSON.stringify(userScores));
        resultDiv.innerHTML = JSON.stringify(userScores.historicScores);
    }
    
    resultDiv.classList.add("result-show");
 }