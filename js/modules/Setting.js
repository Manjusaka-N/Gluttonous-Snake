"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Setting;
