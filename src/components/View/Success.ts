import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Success extends Component<{}> {
    private description: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.description = container.querySelector('.order-success__description')!;
        this.closeButton = container.querySelector('.order-success__close')!;

        this.closeButton.addEventListener('click', () => {
            events.emit('success:close');
        });
    }

    set total(value: number) {
        this.description.textContent = `Списано ${value} синапсов`;
    }
}