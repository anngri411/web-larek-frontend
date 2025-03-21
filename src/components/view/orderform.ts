import { IPaymentFormUI } from '../../types';
import { IEvents } from '../base/events';
import { Form } from '../view/form';

export class OrderForm extends Form<IPaymentFormUI> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(
		protected blockName: string,
		container: HTMLFormElement,
		protected events: IEvents
	) {
		super(container, events);

		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
		this._address = container.elements.namedItem('address') as HTMLInputElement;

		if (this._cash) {
			this._cash.addEventListener('click', () => {
				this.toggleCash(true)
				this.toggleCard(false)
				this.onInputChange('payment', 'cash');
			});
		}
		if (this._card) {
			this._card.addEventListener('click', () => {
				this.toggleCash(false)
				this.toggleCard(true)
				this.onInputChange('payment', 'card');
			});
		}
	}

	toggleCash(state: boolean) {
		this.toggleClass(this._cash, 'button_alt-active', state);
	}

	toggleCard(state: boolean) {
		this.toggleClass(this._card, 'button_alt-active', state);
	}

	clear() {
		this.toggleCash(false)
		this.toggleCard(false)
		this._address.value = '';
	}
}