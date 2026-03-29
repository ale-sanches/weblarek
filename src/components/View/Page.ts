import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Page extends Component<{}> {
    private _catalog: HTMLElement;
    private _counter: HTMLElement;
    private _basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._catalog = container.querySelector('.gallery')!;
        this._counter = container.querySelector('.header__basket-counter')!;
        this._basketButton = container.querySelector('.header__basket')!;

        this._basketButton.addEventListener('click', () => {
            events.emit('basket:open');
        });
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set counter(value: number) {
        this._counter.textContent = String(value);
    }
}