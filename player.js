class Player {
    constructor(x, y, w, h, imageSrc) {
        this.velocity = { x: 0, y: 0 }
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.image = new Image()
        this.image.src = imageSrc
    }

    update() {
        this.y += this.velocity.y
        this.draw()
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.x, this.y, this.w, this.h)
    }

    collidesWith(other_sprite) {
        if (this.x + this.w < other_sprite.x || this.x > other_sprite.x + other_sprite.w) return false
        else if (this.y + this.h < other_sprite.y || this.y > other_sprite.y + other_sprite.h) return false
        else return true
    }
    showInfo(){
        console.log("X: ", this.x, " Y: ", this.y)
    }
}