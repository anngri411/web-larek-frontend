import { Component } from "../base/component";
import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}


export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _description: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._category = ensureElement<HTMLElement>(`.${blockName}__category`, container);
        this._price = container.querySelector(`.${blockName}__price`);
        this._description = container.querySelector(`.${blockName}__description`);
        this._button = container.querySelector(`.${blockName}__button`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set catetory(value: string) {
      this.setText(this._category, value);
    }

    set price(value: number | null) {
      this.setText(
        this._price,
        value ? `${value.toString()} синапсов` : 'Бесценно'
      );

      if (value === null) {
        this.setDisabled(this._button, true);
        this.setText(this._button, 'Нельзя купить');
      }
    }

    get price (): number {
      return +this._price.textContent || 0;
    }


    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string | string[]) {
      this.setText(this._description, value);
    }

    set button(value: string) {
      if (this._price.textContent === 'Бесценно') {
        this.setDisabled(this._button, true);
        this.setText(this._button, 'Нельзя купить');
      } else {
        this.setText(this._button, value);
      }
    }

    updateButton(selected: boolean) {
      if (selected) {
        this.button = 'Убрать из корзины';
      } else {
        this.button = 'В корзину';
      }
    }
}

export class CardPreview extends Card {
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
		this._description = container.querySelector(`.${this.blockName}__text`);
	}



	set description(value: string) {
		this.setText(this._description, value);
	}
}