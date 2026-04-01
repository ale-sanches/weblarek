import { Card } from './Card';

export class CardBasket extends Card {
    private indexEl: HTMLElement;
    private deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, onDelete: () => void) {
        super(container);

        this.indexEl = container.querySelector('.basket__item-index')!;
        this.deleteButton = container.querySelector('.basket__item-delete')!;

        this.deleteButton.addEventListener('click', onDelete);
    }

    set index(value: number) {
        this.indexEl.textContent = String(value);
    }
}