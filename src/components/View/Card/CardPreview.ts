import { IEvents } from '../../base/Events';
import { Card } from './Card';
import { CDN_URL, categoryMap } from '../../../utils/constants';

export class CardPreview extends Card {
    private descriptionEl: HTMLElement;
    private button: HTMLButtonElement;
    private imageEl: HTMLImageElement;
    private categoryEl: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.descriptionEl = container.querySelector('.card__text')!;
        this.button = container.querySelector('.card__button')!;
        this.imageEl = container.querySelector('.card__image')!;
        this.categoryEl = container.querySelector('.card__category')!;

        this.button.addEventListener('click', () => {
            events.emit('card:toggleCart');
        });
    }

    set description(value: string) {
        this.descriptionEl.textContent = value;
    }

    set image(value: string) {
        this.imageEl.src = CDN_URL + value;
    }

    set category(value: string) {
        this.categoryEl.textContent = value;

        Object.values(categoryMap).forEach((mod) => {
            this.categoryEl.classList.remove(mod);
        });

        const modifier = categoryMap[value as keyof typeof categoryMap];
        if (modifier) {
            this.categoryEl.classList.add(modifier);
        }
    }

    set inCart(value: boolean) {
        if (this.button.disabled) return;

        this.button.textContent = value
            ? 'Удалить из корзины'
            : 'В корзину';
    }

    set price(value: number | null) {
        super.price = value;

        if (value === null) {
            this.button.textContent = 'Недоступно';
            this.button.disabled = true;
        } else {
            this.button.disabled = false;
        }
    }
}