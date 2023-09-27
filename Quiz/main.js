const questions = [
    {
        question: "What is capital of India ?",
        answers: [
            { text: "New Delhi", correct: "true" },
            { text: "Navi Mumbai", correct: "false" },
            { text: "Ahamdabad", correct: "false" },
            { text: "Gurugram", correct: "false" },
            { text: "Some Another", correct: "false" }
        ]
    },
    {
        question: "Who is the host of TV Show : Bigg Boss ?",
        answers: [
            { text: "KR$NA KAULL", correct: "false" },
            { text: "Salman Khan", correct: "true" },
            { text: "Allu Arjun", correct: "false" },
            { text: "Yogi Ji", correct: "false" },
            { text: "Some Another", correct: "false" }
        ]
    },
    {
        question: "Name of the country who founded water on moon ?",
        answers: [
            { text: "America", correct: "false" },
            { text: "Russia", correct: "false" },
            { text: "India", correct: "true" },
            { text: "Israil", correct: "false" },
            { text: "Some Another", correct: "false" }
        ]
    },
    {
        question: "Select the co-founder's name of ChatGpt !",
        answers: [
            { text: "Narendra Modi", correct: "false" },
            { text: "Gautam Adani", correct: "false" },
            { text: "Anand Mahindra", correct: "false" },
            { text: "Elon Musk", correct: "true" },
            { text: "Some Another", correct: "false" }
        ]
    },
    {
        question: "Select first alphabet letter !",
        answers: [
            { text: "W", correct: "false" },
            { text: "A", correct: "true" },
            { text: "D", correct: "false" },
            { text: "B", correct: "false" },
            { text: "E", correct: "false" }
        ]
    }
];

// access elements
const questionElement = document.getElementById('question');
const answers = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');

// initial question index and score
let currentQuestionIndex = 0;
let score = 0;

// start quiz function
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'NEXT';
    showQuestion();
}

// to show question and answers
function showQuestion() {
    resetQuestionState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const answerBtn = document.createElement('button');
        answerBtn.innerHTML = answer.text;
        answerBtn.classList.add('btn');
        answers.appendChild(answerBtn);
        answerBtn.dataset.correct = answer.correct;

        answerBtn.addEventListener('click', selectAnswer);
    })
}

// reset Question on every next click
function resetQuestionState() {
    nextBtn.style.display = "none";

    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}

// after selecting the answer btn
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    // to handle after select answer
    Array.from(answers.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

// show scrore
function showScore() {
    resetQuestionState();
    questionElement.innerHTML = `Your Score : ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

// handle nextBtn
function handleNextBtn() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }

    // change nextBtn to submitBtn on last question
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerHTML = "Submit";
    }
}

// Listening event Onclick to nextBtn
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})

startQuiz();