"use strict";
var Car = (function () {
    function Car(game) {
        var _this = this;
        this.counter = 0;
        this.speed = 0;
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.game = game;
        this.posx = 100;
        this.posy = 750;
        this.check = this.game.generateRandom();
        console.log(this.check);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Car.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.check:
                this.speed = 1;
                this.check = this.game.generateRandom();
        }
    };
    Car.prototype.bounce = function () {
        if (this.counter === 15) {
            this.posy += 5;
            this.counter++;
        }
        else if (this.counter === 30) {
            this.posy -= 5;
            this.counter = 0;
        }
        else {
            this.counter++;
        }
    };
    Car.prototype.update = function () {
        this.bounce();
        this.posx += this.speed;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.car = new Car(this);
        this.gameLoop();
        this.generateRandom();
        this.showKey();
    }
    Game.prototype.generateRandom = function () {
        return Math.floor(Math.random() * (90 - 65 + 1) + 65);
    };
    Game.prototype.showKey = function () {
        var key = document.createElement("div");
        key.setAttribute("id", "key");
        document.body.appendChild(key);
        document.getElementById("key").innerHTML = "" + String.fromCharCode(this.car.check) + "";
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map