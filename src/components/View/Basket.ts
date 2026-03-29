import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Basket extends Component<{}> {
    private _list: HTMLElement;
    private _price: HTMLElement;
    private _button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._list = container.querySelector('.basket__list')!;
        this._price = container.querySelector('.basket__price')!;
        this._button = container.querySelector('.basket__button')!;

        this._button.addEventListener('click', () => {
            events.emit('order:start');
        });
    }

    set items(items: HTMLElement[]) {
        if (items.length === 0) {
            this._list.replaceChildren();
            const empty = document.createElement('p');
            empty.textContent = 'Корзина пуста';
            this._list.appendChild(empty);
            this._button.disabled = true;
        } else {
            this._list.replaceChildren(...items);
            this._button.disabled = false;
        }
    }

    set total(value: number) {
        this._price.textContent = `${value} синапсов`;
    }
}