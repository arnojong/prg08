class Game {
    
    protected car:Car

    private static instance:Game

    private constructor() {}

    public initialize() {
        this.car = new Car()
        this.gameLoop()
        this.generateRandom()
        this.showKey()
    }

    public static getInstance() {
        if (!this.instance) {            
            this.instance = new Game()
        }
        return this.instance
    }

    public generateRandom():number{
        return Math.floor(Math.random()*(90-65+1)+65)
    }

    public showKey():void{
        let key = document.createElement("div")
        key.setAttribute("id","key")
        document.body.appendChild(key)
        document.getElementById("key").innerHTML = ""+String.fromCharCode(this.car.check)+""
    }

    public setKey(key:number):void{
        document.getElementById("key").innerHTML = ""+String.fromCharCode(key)+""
    }
    
    private gameLoop():void{
        this.car.update()
        requestAnimationFrame(() => this.gameLoop())
    }

} 

window.addEventListener("load", () => {
    const g = Game.getInstance()
    g.initialize()
});