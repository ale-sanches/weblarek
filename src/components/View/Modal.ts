import { Component } from '../base/Component';

export class Modal extends Component<{}> {
    private contentEl: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.contentEl = container.querySelector('.modal__content')!;
        this.closeButton = container.querySelector('.modal__close')!;

        this.closeButton.addEventListener('click', () => {
            this.close();
        });

        this.container.addEventListener('click', (e: MouseEvent) => {
            if (e.target === this.container) {
                this.close();
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentEl.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.contentEl.replaceChildren();
    }
}