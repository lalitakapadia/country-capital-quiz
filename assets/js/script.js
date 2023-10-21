
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
// ---------------------------------------

var startButton = document.querySelector("#start-button");

startButton.addEventListener("click", startQuiz);

var nextButton = document.querySelector("#next-btn");
nextButton.addEventListener("click", nextQuestion);

var previousButton = document.querySelector("#pre-btn");
previousButton.addEventListener("click", previousQuestion);

// -----------------------------------------------

function startQuiz() {

    showQuestion(1);

    var startDiv = document.querySelector("#start-show");
    startDiv.setAttribute("style","visibility: hidden;");

    var questionContainer = document.querySelector("#question-container");
    questionContainer.classList.add("question-container-show");

    currentQuestion = 1;
}

function nextQuestion(){
    currentQuestion = currentQuestion + 1;
    showQuestion(currentQuestion);
}

function previousQuestion(){
    if(currentQuestion > 1) {
        currentQuestion = currentQuestion - 1;
        showQuestion(currentQuestion);

    }
}
function showQuestion(questionNumber) {
    var question = JSON.parse(localStorage.getItem('question' + questionNumber));

    var questionDescription = document.querySelector("#question");
    questionDescription.innerHTML = "Question " + question.id + ": " + question.question;

    var option1 = document.querySelector("#for-answer1");
    option1.innerHTML = question.option1;

    var option2 = document.querySelector("#for-answer2");
    option2.innerHTML = question.option2;

    var option3 = document.querySelector("#for-answer3");
    option3.innerHTML = question.option3;

    var option4 = document.querySelector("#for-answer4");
    option4.innerHTML = question.option4;
}



