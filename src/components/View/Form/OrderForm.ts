import { IEvents } from '../../base/Events';
import { TPayment } from '../../../types';
import { Form } from './Form';

export class OrderForm extends Form {
    private cardButton: HTMLButtonElement;
    private cashButton: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.cardButton = container.querySelector('button[name="card"]')!;
        this.cashButton = container.querySelector('button[name="cash"]')!;

        this.cardButton.addEventListener('click', () => {
            events.emit('form:change', { field: 'payment', value: 'card' });
        });

        this.cashButton.addEventListener('click', () => {
            events.emit('form:change', { field: 'payment', value: 'cash' });
        });
    }

    set payment(value: TPayment | null) {
        this.cardButton.classList.toggle('button_alt-active', value === 'card');
        this.cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        (this.container.querySelector('input[name="address"]')! as HTMLInputElement).value = value;
    }
}
