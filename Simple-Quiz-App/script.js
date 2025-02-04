// Array of quiz questions with multiple-choice answers
let questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Machine Learning", correct: false },
            { text: "Hyperlink and Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
        ]
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        answers: [
            { text: "Python", correct: false },
            { text: "C", correct: true },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: false },
        ]
    },
    {
        question: "Which company developed the Windows operating system?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Google", correct: false },
            { text: "Microsoft", correct: true },
            { text: "IBM", correct: false },
        ]
    },
    {
        question: "What is the main function of a web browser?",
        answers: [
            { text: "To edit code", correct: false },
            { text: "To display web pages", correct: true },
            { text: "To design websites", correct: false },
            { text: "To store data", correct: false },
        ]
    },
    {
        question: "Which of the following is a popular JavaScript framework?",
        answers: [
            { text: "Django", correct: false },
            { text: "React", correct: true },
            { text: "Laravel", correct: false },
            { text: "Flask", correct: false },
        ]
    }
];

// Selecting HTML elements
let questionElement = document.getElementById('question');
let answerButtons = document.getElementById('answer-buttons');
let nextButton = document.getElementById('next-btn');
let timerElement = document.getElementById('time-left');
let progressElement = document.getElementById('progress');

let currentQuestionIndex = 0;  // Keeps track of current question index
let score = 0;  // Stores user score
let totalTime = 15; // Quiz timer
let timer;
let timeTaken = 0; // Stores total time taken by user

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeTaken = 0;
    totalTime = 60;
    nextButton.innerHTML = "Next";
    timerElement.innerHTML = totalTime;
    updateProgress();
    startTimer(); 
    showQuestion();
}

// Function to start the timer countdown
function startTimer() {
    timer = setInterval(() => {
        totalTime--;
        timeTaken++;  
        timerElement.innerHTML = totalTime;
        if (totalTime === 0) {
            clearInterval(timer);
            showTimeEnd();
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to display the current question and its answers
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    updateProgress();

    // Creating buttons for each answer option
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

// Function to reset the answer buttons before showing a new question
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        selectedBtn.innerHTML += " ✅";
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
        selectedBtn.innerHTML += " ❌";
    }

    // Disable all buttons and show the correct answer
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Function to update quiz progress
function updateProgress() {
    progressElement.innerHTML = `${questions.length} / ${currentQuestionIndex + 1}`;
}

// Function to show message when time runs out
function showTimeEnd() {
    resetState();
    questionElement.innerHTML = `⏳ Time End! You didn't complete the quiz in 15 seconds.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to display the final score at the end of the quiz
function showScore() {
    stopTimer(); 
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! <br> ⏱️ Time Taken: ${timeTaken} seconds`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to handle next button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event listener for next button
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Start the quiz when the page loads
startQuiz();
