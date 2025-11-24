const correctAnswers = [
  true, false, true, false, true,
  true, false, true, false, false,
];

let score = 0;

const answeredQuestions = new Array(correctAnswers.length).fill(false);

function checkAnswer(userChoice, buttonElement) {
  const container = buttonElement.closest(".container");
  const resultElement = container.querySelector(".result");
  const questionIndex = Array.from(document.querySelectorAll(".container")).indexOf(container);

  if (answeredQuestions[questionIndex]) return;

  if (userChoice === correctAnswers[questionIndex]) {
    resultElement.textContent = "Correct! Well done.";
    resultElement.style.color = "green";
    score += 1; 
  } else {
    resultElement.textContent = "Sorry, that is incorrect.";
    resultElement.style.color = "red";
  }

  answeredQuestions[questionIndex] = true;


  document.getElementById("scoreDisplay").textContent = `Score: ${score} / ${correctAnswers.length} (Refresh the page to Restart)`;
}