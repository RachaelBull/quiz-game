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
        question: 'Who was named the King of Pop?',
        answers: [
            { option: 'Bill Withers', correct: false },
            { option: 'Michael Jackson', correct: correct },
            { option: 'Prince', correct: false },
            { option: 'Stevie Wonder', correct: false },
        ]
    },
    {
        question: 'Who was the lead singer of Queen?',
        answers: [
            { option: 'Steven Tyler', correct: false },
            { option: 'David Bowie', correct: false },
            { option: 'Freddie Mercury', correct: true },
            { option: 'Jim Morrison', correct: false },
        ]
    },
    {
        question: 'Which one of these songs are by Fleetwood Mac?',
        answers: [
            { option: "Can't Stop", correct: false },
            { option: 'Brown Eyed Girl', correct: false },
            { option: 'Take Me Out', correct: false },
            { option: 'Dreams', correct: true },
        ]
    },
    {
        question: 'Which rapper had a UK no.1 hit with the song "Lose Yourself"?',
        answers: [
            { option: 'Jay-Z', correct: false },
            { option: 'Eminem', correct: true },
            { option: 'Kanye West', correct: false },
            { option: 'Drake', correct: false },
        ]
    },
    {
        question: "Who's mom had it going on?",
        answers: [
            { option: "Stacy's", correct: true },
            { option: "Jane's", correct: false },
            { option: "Lisa's", correct: false },
            { option: "Amy's", correct: false },
        ]
    },
    {
        question: 'Which girl group was Beyonce a part of?',
        answers: [
            { option: 'Atomic Kitten', correct: false },
            { option: 'Little Mix', correct: false },
            { option: 'Pussycat Dolls', correct: false },
            { option: "Destiny's Child", correct: true },
        ]
    },
    {
        question: 'Which one of these songs was a UK no.1 hit single by Prince?',
        answers: [
            { option: 'Purple Rain', correct: false },
            { option: 'When Doves Cry', correct: false },
            { option: 'The Most Beautiful Girl In The World', correct: true },
            { option: 'Kiss', correct: false },
        ]
    },
    {
        question: 'Which rock guitarist played on the Michael Jackson song "Beat It"?',
        answers: [
            { option: 'Eddie Van Halen', correct: true },
            { option: 'Jeff Beck', correct: false },
            { option: 'Steve Howe', correct: false },
            { option: 'Slash', correct: false },
        ]
    },
    {
        question: 'Which artist sang "At Last"?',
        answers: [
            { option: 'Whitney Houston', correct: false },
            { option: 'Tina Turner', correct: false },
            { option: 'Celine Dion', correct: false },
            { option: 'Etta James', correct: true },
        ]
    }
]

// Score keeping and question control variables
let answeredCorrect = document.getElementById('users-correct');
let answeredIncorrect = document.getElementById('users-incorrect');
let computerAnsweredCorrect = document.getElementById('milo-correct');
let computerAnsweredIncorrect = document.getElementById('milo-incorrect');
let questionOrder = 0;

// Restart Game Button
let restartGame = document.getElementById('restart-game');
restartGame.addEventListener('click', restart);


// Assigning interaction to buttons and display divs
const questionLineBox = document.getElementById('questions-line');
const answerChoices = document.getElementById('answer-options');
const nextQuestion = document.getElementById('continue');
const checkList = [];

function startQuestionDisplay() {
    questionOrder = 0;
    answeredCorrect.innerText = 0;
    answeredIncorrect.innerText = 0;
    computerAnsweredCorrect.innerText = 0;
    computerAnsweredIncorrect.innerText = 0;
    displayRandomOrder();
}

function displayRandomOrder() {
    const randomisedQuestion = gameQuestions[Math.floor(Math.random() * gameQuestions.length)];
    if (!checkList.includes(randomQuestion)) {
        checkList.push(randomQuestion);
        questionLineBox.innerHTML = randomQuestion.question;
    }

}

startQuestionDisplay();
displayRandomOrder();
