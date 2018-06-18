class Game implements Observer{
    
    public vehicle: Vehicle []=[]
    private static instance:Game
    private extraSpeedElement:HTMLElement
    private speedSubject:Subject

    private constructor() {
    }

    public initialize():void {
        this.speedSubject = new Speed()
        this.speedSubject.subscribe(this)
        this.showKey()
        this.showSpeed()
        this.vehicle = [new Truck(this.speedSubject), new Car()]
        this.gameLoop()
    }

    public static getInstance():Game {
        if (!this.instance) {            
            this.instance = new Game()
        }
        return this.instance
    }

    public generateRandom():number{
        return Math.floor(Math.random()*(90-65+1)+65)
    }

    private showKey():void{
        let key = document.createElement("div")
        key.setAttribute("id","key")
        document.body.appendChild(key)
    }

    private showSpeed():void{
        this.extraSpeedElement = document.createElement("speed")
        this.extraSpeedElement.setAttribute("id","extraSpeed")
        document.body.appendChild(this.extraSpeedElement)
    }

    public setKey(key:number):void{
        document.getElementById("key").innerHTML = ""+String.fromCharCode(key)+""
    }

    public winner(v:Vehicle):void{
        if (v instanceof Car){
            alert("You win :D\nDo you want to play again?")
        }
        else if (v instanceof Truck){
            alert("You lost :(\nDo you want to try again?")
        }
        window.location.reload();
    }
    
    private gameLoop():void{
        for(let v of this.vehicle){
            v.update()
            v.checkCollision()
        }
        this.speedSubject.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public notify(p:number):void{
        let speed = Math.floor(p*2)+90
        this.extraSpeedElement.innerHTML = speed.toString() + " km/u"
    }

} 

window.addEventListener("load", () => {
    const g = Game.getInstance()
    g.initialize()
});