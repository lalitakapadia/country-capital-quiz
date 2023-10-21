
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


var startButton = document.querySelector("#start-button");

startButton.addEventListener("click", startQuiz);

function startQuiz() {

    var question1 = JSON.parse(localStorage.getItem("question1"));

    var question = document.querySelector("#question");
    question.innerHTML = "Question " + question1.id + ": " + question1.question;

    var option1 = document.querySelector("#for-answer1");
    option1.innerHTML = question1.option1;

    var option2 = document.querySelector("#for-answer2");
    option2.innerHTML = question1.option2;

    var option3 = document.querySelector("#for-answer3");
    option3.innerHTML = question1.option3;

    var option4 = document.querySelector("#for-answer4");
    option4.innerHTML = question1.option4;

    var startDiv = document.querySelector("#start-show");
    startDiv.setAttribute("style","visibility: hidden;");

    var questionContainer = document.querySelector("#question-container");
    questionContainer.classList.add("question-container-show");

}




