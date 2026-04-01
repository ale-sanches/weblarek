import {Component} from '../../base/Component';

export class Card extends Component<{}> {
    protected titleEl: HTMLElement;
    protected priceEl: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleEl = container.querySelector('.card__title')!;
        this.priceEl = container.querySelector('.card__price')!;
    }

    set title(value: string) {
        this.titleEl.textContent = value;
    }

    set price(value: number | null) {
        this.priceEl.textContent = value !== null ? `${value} синапсов` : 'Бесценно';
    }
}