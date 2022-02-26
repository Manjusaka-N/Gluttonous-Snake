class Snake {
    element: HTMLElement;
    head: HTMLElement;
    body: HTMLCollection;
    middle: HTMLElement;
    tail: HTMLElement;
    angle: number = 0;
    lastX: number = 0;
    lastY: number = 0;
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = this.element.querySelector('div')!;
        this.body = this.element.getElementsByClassName('body');
        this.tail = document.getElementById('tail')!;
        this.middle = document.getElementById('middle')!;
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
    set X(value: number) {
        if (this.X === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('小蛇蛇撞墙啦!!!')
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();

    }
    set Y(value: number) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error('小蛇蛇撞墙啦!!!')
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    addBody() {
        let i = this.body.length;
        let oldx = (this.body[i - 1] as HTMLElement).offsetLeft;
        let oldy = (this.body[i - 1] as HTMLElement).offsetTop;
        let createmiddle = document.createElement('div');
        createmiddle.classList.add('body');
        createmiddle.style.cssText = `left:${oldx}px; top:${oldy}px;`;
        this.tail.parentElement?.insertBefore(createmiddle, this.tail);
    }

    moveBody() {
        for (let i = this.body.length - 1; i > 0; i--) {
            let X = (this.body[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.body[i - 1] as HTMLElement).offsetTop;
            (this.body[i] as HTMLElement).style.left = X + 'px';
            (this.body[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    tailTurnKeep() {
        setInterval(this.tailTurn.bind(this), 130)
    }
    tailTurn() {
        const i = this.body.length;
        const x3 = (this.body[i - 3] as HTMLElement).offsetLeft;
        const y3 = (this.body[i - 3] as HTMLElement).offsetTop;
        const x2 = (this.body[i - 2] as HTMLElement).offsetLeft;
        const y2 = (this.body[i - 2] as HTMLElement).offsetTop;
        const x1 = (this.body[i - 1] as HTMLElement).offsetLeft;
        const y1 = (this.body[i - 1] as HTMLElement).offsetTop;
        if (x1 === this.lastX && y1 === this.lastY) {
            return;
        } else if (x1 !== x3 && y1 !== y3) {
            if ((x1 === x2 && y1 > y2 && x2 < x3 && y2 === y3) ||
                (x1 < x2 && y1 === y2 && x2 === x3 && y2 < y3) ||
                (x1 === x2 && y1 < y2 && x2 > x3 && y2 === y3) ||
                (x1 > x2 && y1 === y2 && x2 === x3 && y2 > y3)) {
                this.angle += 90;
            } else if ((x1 > x2 && y1 === y2 && x2 === x3 && y2 < y3) ||
                (x1 === x2 && y1 < y2 && x2 < x3 && y2 === y3) ||
                (x1 < x2 && y1 === y2 && x2 === x3 && y2 > y3) ||
                (x1 === x2 && y1 > y2 && x2 > x3 && y2 === y3)) {
                this.angle -= 90;

            } else {
                return;
            }
            setTimeout(() => {
                this.tail.style.transform = `rotate(${this.angle}deg)`;
            }, 150);
        } else {
            return;
        }

        this.lastX = x1;
        this.lastY = y1;
    }

    checkHeadBody() {
        for (let i = 3; i < this.body.length; i++) {
            let bi = this.body[i] as HTMLElement;
            if (this.X === bi.offsetLeft && this.Y === bi.offsetTop) {
                throw new Error('小蛇蛇撞到自己了!!!')
            }
        }
    }
}


export default Snake;