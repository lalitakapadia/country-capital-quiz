
// ## User Story

// ```
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// ```

// ## Acceptance Criteria

// ```
// GIVEN I am taking a code quiz
// WHEN I click the start button

// THEN a timer starts  # TODO

// and I am presented with a question ......DONE

// WHEN I answer a question
// THEN I am presented with another question


// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

var currentQuestion = 0;
var gameTime = 60;
var penulty = 10;
var correctAnswer = "";
// TODO #1 declare a variable to store correct answer of the current question

// ---------------------------------------

var startButton = document.querySelector("#start-button");

startButton.addEventListener("click", startQuiz);

var nextButton = document.querySelector("#next-btn");
nextButton.addEventListener("click", nextQuestion);

var previousButton = document.querySelector("#pre-btn");
previousButton.addEventListener("click", previousQuestion);

var timeDisplay = document.querySelector("#time-display");

var questionDescription = document.querySelector("#question");

// Get all radio button lables from document object
// Why - so that on first or next question, the program can show the latest question's options.
var option1Lable = document.querySelector("#for-answer1");
var option2Lable = document.querySelector("#for-answer2");
var option3Lable = document.querySelector("#for-answer3");
var option4Lable = document.querySelector("#for-answer4");


// Get all radio button object, so that later on the program can change or check it's value.
var option1 = document.querySelector("#answer1");
var option2 = document.querySelector("#answer2");
var option3 = document.querySelector("#answer3");
var option4 = document.querySelector("#answer4");
// -----------------------------------------------

function startQuiz() {

    showQuestion(1);

    var startDiv = document.querySelector("#start-show");
    startDiv.setAttribute("style","visibility: hidden;");

    var questionContainer = document.querySelector("#question-container");
    questionContainer.classList.add("question-container-show");

    currentQuestion = 1;
    timeDisplay.innerHTML = gameTime;
}

function nextQuestion(){
    currentQuestion = currentQuestion + 1;

    const radioButtons = document.querySelectorAll('input[name="answers"]');
    let selectedAnswer;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedAnswer = radioButton.value;
            break;
        }
    }
    if(selectedAnswer == correctAnswer){
        // TODO ADD INTO SCORE
    } else {
        gameTime = gameTime - penulty;
    }

    showQuestion(currentQuestion);
}

function previousQuestion(){
    if(currentQuestion > 1) {
        currentQuestion = currentQuestion - 1;
        showQuestion(currentQuestion);
    }
}

function showQuestion(questionNumber) {
 
    var question = JSON.parse(localStorage.getItem(questionNumber));

    questionDescription.innerHTML = "Question " + question.id + ": " + question.question;

    option1Lable.innerHTML = question.option1;
    option1.checked = false;
    option1.value = question.option1;

    option2Lable.innerHTML = question.option2;
    option2.checked = false;
    option2.value = question.option2;
   
    option3Lable.innerHTML = question.option3;
    option3.checked = false;
    option3.value = question.option3;

    option4Lable.innerHTML = question.option4;
    option4.checked = false;
    option4.value = question.option4;

    correctAnswer = question.answer;
    alert(correctAnswer);
    // TODO #2 store answer in the global variable
}


setInterval(checkGameTime,1000);

function checkGameTime(){
    gameTime = gameTime - 1;
    timeDisplay.innerHTML = gameTime;

    if(gameTime <= 0){
        var questionContainer = document.querySelector("#question-container");
        questionContainer.setAttribute("style","visibility: hidden;");
    }

    // put an if condition, to check if game time is less than or equal to 0. 
    // hide the question section.
 }
