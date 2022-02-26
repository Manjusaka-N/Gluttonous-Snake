class ScorePanel {
    score = 0;
    level = 0;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number = 10;
    levelScore: number = 10;
    maxScore: number = 100;
    islive: boolean = true;
    constructor() {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
    }
    scoreAdd() {
        try {
            this.scoreEle.innerHTML = ++this.score + '';
            if (this.score % this.levelScore === 0) {
                this.levelAdd();
            };
            this.winAlert();
        } catch (e: any) {
            this.winmessage(e);

        }
    }

    winmessage(e: Error) {
        const crash = document.getElementById('crash');
        const crashMessage = crash?.querySelector('p');
        (crash as HTMLElement).style.display = 'flex';
        if (e.message === '恭喜你!你已成功通过所有关卡!!!') {
            (crashMessage as HTMLElement).innerHTML = '恭喜你!你已成功通过所有关卡!!!';
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

export default ScorePanel;