class Car {
    
    private element: HTMLElement
    private posx:number
    private posy:number
    private counter:number = 0
    private speed:number = 0
    private game:Game
    public check:number
    private last:number
    private brakeSpeed:number = 700

    constructor() {
        this.game = Game.getInstance()
        this.element = document.createElement("car")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element)
        this.posx = 100
        this.posy = 750
        this.check = this.game.generateRandom()
        console.log(this.check)
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
    }

    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.check:
            this.last = Date.now()
            this.speed += 1
            this.check = this.game.generateRandom()
            this.game.setKey(this.check)
            if (this.brakeSpeed > 400){
                this.brakeSpeed -= 50
            }
        }
    }

    public bounce():void{
        if (this.counter === 15){
            this.posy += 5
            this.counter++
        } else if (this.counter === 30){
            this.posy -= 5
            this.counter = 0
        } else {
            this.counter++
        }
    }

    public update():void {
        this.bounce()
        this.posx += this.speed
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
        if ((this.last + this.brakeSpeed) < Date.now()) {
            this.speed --
            this.last = Date.now()
        }
    }
}