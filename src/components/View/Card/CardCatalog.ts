import { IEvents } from '../../base/Events';
import { Card } from './Card';

export class CardCatalog extends Card {
    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        container.addEventListener('click', () => {
            events.emit('card:select', { element: container });
        });
    }
}
