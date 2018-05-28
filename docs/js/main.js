"use strict";
var Car = (function () {
    function Car() {
        var _this = this;
        this.counter = 0;
        this.speed = 0;
        this.brakeSpeed = 700;
        this.game = Game.getInstance();
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posx = 100;
        this.posy = 750;
        this.check = this.game.generateRandom();
        console.log(this.check);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Car.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.check:
                this.last = Date.now();
                this.speed += 1;
                this.check = this.game.generateRandom();
                this.game.setKey(this.check);
                if (this.brakeSpeed > 400) {
                    this.brakeSpeed -= 50;
                }
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
        if ((this.last + this.brakeSpeed) < Date.now()) {
            this.speed--;
            this.last = Date.now();
        }
    };
    return Car;
}());
var Game = (function () {
    function Game() {
    }
    Game.prototype.initialize = function () {
        this.car = new Car();
        this.gameLoop();
        this.generateRandom();
        this.showKey();
    };
    Game.getInstance = function () {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    };
    Game.prototype.generateRandom = function () {
        return Math.floor(Math.random() * (90 - 65 + 1) + 65);
    };
    Game.prototype.showKey = function () {
        var key = document.createElement("div");
        key.setAttribute("id", "key");
        document.body.appendChild(key);
        document.getElementById("key").innerHTML = "" + String.fromCharCode(this.car.check) + "";
    };
    Game.prototype.setKey = function (key) {
        document.getElementById("key").innerHTML = "" + String.fromCharCode(key) + "";
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
    g.initialize();
});
//# sourceMappingURL=main.js.map