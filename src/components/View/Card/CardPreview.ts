import { IEvents } from '../../base/Events';
import { Card } from './Card';

export class CardPreview extends Card {
    private _description: HTMLElement;
    private _button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._description = container.querySelector('.card__text')!;
        this._button = container.querySelector('.card__button')!;

        this._button.addEventListener('click', () => {
            events.emit('card:toggleCart');
        });
    }

    set description(value: string) {
        this._description.textContent = value;
    }

    set inCart(value: boolean) {
        this._button.textContent = value ? 'Удалить из корзины' : 'В корзину';
    }

    set price(value: number | null) {
        super.price = value;
        if (value === null) {
            this._button.textContent = 'Недоступно';
            this._button.disabled = true;
        }
    }
}
