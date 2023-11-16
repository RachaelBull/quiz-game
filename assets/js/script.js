// Specifying which sections to hide upon initial page load
function initialLoad() {
    document.getElementById("game-area").style.display = 'none';
    // Sets the input field as the focus upon page loadup
    document.getElementById("username").focus();
}

initialLoad();

const playerEntryValue = document.getElementById("users-name");

function startGame(event) {
    // Stops the error page being shown after submission - fixed bug    
    event.preventDefault();
    const usersName = document.getElementById("username");
    playerEntryValue.textContent = usersName.value;
    // To display the game area and hide the start instructions section
    document.getElementById("start-area").style.display = 'none';
    document.getElementById("game-area").style.display = '';
}
// To display a new section upon form submission
let formComplete = document.getElementById("username-entry");
formComplete.addEventListener('submit', startGame);

// Quiz Questions
let gameQuestions = [
    {
        question: "Who was named the King of Pop?",
        answers: [
            { text: "Bill Withers", correct: false },
            { text: "Michael Jackson", correct: true },
            { text: "Prince", correct: false },
            { text: "Stevie Wonder", correct: false },
        ]
    },
    {
        question: "Who was the lead singer of Queen?",
        answers: [
            { text: "Steven Tyler", correct: false },
            { text: "David Bowie", correct: false },
            { text: "Freddie Mercury", correct: true },
            { text: "Jim Morrison", correct: false },
        ]
    },
    {
        question: "Which one of these songs are by Fleetwood Mac?",
        answers: [
            { text: "Can't Stop", correct: false },
            { text: "Brown Eyed Girl", correct: false },
            { text: "Take Me Out", correct: false },
            { text: "Dreams", correct: true },
        ]
    },
    {
        question: "Which rapper had a UK no.1 hit with the song 'Lose Yourself'?",
        answers: [
            { text: "Jay-Z", correct: false },
            { text: "Eminem", correct: true },
            { text: "Kanye West", correct: false },
            { text: "Drake", correct: false },
        ]
    },
    {
        question: "Who's mom had it going on?",
        answers: [
            { text: "Stacy's", correct: true },
            { text: "Jane's", correct: false },
            { text: "Lisa's", correct: false },
            { text: "Amy's", correct: false },
        ]
    },
    {
        question: "Which girl group was Beyonce a part of?",
        answers: [
            { text: "Atomic Kitten", correct: false },
            { text: "Little Mix", correct: false },
            { text: "Pussycat Dolls", correct: false },
            { text: "Destiny's Child", correct: true },
        ]
    },
    {
        question: "Which one of these songs was a UK no.1 hit single by Prince?",
        answers: [
            { text: "Purple Rain", correct: false },
            { text: "When Doves Cry", correct: false },
            { text: "The Most Beautiful Girl In The World", correct: true },
            { text: "Kiss", correct: false },
        ]
    },
    {
        question: "Which rock guitarist played on the Michael Jackson song 'Beat It'?",
        answers: [
            { text: "Eddie Van Halen", correct: true },
            { text: "Jeff Beck", correct: false },
            { text: "Steve Howe", correct: false },
            { text: "Slash", correct: false },
        ]
    },
    {
        question: "Which artist sang 'At Last'?",
        answers: [
            { text: "Whitney Houston", correct: false },
            { text: "Tina Turner", correct: false },
            { text: "Celine Dion", correct: false },
            { text: "Etta James", correct: true },
        ]
    }
];

const questionArea = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const nextButton = document.getElementById("continue");

let currentQuestionIndex = 0;


const checkList = [];
// Targetting user score elements
let answeredCorrect = document.getElementById("users-correct");
let answeredIncorrect = document.getElementById("users-incorrect");
let questionIndex = 0;

function quizStartUp() {
    currentQuestionIndex = 0;
    answeredCorrect = 0;
    answeredIncorrect = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = gameQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionArea.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerOptions.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    };
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        answeredCorrect++;
    } else {
        selectedBtn.classList.add("incorrect");
        answeredIncorrect++;
    }
}

function showScore() {
    resetState();
    questionArea.innerHTML = `You scored ${answeredCorrect} out of ${gameQuestions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < gameQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < gameQuestions.length) {
        handleNextButton();
    } else {
        quizStartUp();
    }
});

quizStartUp();