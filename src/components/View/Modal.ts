import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Modal extends Component<{}> {
    private _content: HTMLElement;
    private _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._content = container.querySelector('.modal__content')!;
        this._closeButton = container.querySelector('.modal__close')!;

        this._closeButton.addEventListener('click', () => {
            events.emit('modal:close');
        });

        container.addEventListener('click', (e: MouseEvent) => {
            if (e.target === container) {
                events.emit('modal:close');
            }
        });
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this._content.replaceChildren();
    }
}
