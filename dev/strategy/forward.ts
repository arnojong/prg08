class Forward implements Behavior {
    public car : Car
    constructor(c:Car){
        this.car = c
    }

    public update(){
        this.car.bounce(2)
        this.car.posx += this.car.speed
        this.car.element.style.transform = `translate(${this.car.posx}px, ${this.car.posy}px)`
        if ((this.car.last + this.car.brakeSpeed) < Date.now()) {
            this.car.speed --
            this.car.behavior = new Backward(this.car)
        }
    }
}