import { IEvents } from '../../base/Events';
import { Card } from './Card';

export class CardCatalog extends Card {
    private id: string = '';

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        container.addEventListener('click', () => {
            events.emit('card:select', { id: this.id });
        });
    }

    set cardId(value: string) {
        this.id = value;
    }
}

