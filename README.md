# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Архитектура проекта

Данный проект представляет собой интернет-магазин, который был реализован в виде веб-приложения. Он разработан с применением паттерна проектирования MVP (Model-View-Presenter). Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, вычисления между этой передачей, а также меняют значения в моделях.

## Базовые компоненты

### class Api
Класс, который отвечает за работу с сервером.

Конструктор класса:

baseUrl: string; - принимает базовый Url для доступа к серверу
options: RequestInit; - опции для доступа к различным параметрам

Методы класса:

- handleResponse(response: Response): `Promise<object>` - обрабатывает ответ от сервера
- get(uri: string)  - для получения данных с сервера
- ``post(uri: string, data: object, method: ApiPostMethods = 'POST')``  - для отправки данных на сервер


### class EventEmitter
Класс, который отвечает за работу со слушателями и событиями. Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события. Имеет конструктор, который инициализирует события.

Методы класса:

- on - Установить обработчик на событие
- off - Снять обработчик с события
- emit - Инициировать событие с данными
- onAll - Слушать все события
- offAll - Сбросить все обработчики
- trigger - Сделать коллбек триггер, генерирующий событие при вызове

### abstract class Component <T>
Базовый абстрактный класс, который является основой для компонентов проекта.
Класс является дженериком и принимает в переменной T тип данных, представляющий собой информацию, которая может быть выведена на странице. Абстрактный базовый класс, предназначенный для создания компонентов пользовательского интерфейса. Класс обеспечивает инструментарий для управления DOM элементами и поведением компонента. Наследуется всеми классами представления (View)

Конструктор класса:

constructor(protected readonly container: HTMLElement) - принимает DOM элемент для вставки контента

Методы класса:

- toggleClass(element: HTMLElement, className: string, force?: boolean) - Переключить класс
- setText(element: HTMLElement, value: unknown) - Установить текстовое содержимое
- setDisabled(element: HTMLElement, state: boolean) - Сменить статус блокировки
- setHidden(element: HTMLElement) - Скрыть
- setVisible(element: HTMLElement) - Показать
- setImage(element: HTMLImageElement, src: string, alt?: string) - Установить изображение с алтернативным текстом
- render(data?: Partial<T>): HTMLElement - Вернуть корневой DOM-элемент

### abstract class Model <T>
Базовый абстрактный класс, базовая модель, чтобы можно было отличить ее от простых объектов с данными. Класс является дженериком и принимает в переменной T тип данных, представляющий собой информацию, которую будет содержать модель.

Конструктор класса:

constructor(data: Partial<T>, protected events: IEvents)  - принимает данные и событие

Методы класса:

- emitChanges(event: string, payload?: object) -  Сообщить, что модель поменялась

## Компоненты модели данных

### class Product
Класс наследуется от базового класса Model и расширяется интерфейсом IProduct.  Данный класс хранит информацию о товаре.

Поля класса:

- id: string - идентификатор товара в магазине
- description: string - описание товара
- image: string - URL адрес картинки товара
- title: string - название товара
- category: string - категория товара
- status: boolean - статус товара, в корзине или нет
- price: number - цена товара

### class AppState
Класс наследуется от базового класса Model и расширяется интерфейсом IAppState. Данный класс хранит состояние приложения.

Поля класса:
- basket: Product[] - список товаров в корзине
- catalog: Product[] - каталог товаров
- order: IOrder - заказ
- formErrors: FormErrors - ошибки при заполнении полей форм

Методы класса:
- setCatalog - устанавливает каталог продуктов
- addToBasket - добавляет продукт в корзину
- removeFromBasket - удаляет продукт из корзины
- getTotalBasketPrice - считает итоговую стоимость товаров в корзине
- getEmptyOrder - устанавливает пустые поля в формах оформления заказа
- getCountProductInBasket - считает количество товаров в корзине
- setOrderFields - устанвливает значения в форму заказа
- validateOrder - проверяет внесены ли данные в поля формы с оплатой
- validateContacts - проверяет внесены ли данные в поля формы с контактами
- addProductsToOrder - добавить все товары из корзины в заказ
- clearBasket - очистить корзину
- resetSelected - удаляет информацию о том, что товар в корзине. Товар снова можно купить
- clearOrder - очистить поля заказа

## Компоненты представления

### class Page
Класс для отображения главной страницы. Наследуется от базового класса Component и расширяется интерфейсом IPageUI. Класс отображает каталог товаров на главной странице, отображает количество товаров на иконке корзины. При открытии модального окна, страница блокируется.

Конструктор класса:

constructor(container: HTMLElement, protected events: IEvents) - container - DOM элемент всей страницы, events - ссылка на менеджер событий

Поля класса:

- counter: HTMLElement - DOM элемент счетчика товаров в корзине
- catalog: HTMLElement - DOM элемент каталога товаров
- wrapper: HTMLElement - DOM элемент главной страницы
- basket: HTMLElement - DOM элемент корзины

Методы класса:

- set counter(value: number) - установка счетчика товаров в корзине
- set catalog(items: HTMLElement[]) - установка списка товаров
- set locked(value: boolean) - для блокировки страницы при открытии модального окна

### class Card
Класс описывает компоненту карточки товара, наследуется от базового класса Component и расширяется интерфейсом IProduct. Данные класса служат для отображения карточки и информации в ней в галлерее товаров, просмотре карточки товара и корзине.

Конструктор класса:

constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions)
- blockName - имя блока
- container - DOM элемент карточки
- actions - действия с карточкой

Поля класса:

- title: HTMLElement - DOM элемент названия продукта
- image: HTMLImageElement - DOM элемент картинки продукта
- category: HTMLElement - DOM элемент категории продукта
- price: HTMLElement - DOM элемент цены продукта
- description: HTMLElement - DOM элемент описания продукта
- button?: HTMLButtonElement - DOM элемент кнопки в продукте

Методы класса:

- set id(value: string) - устанавливает id товара
- get id(): string - получает id товара
- set title( value: string) - устанавливает название товара
- get title(): string - получает название товара
- set catetory(value: string) - устанавливает категорию товара
- set price (value: number | null) - устанавливает цену товара
- get price (): number - получает цену товара
- set image(value: string) - устанавливает картинку товару
- set description(value: string | string[]) - устанавливает описание товара
- set button (value: string ) - устанавливает текст кнопки покупки
- set selected (value: boolean) - устанавливает состояние кнопки товара

### class CardPreview
Класс наследуется от класса Card. Класс описывает карточку товара при открытии в модальном окне.

Поля класса:
- description: HTMLElement - DOM элемент описания карточки товара.

Конструктор класса
- container: HTMLElement -  DOM элемент карточки товара
- actions?: ICardActions - действия с карточкой

Метод класса:
- set description(value: string) - устанавливает описание товара

### class Basket
Класс наследуется от базового класса Component и расширяется интерфейсом IBasket. Отвечает за работу с корзиной, отражает информацию по товарам в корзине, стоимости каждой единицы товара, дает возможность удалить товар из корзины, считает и показывает общую сумму заказа.

Поля класса:
- list: HTMLElement - DOM элемент списка товаров в корзине
- total: HTMLElement - DOM элемент общей стоимости товаров в корзине
- button: HTMLButtonElement - DOM элемент кнопки корзины оформления заказа

Конструктор класса:
- blockName - имя блока
- container- DOM элемент компонента корзины
- events` - ссылка на менеджер событий для управления товарами в корзине

Методы класса:
- set total(price: number) - устанавливает итоговую стоимость товаров в корзине
- set list(items: HTMLElement[]) - устанавливает содержимое корзины
- toggleButton(isDisabled: boolean) - управляет блокировкой кнопки "оформить"
- updateIndices() - определяет индекс товара в корзине

### class ProductItemBasket
Класс наследуется от базового класса Component и расширяется интерфейсом IProductInBasket. Класс отражает информацию о товаре в корзине, его названии, стоимости и индексе.

Поля класса:
- index: HTMLElement - DOM элемент индекса товара в корзине
- title: HTMLElement - DOM элемент названия товара
- price: HTMLElement - DOM элемент стоимости товара
- button: HTMLButtonElement - DOM элемент кнопки удалить товар из корзины

Конструктор класса:
- blockName: string - имя блока
- container: HTMLElement- DOM элемент компонента корзины

Методы класса:
- set title(value: string) - устанавливает название товара в корзине
- set index(value: number) - устанавливает индекс товара в корзине
- set price(value: number) - устанавливает стомости товара в корзине

### class Modal
Класс наследуется от базового класса Component и расширяется интерфейсом IModal. Отвечает за работу с модальными окнами.

Поля класса:
- closeButton: HTMLButtonElement - DOM элемент кнопки закрытия модального окна
- content: HTMLElement - DOM элемент с информацией

Конструктор класса:
- container: HTMLFormElement - DOM элемент компонента модального окна
- events: IEvents- ссылка на менеджер событий

Методы класса:
- set content(value: HTMLElement) - определяет содержимое модального окна
- open - открытие модально окна
- close - закрытие модального окна
- render(data: IModal): HTMLElement - определяет вид формы

### class Form
Класс наследуется от базового класса Component и расширяется интерфейсом IFormState. Отвечает за работу с формой заказа.

Поля класса:
- submit: HTMLButtonElement - DOM элемент кнопки отправки формы
- errors: HTMLElement - DOM элемент отображения ошибки валидации формы

Конструктор класса:
- container: HTMLFormElement - DOM элемент компонента формы
- events: IEvents- ссылка на менеджер событий

Методы класса:
- onInputChange(field: keyof T, value: string) - обрабатывает изменения в полях формы
- set valid(value: boolean) - определяет доступность кнопки
- set errors(value: string) - сообщает об ощибке
- render(state: Partial<T> & IFormState) - определяет вид формы

### class OrderForm
Класс наследуется от базового класса Form и расширяется интерфейсом IPaymentFormUI. Класс описывает форму оплаты товара при оформлении заказа.

Поля класса:
- card: HTMLButtonElement - DOM элемент оплаты заказа картой
- cash: HTMLButtonElement -  DOM элемент оплаты заказа при получении
- address: HTMLInputElement -  DOM элемент адреса доставки

Конструктор класса:
- blockName string - имя блока
- container: HTMLFormElement - элемент формы оплаты
- events: IEvents - ссылка на менеджер событий

Метод класса:
- clear()- удаляет информацию из полей формы

### class ContactsForm
Класс наследуется от базового класса Form и расширяется интерфейсом IContactsFormUI. Класс описывает форму ввода контактных данных.

Конструктор класса:
- container: HTMLFormElement - DOM элемент формы с контактными данными
- events - ссылка на менеджер событий

Метод класса:
- clear()- удаляет информацию из полей формы

### class SuccessForm
Класс наследуется от базового класса Component и расширяется интерфейсом ISuccessFormUI. Класс описывает форму подтверждения заказа.

Поля класса:
- button: HTMLButtonElement - DOM элемент кнопки закрытия "За новыми покупками"
- description: HTMLElement - DOM элемент компонента модального окна

Конструктор класса:
- blockName: string - имя блока
- container: HTMLElement - DOM элемент формы оформленного заказа
- actions? - действия с формой заказа

Метод класса:
- set description(value: number) - устанавливает описание общей стоимости заказа


## Основные типы данных

```
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

```

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
