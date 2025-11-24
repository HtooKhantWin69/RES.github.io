const questions = [
    {
        category: "Energies",
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Solar energy", "Oil"],
        answer: 2
    },
    {
        category: "Energies",
        question: "What is the main reason renewable energy is considered renewable?",
        options: ["Doesn't require any technology", "Can be replaced naturally without running out", "Available 24/7", "Cheapest form of energy"],
        answer: 1
    },
    {
        category: "Energies",
        question: "Wind turbines convert energy to _____?",
        options: ["Chemical Energy", "Mechanical Energy", "Nuclear Energy", "Thermal Energy"],
        answer: 1
    },
    {
        category: "Energies",
        question: "Hydropower plants mainly rely on _____.",
        options: ["Flowing/Falling Water", "Wind Speed", "Chemical Reaction", "Heat"],
        answer: 0
    },
    {
        category: "Energies",
        question: "Which renewable source comes from heat inside the Earth?",
        options: ["Geothermal Energy", "Solar Energy", "Wind Energy", "Biomass Energy"],
        answer: 0
    },
    {
        category: "Energies",
        question: "Biomass energy is produced from _____.",
        options: ["Radioactive Materials", "Metal Ores", "Organic materials like plants and waste", "Underground Minerals"],
        answer: 2
    },
    {
        category: "Energies",
        question: "A major disadvantage of solar power is, _____?",
        options: ["It only works under Sunlight.", "It create toxic smoke.", "It produces chemical waste.", "It uses Fossil Fuels."],
        answer: 0
    },
    {
        category: "Energies",
        question: "Tidal energy depends on _____?",
        options: ["Rainfall", "Sunlight", "Oceans and Tides", "Steam"],
        answer: 2
    },
    {
        category: "Energies",
        question: "Which renewable energy source is most affected by weather changes?",
        options: ["Solar and wind energy", "Geothermal energy", "Hydropower from large dams", "Biomass plants"],
        answer: 0
    },
    {
        category: "Energies",
        question: "One benefit of renewable energy is",
        options: ["Increases greenhouse gases", "Reduces environmental pollution", "Completely Free to build", "Works only at night"],
        answer: 1
    },
    {
        category: "Energies",
        question: "Which of these is an example of passive solar energy use?",
        options: ["Using mirrors to focus sunlight in a power plant", "Designing a house with large windows to let in natural sunlight", "Installing solar panels on a roof", "Burning wood for heat"],
        answer: 1
    },
    {
        category: "Energies",
        question: "Which renewable energy source produces electricity by heating water into steam using concentrated sunlight?",
        options: ["Biomass", "Solar thermal power", "Wind turbines", "Geothermal vents"],
        answer: 1
    },
    
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let progress = 0;

const categoryElem = document.getElementById('category');
const questionElem = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const scoreElem = document.getElementById('score');
const highScoreElem = document.getElementById('high-score');
const timeElem = document.getElementById('time');
const progressElem = document.getElementById('progress');
const startButton = document.getElementById('start');

if (localStorage.getItem('highScore')) {
    highScoreElem.innerText = localStorage.getItem('highScore');
}

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElem.innerText = score;
    startButton.disabled = true;
    timeLeft = 120;
    timeElem.innerText = timeLeft;
    shuffledQuestions = [...questions];
    shuffle(shuffledQuestions);
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
}

function loadQuestion() {
    const questionData = shuffledQuestions[currentQuestionIndex];
    categoryElem.innerText = `Category: ${questionData.category}`;
    questionElem.innerText = questionData.question;

    const shuffledAnswers = [...questionData.options];
    shuffle(shuffledAnswers);

    answerButtons.forEach((btn, index) => {
        btn.innerText = shuffledAnswers[index];
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });

    progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressElem.style.width = `${progress}%`;
}

function updateTimer() {
    timeLeft--;
    timeElem.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function checkAnswer(selectedIndex) {
    const questionData = shuffledQuestions[currentQuestionIndex];
    const correctAnswerText = questionData.options[questionData.answer];

    if (answerButtons[selectedIndex].innerText === correctAnswerText) {
        answerButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
    }

    scoreElem.innerText = score;
    answerButtons.forEach(btn => btn.disabled = true);
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your score: ${score}`);
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScoreElem.innerText = score;
    }
    startButton.disabled = false;
}

startButton.addEventListener('click', startGame);
answerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => checkAnswer(index));
});