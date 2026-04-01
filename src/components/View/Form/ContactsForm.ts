import { IEvents } from '../../base/Events';
import { Form } from './Form';

export class ContactsForm extends Form {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.emailInput = this.container.querySelector('input[name="email"]')!;
        this.phoneInput = this.container.querySelector('input[name="phone"]')!;
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}