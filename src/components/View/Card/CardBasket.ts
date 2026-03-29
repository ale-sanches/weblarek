import { IEvents } from '../../base/Events';
import { Card } from './Card';

export class CardBasket extends Card {
    private indexEl: HTMLElement;
    private deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.indexEl = container.querySelector('.basket__item-index')!;
        this.deleteButton = container.querySelector('.basket__item-delete')!;

        this.deleteButton.addEventListener('click', () => {
            events.emit('cart:remove', { element: container });
        });
    }

    set index(value: number) {
        this.indexEl.textContent = String(value);
    }
}
