class Game {
    
    protected car:Car
    public key:HTMLElement

    private static instance:Game

    /**
     * The constructor should be private if this class is a singleton.
     * This prevents other classes of creating a new Game instance.
     */
    private constructor() {}

    /**
     * Because the class could still be 'in construction' when the constructor of the Car class is running,
     * the Car constructor will call Game.getInstance() which will then create another Game instance.
     * This creates an infinite loop. Thats why we have to call another method after the constructor is done.
     */
    public initialize() {
        this.car = new Car()
        this.gameLoop()
        this.generateRandom()
        this.showKey()
    }

    /**
     * Game should be a singleton class,
     * because there will always only be 1 instance of Game.
     */
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
        this.key = document.createElement("div")
        this.key.setAttribute("id","key")
        document.body.appendChild(this.key)
        document.getElementById("key").innerHTML = ""+String.fromCharCode(this.car.check)+""
    }
    
    private gameLoop():void{
        this.car.update()
        requestAnimationFrame(() => this.gameLoop())
    }

} 

window.addEventListener("load", () => {
    // Create a Game instance and when that's done, call the initialize method.
    const g = Game.getInstance()
    g.initialize()
});