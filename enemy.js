class Enemy {
    constructor(x, y, w, h, imageSrc) {
        this.speed = 8
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.image = new Image()
        this.image.src = imageSrc
    }

    update() {
        this.x += this.speed

        if (this.x >= canvas.width - this.w) this.speed *= -1
        else if (this.x < 0) this.speed *= -1

        this.draw()
    }

    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.x, this.y, this.w, this.h)
    }
}
