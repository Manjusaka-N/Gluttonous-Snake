"use strict";
class Food {
    constructor() {
        this.element = document.getElementById('food');
    }
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    change() {
        this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px';
        this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px';
    }
}
class ScorePanel {
    constructor() {
        this.score = 0;
        this.level = 0;
        this.maxLevel = 10;
        this.levelScore = 10;
        this.maxScore = 100;
        this.islive = true;
        this.scoreEle = document.getElementById('score');
        this.levelEle = document.getElementById('level');
    }
    scoreAdd() {
        try {
            this.scoreEle.innerHTML = ++this.score + '';
            if (this.score % this.levelScore === 0) {
                this.levelAdd();
            }
            ;
            this.winAlert();
        }
        catch (e) {
            this.winmessage(e);
        }
    }
    winmessage(e) {
        const crash = document.getElementById('crash');
        const crashMessage = crash === null || crash === void 0 ? void 0 : crash.querySelector('p');
        crash.style.display = 'flex';
        if (e.message === '恭喜你!你已成功通过所有关卡!!!') {
            crashMessage.innerHTML = '恭喜你!你已成功通过所有关卡!!!';
        }
        this.islive = false;
    }
    levelAdd() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
    winAlert() {
        if (this.score === this.maxScore) {
            throw new Error('恭喜你!你已成功通过所有关卡!!!');
        }
    }
}
class Snake {
    constructor() {
        this.angle = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.element = document.getElementById('snake');
        this.head = this.element.querySelector('div');
        this.body = this.element.getElementsByClassName('body');
        this.tail = document.getElementById('tail');
        this.middle = document.getElementById('middle');
        this.tailTurnKeep();
    }
    // aboutxy(xy: number, lt: string, pos: number) {
    //     if (xy === pos) {
    //         return;
    //     }
    //     if (pos < 0 || pos > 290) {
    //         throw new Error('小蛇蛇撞墙啦!!!')
    //     }
    //     this.moveBody();
    //     lt = `${pos}px`;
    //     this.checkHeadBody();
    // }
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value) {
        if (this.X === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('小蛇蛇撞墙啦!!!');
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    set Y(value) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('小蛇蛇撞墙啦!!!');
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }
    addBody() {
        var _a;
        let i = this.body.length;
        let oldx = this.body[i - 1].offsetLeft;
        let oldy = this.body[i - 1].offsetTop;
        let createmiddle = document.createElement('div');
        createmiddle.classList.add('body');
        createmiddle.style.cssText = `left:${oldx}px; top:${oldy}px;`;
        (_a = this.tail.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(createmiddle, this.tail);
    }
    moveBody() {
        for (let i = this.body.length - 1; i > 0; i--) {
            let X = this.body[i - 1].offsetLeft;
            let Y = this.body[i - 1].offsetTop;
            this.body[i].style.left = X + 'px';
            this.body[i].style.top = Y + 'px';
        }
    }
    tailTurnKeep() {
        setInterval(this.tailTurn.bind(this), 130);
    }
    tailTurn() {
        const i = this.body.length;
        const x3 = this.body[i - 3].offsetLeft;
        const y3 = this.body[i - 3].offsetTop;
        const x2 = this.body[i - 2].offsetLeft;
        const y2 = this.body[i - 2].offsetTop;
        const x1 = this.body[i - 1].offsetLeft;
        const y1 = this.body[i - 1].offsetTop;
        if (x1 === this.lastX && y1 === this.lastY) {
            return;
        }
        else if (x1 !== x3 && y1 !== y3) {
            if ((x1 === x2 && y1 > y2 && x2 < x3 && y2 === y3) ||
                (x1 < x2 && y1 === y2 && x2 === x3 && y2 < y3) ||
                (x1 === x2 && y1 < y2 && x2 > x3 && y2 === y3) ||
                (x1 > x2 && y1 === y2 && x2 === x3 && y2 > y3)) {
                this.angle += 90;
            }
            else if ((x1 > x2 && y1 === y2 && x2 === x3 && y2 < y3) ||
                (x1 === x2 && y1 < y2 && x2 < x3 && y2 === y3) ||
                (x1 < x2 && y1 === y2 && x2 === x3 && y2 > y3) ||
                (x1 === x2 && y1 > y2 && x2 > x3 && y2 === y3)) {
                this.angle -= 90;
            }
            else {
                return;
            }
            setTimeout(() => {
                this.tail.style.transform = `rotate(${this.angle}deg)`;
            }, 150);
        }
        else {
            return;
        }
        this.lastX = x1;
        this.lastY = y1;
    }
    checkHeadBody() {
        for (let i = 3; i < this.body.length; i++) {
            let bi = this.body[i];
            if (this.X === bi.offsetLeft && this.Y === bi.offsetTop) {
                throw new Error('小蛇蛇撞到自己了!!!');
            }
        }
    }
}
class Setting {
    constructor() {
        this.isLogoClick = false;
        this.isTitlesClick = false;
        this.element = document.getElementById('setting');
        this.logo = document.getElementById('settinglogo');
        this.maincover = document.getElementById('maincover');
        // this.setting = document.getElementById('setting')!;
        this.settingTitles = document.getElementsByClassName('settingTitle');
        this.settingParts = document.getElementsByClassName('settingPart');
        this.designmenu = document.getElementById('designmenu');
        this.designtitle = document.getElementsByClassName('designtitle');
        this.designmenucover = document.getElementById('designmenucover');
        this.designhome = document.getElementById('designhome');
        this.titlesClick();
        this.mainCoverClick();
        this.designTitleClick();
        this.designHomeClick();
    }
    logoClick() {
        this.logo.addEventListener('click', this.logoClickDe.bind(this));
    }
    logoClickDe() {
        if (this.isLogoClick === false) {
            this.element.style.display = 'block';
            this.maincover.style.display = 'block';
            this.isLogoClick = true;
        }
        else {
            this.element.style.display = 'none';
            this.maincover.style.display = 'none';
            this.isLogoClick = false;
        }
    }
    titlesClick() {
        const that = this;
        let ikeep;
        for (let i = 0; i < 4; i++) {
            this.settingTitles[i].addEventListener('click', function () {
                if (!that.isTitlesClick) {
                    for (let j = 0; j < 4; j++) {
                        that.settingParts[j].style.display = 'none';
                    }
                    that.settingParts[i].style.display = 'block';
                    that.isTitlesClick = true;
                }
                else {
                    if (ikeep === i) {
                        that.settingParts[i].style.display = 'none';
                        that.isTitlesClick = false;
                    }
                    else {
                        that.settingParts[ikeep].style.display = 'none';
                        that.settingParts[i].style.display = 'block';
                        that.isTitlesClick = true;
                    }
                }
                ikeep = i;
            });
        }
    }
    mainCoverClick() {
        const that = this;
        this.maincover.addEventListener('click', function () {
            that.logoClickDe();
        });
    }
    designTitleClick() {
        const that = this;
        for (let i = 0; i < this.designtitle.length; i++) {
            this.designtitle[i].addEventListener('click', function () {
                that.designtitle[i].classList.add('designtitleclick');
                that.designmenucover.classList.add('designmenucover');
                that.designhome.style.animation = 'designhomeappear 1s linear forwards';
                that.designhome.style.display = '';
                that.designmenucover.style.display = '';
            });
        }
    }
    designHomeClick() {
        const that = this;
        this.designhome.addEventListener('click', () => {
            for (let i = 0; i < this.designtitle.length; i++) {
                that.designtitle[i].classList.remove('designtitleclick');
            }
            that.designmenucover.classList.remove('designmenucover');
            that.designhome.style.animation = '';
            that.designhome.style.display = 'none';
            that.designmenucover.style.display = 'none';
        });
    }
}
class GameControl {
    constructor() {
        this.direction = 'ArrowRight';
        this.islive = true;
        this.angle = 0;
        this.ispause = false;
        this.lastDirection = 'ArrowRight';
        this.i = 0;
        this.canGameStart = false;
        this.snake = new Snake();
        this.food = new Food();
        this.scorepanel = new ScorePanel();
        this.setting = new Setting();
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
new GameControl();
