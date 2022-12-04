class Sprite {
    constructor(x, y, w, h, imageSrc) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.x, this.y, this.w, this.h)
    }
}
