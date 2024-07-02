import { TextReveal } from './textReveal';
import { Details } from './details';

export class Menu {
    constructor(el) {
        this.DOM = {
            el: el,
            items: [...el.querySelectorAll('.menu__item')],
            links: [...el.querySelectorAll('.menu__item-link')],
            closeCtrl: el.querySelector('.close--menu'),
            detailsEl: [...el.querySelectorAll('.menu__item-link')].map(item => document.querySelector(item.href.substring(item.href.indexOf('#')))),
            closeDetailsCtrl: document.querySelector('.details-wrap > .close--details')
        };
        this.textReveal = new TextReveal([this.DOM.closeCtrl,...this.DOM.items]);
        this.detailsInstances = [];
        this.DOM.detailsEl.forEach(detailsEl => this.detailsInstances.push(new Details(detailsEl, this.DOM.closeDetailsCtrl)));
        this.initEvents();
    }
    open() {
        this.DOM.el.classList.add('menu--open');
        this.textReveal.in();
    }
    close() {
        this.textReveal.out().then(() => this.DOM.el.classList.remove('menu--open'));
    }
    initEvents() {
        this.DOM.links.forEach((link, pos) => {
            link.addEventListener('click', ev => {
                ev.preventDefault();
                this.openDetails(pos);
            });
        });

        this.DOM.closeDetailsCtrl.addEventListener('click', () => this.closeDetails());
    }
    openDetails(pos) {
        this.menuItemCurrent = pos;

        this.detailsInstances[this.menuItemCurrent].open();

        this.close();
    }
    closeDetails() {
        if ( this.menuItemCurrent === -1 ) return;
        
        this.open();

        this.detailsInstances[this.menuItemCurrent].close();

        // reset
        this.menuItemCurrent = -1;
    }
}