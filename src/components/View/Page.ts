import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Page extends Component<{}> {
    private catalogEl: HTMLElement;
    private counterEl: HTMLElement;
    private basketButtonEl: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.catalogEl = container.querySelector('.gallery')!;
        this.counterEl = container.querySelector('.header__basket-counter')!;
        this.basketButtonEl = container.querySelector('.header__basket')!;

        this.basketButtonEl.addEventListener('click', () => {
            events.emit('basket:open');
        });
    }

    set catalog(items: HTMLElement[]) {
        this.catalogEl.replaceChildren(...items);
    }

    set counter(value: number) {
        this.counterEl.textContent = String(value);
    }
}