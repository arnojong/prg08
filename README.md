# Drive

Welkom bij mijn repository van het spel Drive

## Inleiding

In dit spel moet je zo snel mogelijk de juiste knoppen indrukken om sneller bij het eind van het scherm te komen dan de bus. Let op, als je de verkeerde knoppen intoetst, zul je langzamer gaan!

## Speelbare game

https://arnojong.github.io/prg08/

## Installatie

- Clone of Fork deze repository
- Open index.html (in de docs map) in je browser via localhost/lokale bestanden

## Klassendiagram

Nog maken

## Pull request

https://github.com/carinhansen/typescript-game/pull/1

In de Pull request heb ik er ten eerste voor gezorgd dat er maar één soort speed was, hierdoor is de code overzichtelijker.
Daarnaast heb ik een startscherm ingebouwd, hierin roep ik de instance aan in een singleton.

## Peer review

https://github.com/perrydrums/prg-8/issues/2

In deze issue heb ik de code van Perry's game gereviewed

## Singleton

```
public static getInstance():Game {
  if (!this.instance) {            
    this.instance = new Game()
  }
  return this.instance
}
```

In de class _Game_ heb ik gebruik gemaakt van Singleton om ervoor te zorgen dat er niet meerdere instanties van _Game_ gemaakt kunnen worden.

## Polymorfisme

De eerste plek waar ik polymorfisme heb toegepast is in de class _Game_ te vinden.
Ik maak daar eerst een array aan met Vehicles erin.
```
this.vehicle = [new Truck(this.speedSubject), new Car()]
```
Verderop update ik beide vehicles en check ik de collisions d.m.v. een for loop door de array heen.
```
for(let v of this.vehicle){
  v.update()
  v.checkCollision()
}
```

Het andere voorbeeld van polymorfisme is een functie om de winnaar te bepalen, deze functie is ook te vinden in class _Game_.
```
this.game.winner(this)
```
Bovenstaande code staat in class _Vehicle_ en deze roept de winner method aan met als parameter een Vehicle.
```
public winner(v:Vehicle):void{
  if (v instanceof Car){
    alert("You win :D\nDo you want to play again?")
  }
  else if (v instanceof Truck){
    alert("You lost :(\nDo you want to try again?")
  }
  window.location.reload();
}
```
Dit is de winner method in de class _Game_, door middel van polymorfisme wordt gekeken welke Vehicle de race heeft gewonnen.

## Strategy

Ik heb een behavior toegevoegd voor als de auto naar voren rijdt en eentje voor wanneer de auto naar achteren rijdt. Ik heb dit gegroepeerd in een apart mapje genaamd _Strategy_. Hierin zit het interface en de twee behavior classes die de behavior implementeren. 

In de _backward_ behavior bounced de auto langer (omdat hij minder hard rijdt) en wordt er geteld of de toets snel genoeg in is gedrukt. Wanneer dit niet het geval is, gaat de speed omlaag. Hij blijft in de _backward_ loopen zolang de speed lager of gelijk is aan 0. De speed gaat omhoog bij elke goede keypress die ook op tijd is. Wanneer de juiste key wordt ingetoetst en de speed hoger is dan 0, wordt de behavior op _forward_ gezet.

In de _forward_ behavior bounced de auto hoger (omdat hij hard rijdt) en wordt de behavior geswitched naar _backward_ als de auto te langzaam rijdt.

## Observer

De observer en de subject heb ik in een interface map gestopt. De subject in mijn game is de class _Speed_. Hierin wordt de variabele ```speed``` steeds groter. De update functie van de class _Speed_ staat hieronder.

```
public update():void{
        this.speed += 0.01
        for(let c of this.observers){
            c.notify(this.speed)
        }
    }
```

Deze variable ```speed``` wordt door twee observers 'beluisterd'. Namelijk door de _Truck_, deze gebruikt de ```speed``` om steeds sneller te gaan door zijn eigen posx hiermee up te daten, dat is hieronder te zien.

```
public notify(p:number):void{
        this.posx+=p
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }
```

De tweede observer is de class _Game_. Deze rekent de ```speed``` om in een bepaald aantal kilometer per uur, en laat deze zien op het scherm.

```
public notify(p:number):void{
        let speed = Math.floor(p*2)+90
        this.extraSpeedElement.innerHTML = speed.toString() + " km/u"
    }
```
