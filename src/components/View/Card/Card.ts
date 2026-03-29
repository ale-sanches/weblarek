import { Component } from '../../base/Component';
import { categoryMap } from '../../../utils/constants';

export class Card extends Component<{}> {
    protected titleEl: HTMLElement;
    protected priceEl: HTMLElement;
    protected categoryEl: HTMLElement;
    protected imageEl: HTMLImageElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleEl = container.querySelector('.card__title')!;
        this.priceEl = container.querySelector('.card__price')!;
        this.categoryEl = container.querySelector('.card__category')!;
        this.imageEl = container.querySelector('.card__image')!;
    }

    set title(value: string) {
        this.titleEl.textContent = value;
    }

    set price(value: number | null) {
        this.priceEl.textContent = value !== null ? `${value} синапсов` : 'Бесценно';
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

    set image(value: string) {
        this.setImage(this.imageEl, value);
    }
}