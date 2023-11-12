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

let formComplete = document.getElementById("username-entry");
formComplete.addEventListener('submit', startGame);