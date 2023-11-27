// Declared Variables
const playerEntryValue = document.getElementById("users-name");
const questionArea = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const goButton = document.getElementById("launch-game");
const nextButton = document.getElementById("continue");

let formComplete = document.getElementById("username-entry");
let timer;
let questionNumber = 0;
let answeredCorrect;
let answeredIncorrect;
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

// Event Listeners
formComplete.addEventListener('submit', startGame);
nextButton.addEventListener("click", () => {
    if (questionNumber < gameQuestions.length) {
        proceedOn();
    } else {
        quizStartUp();
    }
});

// Specifying which sections to hide upon initial page load
function initialLoad() {
    document.getElementById("game-area").style.display = 'none';
    document.getElementById("username").focus();
}

initialLoad();

function startGame(event) {
    // Stops the error page being shown after submission - fixed bug    
    event.preventDefault();
    const usersName = document.getElementById("username");
    playerEntryValue.textContent = usersName.value;
    // To display the game area and hide the start instructions section
    document.getElementById("start-area").style.display = 'none';
    document.getElementById("game-area").style.display = '';
}

// Small parts of this code is from https://www.youtube.com/watch?app=desktop&v=PBcqGxrr9g8
function quizStartUp() {
    goButton.addEventListener('click', startCountdown);
    questionNumber = 0;
    answeredCorrect = 0;
    answeredIncorrect = 0;
    nextButton.innerHTML = "Next";
    document.getElementById("users-correct").innerHTML = "0";
    document.getElementById("incorrect-line").style.display = '';
    document.getElementById("timer-both").style.display = '';
    document.getElementById("users-incorrect").innerHTML = "0";
    showQuestion();
}

// Code influenced and obtained from https://www.youtube.com/watch?app=desktop&v=PBcqGxrr9g8
function showQuestion() {
    stopCountdown();
    questionArea.style.display = '';
    resetState();
    let currentQuestion = gameQuestions[questionNumber];
    let questionNo = questionNumber + 1;
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
    nextButton.style.display = 'none';
    nextButton.addEventListener('click', startCountdown);
}

/**
 * Function to reset the current state of the answers area after each question is answered
 * Code infulenced and obtained from https://www.youtube.com/watch?app=desktop&v=PBcqGxrr9g8
 */
function resetState() {
    while (answerOptions.firstChild) {
        answerOptions.removeChild(answerOptions.firstChild);
    };
}

// Function to increase the correct score when a selected answer is true and correct
function increaseCorrectScore() {
    let oldScore = parseInt(document.getElementById("users-correct").innerText);
    document.getElementById("users-correct").innerText = ++oldScore;
}

// Function to increase incorrect score when a selected answer is false and incorrect or the timer runs out
function increaseIncorrectScore() {
    let oldScore = parseInt(document.getElementById("users-incorrect").innerText);
    document.getElementById("users-incorrect").innerText = ++oldScore;
}

/**
 * Function to determine whether or not the selected answer is correct or incorrect.
 * Parts of this code is influenced and obtained from https://www.youtube.com/watch?app=desktop&v=PBcqGxrr9g8
 */
function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        answeredCorrect++;
        alert(`Indeed! That is the correct answer.`);
        increaseCorrectScore();
        stopCountdown();
    } else {
        selectedBtn.classList.add("incorrect");
        answeredIncorrect++;
        alert(`Great choice, though not correct!`);
        increaseIncorrectScore();
        stopCountdown();
    }
    nextButton.style.display = '';
    buttonControls();
}

// Function to display the final score tally when reaching the end of the game, with an option to play again
function showScore() {
    stopCountdown();
    document.getElementById("incorrect-line").style.display = 'none';
    document.getElementById("timer-both").style.display = 'none';
    questionArea.style.display = 'none';
    resetState();
    nextButton.innerHTML = "Give it another shot?";
    nextButton.style.display = "block";
}

// Function to proceed through the questions array until the end is reached
function proceedOn() {
    questionNumber++;
    if (questionNumber < gameQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Function to initiate the start of the timer
function startCountdown() {
    var countBegin = 12;
    timer = setInterval(function () {
        document.getElementById("timer").innerHTML = countBegin;
        countBegin--;
        // What to display when the timer reaches 0
        if (countBegin < 0) {
            nextButton.style.display = '';
            clearInterval(timer);
            buttonControls();
            increaseIncorrectScore();
            answeredIncorrect++;
            answerOptions.disabled = true;
        }
    }, 1000);
}

// Function to inititate the end of the timer
function stopCountdown() {
    clearInterval(timer);
    document.getElementById("timer").innerHTML = '';
}

/**
 * Function to call the CSS styles once a button has been selected
 * Code within the function was influenced and partly used from https://www.youtube.com/watch?app=desktop&v=PBcqGxrr9g8
 */
function buttonControls() {
    Array.from(answerOptions.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });
}

quizStartUp();