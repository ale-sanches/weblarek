import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Success extends Component<{}> {
    private _description: HTMLElement;
    private _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._description = container.querySelector('.order-success__description')!;
        this._closeButton = container.querySelector('.order-success__close')!;

        this._closeButton.addEventListener('click', () => {
            events.emit('success:close');
        });
    }

    set total(value: number) {
        this._description.textContent = `Списано ${value} синапсов`;
    }
}