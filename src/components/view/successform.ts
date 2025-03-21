import { ISuccessFormUI } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';

interface ISuccessActions {
	onClick: (event: MouseEvent) => void;
}

export class SuccessForm extends Component<ISuccessFormUI> {
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ISuccessActions
	) {
		super(container);
		this._button = ensureElement<HTMLButtonElement>(
			`.${blockName}__close`,
			container
		);
		this._description = ensureElement<HTMLElement>(
			`.${blockName}__description`,
			container
		);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			}
		}
	}

	set description(value: number) {
		this.setText(this._description, 'Списано ' + value + ' синапсов');
	}
}