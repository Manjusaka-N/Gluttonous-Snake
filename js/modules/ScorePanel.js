"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = ScorePanel;
