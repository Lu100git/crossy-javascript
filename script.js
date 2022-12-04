// CONTROLS:  W: up S: down  // best canvas resolution: 1024   576 original resolution 640 360
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

class Game {
    constructor(level, lives) {
        this.level = level
        this.lives = lives
    }

    levelUp() {
        this.level += 1
    }

    tookHit() {
        this.lives -= 1
    }
}

const hearts = []

for (let i = 0; i < 3; i++) {
    hearts[i] = new Sprite(10 + (i * 52), 10, 50, 50, './sprites/heart.png')
}

const background = new Sprite(0, 0, canvas.width, canvas.height, './sprites/background.png')
const chest = new Sprite(488, 8, 50, 50, './sprites/treasure.png')
const player = new Player(490, 512, 36, 36, './sprites/player.png')
const enemy = new Enemy(10, 280, 30, 30, './sprites/enemy.png')
const enemy2 = new Enemy(canvas.width - 80, 70, 46, 46, './sprites/enemy.png')
const enemy3 = new Enemy(canvas.width - 80, 178, 30, 30, './sprites/enemy.png')
const enemy4 = new Enemy(10, 70, 46, 46, './sprites/enemy.png')
const ghost = new Enemy(10, 178, 30, 30, './sprites/ghost.png')

enemy3.speed += 4
enemy4.speed += 6
ghost.speed += 14

const keys = {
    up: {
        pressed: false
    },
    down: {
        pressed: false
    }
}

const game = new Game(1, 3)

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (player.y > 520){
        player.y = 520
    }

    //player movement
    player.velocity.y = 0
    if (keys.up.pressed) player.velocity.y = -6
    else if (keys.down.pressed) player.velocity.y = 6


    //render
    background.draw()
    chest.draw()
    player.update()
    enemy.update()
    enemy2.update()
    if (game.level > 1) enemy3.update()
    if (game.level > 2) {
        enemy4.update()
        ghost.update()
    }
    for (let i = 0; i < game.lives; i++) {
        hearts[i].draw()
    }

    //collition detection
    if (player.collidesWith(chest)) {
        if (game.level > 2) {
            alert("You Win!")
            window.location.href = "https://giphy.com/gifs/moodman-you-win-this-time-SABpzb2ivrS0g4Hgbb/fullscreen"
        }
        alert("NICESU!")
        player.velocity.y = 0
        keys.up.pressed = false
        player.y = 512
        game.levelUp()
    }

    if (player.collidesWith(enemy) || player.collidesWith(enemy2) || player.collidesWith(enemy3) || player.collidesWith(enemy4)) {
        if (game.lives < 2) {
            alert("Game Over!")
            window.location.href = "https://rr.noordstar.me/static/rick.gif"
        }
        alert("OOF!")
        player.velocity.y = 0
        keys.up.pressed = false
        player.y = 512
        game.tookHit()
    }
}
animate()

// events
window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 87:
            keys.up.pressed = true
            break

        case 83:
            keys.down.pressed = true
            break

    }
})

window.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 87:
            keys.up.pressed = false
            break

        case 83:
            keys.down.pressed = false
            break
    }
})
