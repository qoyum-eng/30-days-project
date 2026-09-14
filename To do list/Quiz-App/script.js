const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "Home Text Markup Language", correct: false }
        ]
    },

    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style System", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },

    {
        question: "Which language is used to make a website interactive?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a paragraph?",
        answers: [
            { text: "<h1>", correct: false },
            { text: "<p>", correct: true },
            { text: "<div>", correct: false },
            { text: "<br>", correct: false }
        ]
    },

    {
        question: "Which symbol is used for a comment in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "<!-- -->", correct: false },
            { text: "**", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerHTML = "Next";

    showQuestion();
}


function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML =
        `${currentQuestionIndex + 1}. ${currentQuestion.question}`;


    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}


function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(event) {

    const selectedButton = event.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.style.background = "#22c55e";
        selectedButton.style.color = "white";

        score++;
    } else {
        selectedButton.style.background = "#ef4444";
        selectedButton.style.color = "white";
    }


    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.style.background = "#22c55e";
            button.style.color = "white";
        }

        button.disabled = true;
    });


    nextButton.style.display = "block";
}


function showScore() {

    resetState();

    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}!`;

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