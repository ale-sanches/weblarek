import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Basket extends Component<{}> {
    private list: HTMLElement;
    private price: HTMLElement;
    private button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.list = container.querySelector('.basket__list')!;
        this.price = container.querySelector('.basket__price')!;
        this.button = container.querySelector('.basket__button')!;

        this.button.addEventListener('click', () => {
            events.emit('order:start');
        });
    }

    set items(items: HTMLElement[]) {
        if (items.length === 0) {
            this.list.replaceChildren();
            const empty = document.createElement('p');
            empty.textContent = 'Корзина пуста';
            this.list.appendChild(empty);
            this.button.disabled = true;
        } else {
            this.list.replaceChildren(...items);
            this.button.disabled = false;
        }
    }

    set total(value: number) {
        this.price.textContent = `${value} синапсов`;
    }
}