"use strict";
var Car = (function () {
    function Car() {
        var _this = this;
        this.counter = 0;
        this.speed = 0;
        this.brakeSpeed = 1000;
        this.game = Game.getInstance();
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posx = 100;
        this.posy = 750;
        this.check = this.game.generateRandom();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.behavior = new Forward(this);
    }
    Car.prototype.bounce = function (x) {
        if (this.counter === 15) {
            this.posy += 5 * x;
            this.counter++;
        }
        else if (this.counter === 30) {
            this.posy -= 5 * x;
            this.counter = 0;
        }
        else {
            this.counter++;
        }
    };
    Car.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.check:
                this.last = Date.now();
                this.speed++;
                this.check = this.game.generateRandom();
                this.game.setKey(this.check);
                if (this.speed > 0) {
                    this.behavior = new Forward(this);
                }
        }
    };
    Car.prototype.update = function () {
        console.log(this.speed);
        this.behavior.update();
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
var Backward = (function () {
    function Backward(c) {
        this.car = c;
    }
    Backward.prototype.update = function () {
        this.car.bounce(1);
        this.car.posx += this.car.speed;
        this.car.element.style.transform = "translate(" + this.car.posx + "px, " + this.car.posy + "px)";
        if ((this.car.last + this.car.brakeSpeed) < Date.now()) {
            this.car.speed--;
            this.car.last = Date.now();
        }
    };
    return Backward;
}());
var Forward = (function () {
    function Forward(c) {
        this.car = c;
    }
    Forward.prototype.update = function () {
        this.car.bounce(2);
        this.car.posx += this.car.speed;
        this.car.element.style.transform = "translate(" + this.car.posx + "px, " + this.car.posy + "px)";
        if ((this.car.last + this.car.brakeSpeed) < Date.now()) {
            this.car.speed--;
            this.car.behavior = new Backward(this.car);
        }
    };
    return Forward;
}());
//# sourceMappingURL=main.js.map