///<reference path='vehicle.ts' />

class Car extends Vehicle{

    constructor() {
        super()

        this.element = document.createElement("car")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element)
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        this.check = this.game.generateRandom()
        this.game.setKey(this.check)
        this.posy = 750
        this.behavior = new Forward(this)

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
            break;
        default: this.speed--
        }
    }

    public update():void{
        this.behavior.update()
    }  
}