class Car {
    
    private element: HTMLElement
    private posx:number
    private posy:number
    private counter:number = 0
    private speed:number = 0
    private game:Game
    public check:number

    constructor() {
        // Because Game is now a singleton, you can easily get the instance via a static method
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


    // onKeyDown now deletes the current div element and loads in the div element with the key key you need to press next
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.check:
            document.body.removeChild(this.game.key)
            this.speed = 1
            this.check = this.game.generateRandom()
            document.body.appendChild(this.game.key)
            document.getElementById("key").innerHTML = ""+String.fromCharCode(this.check)+""
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


    //made it so that your car comes back to the left side off the screen when it drives off at the right.
    public update():void {
        this.bounce()
        if(this.posx > window.innerWidth){
            this.posx = -300
        }else{
            this.posx += this.speed}
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
}