import {Card} from './Card';
import {CDN_URL} from "../../../utils/constants.ts";

export class CardCatalog extends Card {
    private imageEl: HTMLImageElement;
    private categoryEl: HTMLElement;

    constructor(container: HTMLElement, onClick: () => void) {
        super(container);

        this.imageEl = container.querySelector('.card__image')!;
        this.categoryEl = container.querySelector('.card__category')!;

        this.container.addEventListener('click', onClick);
    }

    set image(value: string) {
        this.imageEl.src = CDN_URL + value;
    }

    set category(value: string) {
        this.categoryEl.textContent = value;
    }
}