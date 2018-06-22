"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = (function () {
    function Vehicle() {
        this.counter = 0;
        this.speed = 0;
        this.game = Game.getInstance();
        this.posx = 100;
    }
    Vehicle.prototype.bounce = function (x) {
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
    Vehicle.prototype.checkCollision = function () {
        if (this.posx > window.innerWidth - this.element.clientWidth) {
            this.game.winner(this);
        }
    };
    Vehicle.prototype.update = function () {
        this.bounce(2);
    };
    return Vehicle;
}());
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        _this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        _this.check = _this.game.generateRandom();
        _this.game.setKey(_this.check);
        _this.posy = 750;
        _this.behavior = new Forward(_this);
        return _this;
    }
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
                break;
            default: this.speed--;
        }
    };
    Car.prototype.update = function () {
        this.behavior.update();
    };
    return Car;
}(Vehicle));
var Game = (function () {
    function Game() {
        this.vehicle = [];
    }
    Game.prototype.initialize = function () {
        this.speedSubject = new Speed();
        this.speedSubject.subscribe(this);
        this.showKey();
        this.showSpeed();
        this.vehicle = [new Truck(this.speedSubject), new Car()];
        this.gameLoop();
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
    };
    Game.prototype.showSpeed = function () {
        this.extraSpeedElement = document.createElement("speed");
        this.extraSpeedElement.setAttribute("id", "extraSpeed");
        document.body.appendChild(this.extraSpeedElement);
    };
    Game.prototype.setKey = function (key) {
        document.getElementById("key").innerHTML = "" + String.fromCharCode(key) + "";
    };
    Game.prototype.winner = function (v) {
        if (v instanceof Car) {
            alert("You win :D\nDo you want to play again?");
        }
        else if (v instanceof Truck) {
            alert("You lost :(\nDo you want to try again?");
        }
        window.location.reload();
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.vehicle; _i < _a.length; _i++) {
            var v = _a[_i];
            v.update();
            v.checkCollision();
        }
        this.speedSubject.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.notify = function (p) {
        var speed = Math.floor(p * 2) + 90;
        this.extraSpeedElement.innerHTML = speed.toString() + " km/u";
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
    g.initialize();
});
var Speed = (function () {
    function Speed() {
        this.observers = [];
        this.speed = 0;
    }
    Speed.prototype.subscribe = function (c) {
        this.observers.push(c);
    };
    Speed.prototype.update = function () {
        this.speed += 0.01;
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var c = _a[_i];
            c.notify(this.speed);
        }
    };
    return Speed;
}());
var Truck = (function (_super) {
    __extends(Truck, _super);
    function Truck(s) {
        var _this = _super.call(this) || this;
        _this.speedSubject = s;
        _this.speedSubject.subscribe(_this);
        _this.element = document.createElement("truck");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        _this.posy = 650;
        return _this;
    }
    Truck.prototype.notify = function (p) {
        this.posx += p;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    return Truck;
}(Vehicle));
var Backward = (function () {
    function Backward(c) {
        this.car = c;
    }
    Backward.prototype.update = function () {
        this.car.bounce(1);
        this.car.posx += this.car.speed;
        this.car.element.style.transform = "translate(" + this.car.posx + "px, " + this.car.posy + "px)";
        if ((this.car.last + 475) < Date.now()) {
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
        if ((this.car.last + 475) < Date.now()) {
            this.car.behavior = new Backward(this.car);
        }
    };
    return Forward;
}());
//# sourceMappingURL=main.js.map