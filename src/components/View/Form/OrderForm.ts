import { IEvents } from '../../base/Events';
import { TPayment } from '../../../types';
import { Form } from './Form';

export class OrderForm extends Form {
    private _cardButton: HTMLButtonElement;
    private _cashButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._cardButton = container.querySelector('button[name="card"]')!;
        this._cashButton = container.querySelector('button[name="cash"]')!;

        this._cardButton.addEventListener('click', () => {
            events.emit('form:change', { field: 'payment', value: 'card' });
        });

        this._cashButton.addEventListener('click', () => {
            events.emit('form:change', { field: 'payment', value: 'cash' });
        });
    }

    set payment(value: TPayment | null) {
        this._cardButton.classList.toggle('button_alt-active', value === 'card');
        this._cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        (this.container.querySelector('input[name="address"]')! as HTMLInputElement).value = value;
    }
}
