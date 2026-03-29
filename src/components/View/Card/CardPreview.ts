import { IEvents } from '../../base/Events';
import { Card } from './Card';

export class CardPreview extends Card {
    private descriptionEl: HTMLElement;
    private button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.descriptionEl = container.querySelector('.card__text')!;
        this.button = container.querySelector('.card__button')!;

        this.button.addEventListener('click', () => {
            events.emit('card:toggleCart');
        });
    }

    set description(value: string) {
        this.descriptionEl.textContent = value;
    }

    set inCart(value: boolean) {
        this.button.textContent = value ? 'Удалить из корзины' : 'В корзину';
    }

    set price(value: number | null) {
        super.price = value;
        if (value === null) {
            this.button.textContent = 'Недоступно';
            this.button.disabled = true;
        }
    }
}
