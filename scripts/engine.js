const state = {
    views: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".target"),
        scoreEnemy: document.querySelector(".score-enemy"),
        scorePlayer: document.querySelector(".score-player"),
        lives: document.querySelector(".lives"),
        time: document.querySelector(".time"),
    },
    values: {
        gameVelocity: 750,
        hitPosition: 0,
        currentTime: 60,
    },
    actions: {
        timerId: null,
        countdownTimer: setInterval(countdown, 300)
    },
};

function randomSquare() {
    // percorre todas as squares usando um foreach criando um parametro square
    state.views.squares.forEach((square) => {
        // usando o parametro, remove a classe enemy de cada square
        square.classList.remove("enemy")
    });
    let randomNumber = Math.floor(Math.random() * state.views.squares.length)
    let randomSquare = state.views.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}
function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}
function hitEnemy() {
    state.views.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.views.scorePlayer.textContent++
                playSound("acerto")
                state.values.hitPosition = null
            } else if (square.id != state.values.hitPosition) {
                state.views.scoreEnemy.textContent++
                playSound("errou")
            }
        })
    })
}
function countdown() {
    state.values.currentTime--
    state.views.time.textContent = state.values.currentTime
    if (state.values.currentTime == 0) {
        alert("Game Over, sua pontuação é: " + state.views.scorePlayer.textContent)
        clearInterval(state.actions.countdownTimer)
        state.views.scoreEnemy.textContent = 0
        state.views.scorePlayer.textContent = 0
    }
}
function playSound(audioName) {
    let audio = new Audio(`./audios/${audioName}.mp3`)
    audio.volume = 0.3
    audio.play()
}

function initialize() {
    moveEnemy()
    hitEnemy()
}
initialize()





