"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Snake_1 = __importDefault(require("./Snake"));
const Food_1 = __importDefault(require("../modules/Food"));
const ScorePanel_1 = __importDefault(require("../modules/ScorePanel"));
const Setting_1 = __importDefault(require("../modules/Setting"));
class GameControl {
    constructor() {
        this.direction = 'ArrowRight';
        this.islive = true;
        this.angle = 0;
        this.ispause = false;
        this.lastDirection = 'ArrowRight';
        this.i = 0;
        this.canGameStart = false;
        this.snake = new Snake_1.default();
        this.food = new Food_1.default();
        this.scorepanel = new ScorePanel_1.default();
        this.setting = new Setting_1.default();
        this.stepTime = 150 - (this.scorepanel.level * 30);
        this.gameStart();
        this.start();
        this.pause();
        this.reset();
        this.logoClick();
        // this.mainCoverClick();
        this.speedup();
        // this.canLogoClick();
    }
    speedup() {
        document.body.addEventListener('keydown', this.keydown.bind(this));
        document.body.addEventListener('keyup', this.keyup.bind(this));
    }
    keydown(event) {
        if (this.i > 10) {
            this.stepTime = (150 - (this.scorepanel.level * 30)) * .7;
        }
        ;
        this.i++;
    }
    keyup() {
        this.stepTime = 150 - (this.scorepanel.level * 30);
        this.i = 0;
    }
    start() {
        let btnStart = document.getElementById('startBtn');
        btnStart.addEventListener('click', this.startDetail.bind(this));
    }
    startDetail() {
        if (this.ispause) {
            this.direction = this.lastDirection;
            this.ispause = false;
        }
        else {
            return;
        }
    }
    pause() {
        let btnPause = document.getElementById('pauseBtn');
        btnPause.addEventListener('click', this.pauseDetail.bind(this));
    }
    pauseDetail() {
        if (this.ispause === true) {
            return;
        }
        else {
            this.lastDirection = this.direction;
            this.direction = '';
            this.ispause = true;
        }
    }
    reset() {
        const that = this;
        let btnReset = document.getElementById('resetBtn');
        btnReset.addEventListener('click', function () {
            location.reload();
            that.canGameStart = false;
        });
    }
    gameStart() {
        const timeCount = document.getElementById('timeCount');
        let seconds = 3;
        const count = setInterval(() => {
            timeCount.innerHTML = '' + seconds + '';
            if (seconds === 0) {
                timeCount.style.display = 'none';
                this.snake.element.style.display = 'block';
                this.food.element.style.display = 'flex';
                clearInterval(count);
                setTimeout(() => {
                    this.canGameStart = true;
                }, 100);
            }
            seconds--;
        }, 1000);
        this.food.change();
        this.init();
        // setTimeout(this.init.bind(this), 1000);
    }
    gameOver(e) {
        const crash = document.getElementById('crash');
        const crashMessage = crash === null || crash === void 0 ? void 0 : crash.querySelector('p');
        crash.style.display = 'block';
        if (e.message === '小蛇蛇撞墙啦!!!') {
            // (crash as HTMLElement).style.display = 'flex';
            crashMessage.innerHTML = '小蛇蛇撞墙啦!!! GAME OVER';
        }
        else if (e.message === '小蛇蛇撞到自己了!!!') {
            // (crash as HTMLElement).style.display = 'flex';
            crashMessage.innerHTML = '小蛇蛇撞到自己了!!! GAME OVER';
        }
        this.islive = false;
    }
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // this.run();
        setTimeout(this.run.bind(this), 1000);
    }
    keydownHandler(event) {
        if (this.canGameStart) {
            if ((this.direction[5] === 'R' && event.key[5] === 'L') ||
                (this.direction[5] === 'L' && event.key[5] === 'R') ||
                (this.direction[5] === 'U' && event.key[5] === 'D') ||
                (this.direction[5] === 'D' && event.key[5] === 'U')) {
                return;
            }
            else {
                if ((this.direction[5] === 'R' && event.key[5] === 'D') ||
                    (this.direction[5] === 'D' && event.key[5] === 'L') ||
                    (this.direction[5] === 'L' && event.key[5] === 'U') ||
                    (this.direction[5] === 'U' && event.key[5] === 'R')) {
                    this.angle += 90;
                    this.snake.head.style.transform = 'rotate(' + this.angle + 'deg)';
                }
                else if ((this.direction[5] === 'L' && event.key[5] === 'D') ||
                    (this.direction[5] === 'D' && event.key[5] === 'R') ||
                    (this.direction[5] === 'R' && event.key[5] === 'U') ||
                    (this.direction[5] === 'U' && event.key[5] === 'L')) {
                    this.angle -= 90;
                    this.snake.head.style.transform = 'rotate(' + this.angle + 'deg)';
                }
            }
            if ((event.key[5] === 'R' || event.key[5] === 'L' || event.key[5] === 'U' || event.key[5] === 'D') && !this.ispause) {
                this.direction = event.key;
            }
            else if (event.key === 'p') {
                if (this.ispause === true) {
                    this.ispause = false;
                    this.direction = this.lastDirection;
                    console.log('pause', this.ispause, this.direction);
                }
                else if (this.ispause === false) {
                    // this.ispause = true;
                    // this.direction = '';
                    this.pauseDetail();
                }
            }
            else if (event.key === 'r') {
                location.reload();
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    }
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }
        this.eatFood(X, Y);
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        }
        catch (e) {
            this.gameOver(e);
        }
        this.islive && setTimeout(this.run.bind(this), this.stepTime);
    }
    eatFood(X, Y) {
        if (this.food.X === X && this.food.Y === Y) {
            this.scorepanel.scoreAdd();
            if (this.scorepanel.islive) {
                this.food.change();
            }
            else {
                this.islive = false;
                this.food.element.style.display = 'none';
            }
            this.snake.addBody();
        }
    }
    logoClick() {
        this.setting.logo.addEventListener('click', this.logoClickDe.bind(this));
    }
    logoClickDe() {
        if (!this.islive || this.ispause) {
            if (this.setting.isLogoClick === false) {
                this.setting.element.style.display = 'block';
                this.setting.maincover.style.display = 'block';
                this.setting.isLogoClick = true;
            }
            else {
                this.setting.element.style.display = 'none';
                this.setting.maincover.style.display = 'none';
                this.setting.isLogoClick = false;
            }
        }
        else {
            return;
        }
    }
}
exports.default = GameControl;
