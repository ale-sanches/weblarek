import { Component } from '../../base/Component';
import { categoryMap } from '../../../utils/constants'

export class Card extends Component<{}> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;

    constructor(container: HTMLElement) {
        super(container);

        this._title = container.querySelector('.card__title')!;
        this._price = container.querySelector('.card__price')!;
        this._category = container.querySelector('.card__category')!;
        this._image = container.querySelector('.card__image')!;
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set price(value: number | null) {
        this._price.textContent = value !== null ? `${value} синапсов` : 'Бесценно';
    }

    set category(value: string) {
        this._category.textContent = value;
        Object.values(categoryMap).forEach((mod) => {
            this._category.classList.remove(mod);
        });
        const modifier = categoryMap[value as keyof typeof categoryMap];
        if (modifier) {
            this._category.classList.add(modifier);
        }
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }
}