import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';

export interface IFormState {
    valid: boolean;
    errors: string;
}

export class Form extends Component<IFormState> {
    protected submit: HTMLButtonElement;
    protected errorsEl: HTMLElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container);

        this.submit = container.querySelector('[type="submit"]')!;
        this.errorsEl = container.querySelector('.form__errors')!;

        container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            events.emit(`form:change`, {
                field: target.name,
                value: target.value,
            });
        });

        container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            events.emit(`${container.name}:submit`);
        });
    }

    set valid(value: boolean) {
        this.submit.disabled = !value;
    }

    set errors(value: string) {
        this.errorsEl.textContent = value;
    }
}