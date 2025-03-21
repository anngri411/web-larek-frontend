import { Model } from "../base/model";
import { IProduct, IOrder, IAppState, FormErrors, IOrderValidate } from "../../types";

export class Product extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	status: boolean;
	price: number | null;
	selected: boolean;
}


export class AppState extends Model<IAppState> {
	basket: Product[] = [];
	catalog: Product[] = [];
	order: IOrder = this.getEmptyOrder();
	formErrors: FormErrors = {};

	setCatalog(items: IProduct[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('catalog:changed', { catalog: this.catalog });
	}

	addToBasket(product: Product) {
		this.basket.push(product);
	}

	removeFromBasket(product: Product) {
		this.basket = this.basket.filter((item) => item.id !== product.id);
	}

	getTotalBasketPrice() {
		let total = 0;
		this.basket.forEach((item) => {
			total = total + item.price;
		});

		return total;
	}

	getEmptyOrder(): IOrder {
		return {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	getCountProductInBasket() {
		return this.basket.length;
	}

	setOrderFields(field: keyof IOrderValidate, value: string) {
		this.order[field] = value;

		if (!this.validateOrder()) {
			return;
		}

		if (!this.validateContacts()) {
			return;
		}
	}

	validateOrder(): boolean {
		const errors: typeof this.formErrors = {};

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}

		this.formErrors = errors;

		this.events.emit('orderFormErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	validateContacts(): boolean {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	addProductsToOrder(): void {
		this.order.items = this.basket.map((product) => product.id);
	}

	clearBasket(): void {
		this.basket = [];
	}

	resetSelected(): void {
		this.catalog.forEach((product) => {
			product.selected = false;
		});
	}

	clearOrder(): void {
		this.order = this.getEmptyOrder();
	}
}