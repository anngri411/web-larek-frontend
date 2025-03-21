// Интерфейс, описывающий глобальное состояние приложения
export interface IAppState {
  catalog: IProduct[];
  basket: IProduct[];
  order: IOrder | null;
  setCatalog(items: IProduct[]): void;
  addToBasket(product: IProduct): void;
  removeFromBasket(product: IProduct): void;
}

// Интерфейс, описывающий структуру продукта
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
	selected: boolean;
}

// Интерфейс описывает товар в списке корзины
export interface IProductInBasket extends IProduct {
	index: number;
}

// Интерфейс для UI формы оплаты
export interface IPaymentFormUI {
  payment: string;
  address: string;
}

// Интерфейс для UI формы контактов
export interface IContactsFormUI {
  email: string;
  phone: string;
}

// Интерфейс для данных о заказе
export interface IOrder extends IPaymentFormUI, IContactsFormUI {
  // массив id товаров
  items: string[]
  total: number
}

// Интерфейс описывающий ответ успешной покупки
export interface IOrderResult {
	id: string;
	total: number;
}

// Интерфейс описывает форму успешного заказа
export interface ISuccessFormUI {
	description: number;
}

// Интерфейс используется для валидации полей при заполнении модели заказа
export interface IOrderValidate {
	phone: string;
	email: string;
	address: string;
	payment: string;
}

// Интерфейс описывающий содержимое модельного окна
export interface IModal {
	content: HTMLElement;
}

// Интерфейс описывающий UI корзины
export interface IBasketUI {
	list: HTMLElement[];
	total: number;
}

// Интерфейс для UI главной страницы
export interface IPageUI {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;