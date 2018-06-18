class Car {
    
    public element: HTMLElement
    public posx:number
    public posy:number
    private counter:number = 0
    public speed:number = 0
    private game:Game
    public check:number
    public last:number
    public brakeSpeed:number = 1000
    public behavior:Behavior

    constructor() {
        this.game = Game.getInstance()
        this.element = document.createElement("car")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element)
        this.posx = 100
        this.posy = 750
        this.check = this.game.generateRandom()
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        this.behavior = new Forward(this)
    }

    public bounce(x:number):void{
        if (this.counter === 15){
            this.posy += 5*x
            this.counter++
        } else if (this.counter === 30){
            this.posy -= 5*x
            this.counter = 0
        } else {
            this.counter++
        }
    }

    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.check:
            this.last = Date.now()
            this.speed++
            this.check = this.game.generateRandom()
            this.game.setKey(this.check)
            if (this.speed > 0){
                this.behavior = new Forward(this)
            }
        }
    }

    
    public update(){
        console.log(this.speed)
        this.behavior.update()
    }
}