import "./style.css";

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const timerDisplay = document.getElementById("timer");
const progressIndicator = document.getElementById("progress"); // Progress indicator

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "London", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
    ],
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "What is the largest desert in the world?",
    answers: [
      { text: "Sahara Desert", correct: true },
      { text: "Arctic Desert", correct: false },
      { text: "Gobi Desert", correct: false },
      { text: "Atacama Desert", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
    ],
  },
  // Add more questions as needed
];


startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  showQuestion(currentQuestion);

  // Start the timer (e.g., 15 seconds per question)
  startTimer(15);

  // Display user progress
  progressIndicator.innerText = `Question ${currentQuestionIndex + 1} of ${
    shuffledQuestions.length
  }`;
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);

  // Check if the timer has run out
  const timeLeft = parseInt(timerDisplay.innerText.split(" ")[2]);
  if (timeLeft === 0) {
    // Handle when time runs out (e.g., mark the question as incorrect)
    // You can add your logic here.
  } else if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function startTimer(seconds) {
  let timeLeft = seconds;
  timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // Handle when time runs out (e.g., mark the question as incorrect)
      // You can add your logic here.
    }
  }, 1000);
}

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
