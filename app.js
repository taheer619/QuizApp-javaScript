const questions = [
  {
    question: "Which of the following is a JavaScript data type?",
    answers: [
      { text: "String", correct: true },
      { text: "Float", correct: false },
      { text: "Character", correct: false },
      { text: "Double", correct: false },
    ],
  },
  {
    question: "What keyword is used to define a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "let", correct: true },
      { text: "const", correct: true },
      { text: "variable", correct: false },
    ],
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "/* */", correct: true },
      { text: "#", correct: false },
      { text: "<!-- -->", correct: false },
    ],
  },
  {
    question:
      "Which method is used to parse a string to an integer in JavaScript?",
    answers: [
      { text: "parseInt()", correct: true },
      { text: "parse()", correct: false },
      { text: "Integer.parse()", correct: false },
      { text: "parseInteger()", correct: false },
    ],
  },
  {
    question: "Which of the following is not a JavaScript framework?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Vue", correct: false },
      { text: "Laravel", correct: true },
    ],
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    answers: [
      { text: "'22'", correct: true },
      { text: "4", correct: false },
      { text: "'4'", correct: false },
      { text: "NaN", correct: false },
    ],
  },
  {
    question:
      "Which method is used to add an element at the end of an array in JavaScript?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question:
      "Which function is used to check if a number is an integer in JavaScript?",
    answers: [
      { text: "Number.isInteger()", correct: true },
      { text: "isInteger()", correct: false },
      { text: "parseInt()", correct: false },
      { text: "Math.isInteger()", correct: false },
    ],
  },
  {
    question: "What does 'this' keyword refer to in JavaScript?",
    answers: [
      { text: "The object from which it was called", correct: true },
      { text: "The current function", correct: false },
      { text: "The global object", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What does JSON stand for?",
    answers: [
      { text: "JavaScript Object Notation", correct: true },
      { text: "Java Source Object Notation", correct: false },
      { text: "JavaScript Online Notation", correct: false },
      { text: "Java Standard Object Notation", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtn = document.querySelector(".answerBtn");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
