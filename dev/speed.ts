class Speed implements Subject{

    observers:Observer[] = []

    private speed:number = 0

    constructor(){
    }

    public subscribe(c:Observer){
        this.observers.push(c)
    }

    public update():void{
        this.speed += 0.01
        for(let c of this.observers){
            c.notify(this.speed)
        }
    }
}