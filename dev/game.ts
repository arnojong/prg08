class Game {
    
    protected car:Car

    constructor() {
        this.car = new Car(this)
        this.gameLoop()
        this.generateRandom()
        this.showKey()
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
    
    private gameLoop():void{
        this.car.update()
        requestAnimationFrame(() => this.gameLoop())
    }

} 

window.addEventListener("load", () => {
    new Game();
});