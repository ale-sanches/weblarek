import './scss/styles.scss';
import {EventEmitter} from './components/base/Events';
import {Api} from './components/base/Api';
import {API_URL} from './utils/constants';

import {ProductCatalog} from './components/Models/ProductsCatalog'
import {Cart} from './components/Models/Cart';
import {BuyerData} from './components/Models/BuyerData';
import {WebLarekApi} from './components/WebLarekApi';

import {Page} from './components/View/Page';
import {CardCatalog} from './components/View/Card/CardCatalog';
import {CardPreview} from './components/View/Card/CardPreview';
import {CardBasket} from './components/View/Card/CardBasket';
import {Basket} from './components/View/Basket';
import {OrderForm} from './components/View/Form/OrderForm';
import {ContactsForm} from './components/View/Form/ContactsForm';
import {Modal} from './components/View/Modal';
import {Success} from './components/View/Success';

import {IBuyer} from './types';

const events = new EventEmitter();
const api = new WebLarekApi(new Api(API_URL));

// Модели
const catalogModel = new ProductCatalog(events);
const cartModel = new Cart(events);
const buyerModel = new BuyerData(events);

// Шаблоны
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

// представление
const page = new Page(document.body, events);
const modal = new Modal(document.querySelector('#modal-container')!);
const basket = new Basket(
    basketTemplate.content.querySelector('.basket')!.cloneNode(true) as HTMLElement,
    events
);
const orderForm = new OrderForm(
    orderTemplate.content.querySelector('.form')!.cloneNode(true) as HTMLFormElement,
    events
);
const contactsForm = new ContactsForm(
    contactsTemplate.content.querySelector('.form')!.cloneNode(true) as HTMLFormElement,
    events
);

const cardPreview = new CardPreview(
    cardPreviewTemplate.content.querySelector('.card')!.cloneNode(true) as HTMLElement,
    events
);
const success = new Success(
    successTemplate.content.querySelector('.order-success')!.cloneNode(true) as HTMLElement,
    events
);

// Обработчики событий от моделей
// рендерим карточки на главной странице при обновлениях каталога
events.on('catalog:changed', () => {
    page.catalog = catalogModel.getItems().map((item) => {
        const card = new CardCatalog(
            cardCatalogTemplate.content.querySelector('.card')!.cloneNode(true) as HTMLElement,
            () => events.emit('card:select', {id: item.id})
        );
        return card.render({
            title: item.title,
            price: item.price,
            category: item.category,
            image: item.image,
        });
    });
});

// модалка с карточкой при изменении превью
events.on('preview:changed', () => {
    const item = catalogModel.getPreview();
    if (!item) return;

    modal.content = cardPreview.render({
        title: item.title,
        price: item.price,
        category: item.category,
        image: item.image,
        description: item.description,
        inCart: cartModel.hasItem(item.id),
    });

    modal.open();
});

// обновление корзины и счетчика
events.on('cart:changed', () => {
    page.counter = cartModel.getCount();

    basket.total = cartModel.getTotalPrice();
    basket.items = cartModel.getItems().map((item, index) => {
        const card = new CardBasket(
            cardBasketTemplate.content.querySelector('.card')!.cloneNode(true) as HTMLElement,
            () => cartModel.removeItem(item)
        );
        return card.render({
            title: item.title,
            price: item.price,
            index: index + 1,
        });
    });
});

// валидация и обновление формы при изменениях от покупателя
events.on('buyer:changed', () => {
    const errors = buyerModel.validate();

    const buyer = buyerModel.getData();

    const orderErrors = [errors.payment, errors.address]
        .filter(Boolean)
        .join(', ');

    const contactsErrors = [errors.phone, errors.email]
        .filter(Boolean)
        .join(', ');

    orderForm.payment = buyer.payment;
    orderForm.address = buyer.address;

    contactsForm.email = buyer.email;
    contactsForm.phone = buyer.phone;

    orderForm.render({
        valid: !errors.payment && !errors.address,
        errors: orderErrors,
    });

    contactsForm.render({
        valid: !errors.phone && !errors.email,
        errors: contactsErrors,
    });
});
// Обработчики от представлений
// сохранение превью
events.on('card:select', (data: { id: string }) => {
    const item = catalogModel.getItemById(data.id);
    if (item) {
        catalogModel.setPreview(item);
    }
});

// Кнопки корзины в превью
events.on('card:toggleCart', () => {
    const item = catalogModel.getPreview();
    if (!item) return;

    if (cartModel.hasItem(item.id)) {
        cartModel.removeItem(item);
    } else {
        cartModel.addItem(item);
    }
    modal.close();
});

// Открытие корзины
events.on('basket:open', () => {
    modal.content = basket.render();
    modal.open();
});

// первая форма
events.on('order:start', () => {
    orderForm.payment = buyerModel.getData().payment;
    modal.content = orderForm.render({
        valid: false,
        errors: '',
    });
    modal.open();
});

events.on('form:change', (data: { field: string; value: string }) => {
    buyerModel.setField(data.field as keyof IBuyer, data.value);
});

// Отправка первой формы — переходим ко второй
events.on('order:submit', () => {
    modal.content = contactsForm.render({
        valid: false,
        errors: '',
    });
});

// Отправка
events.on('contacts:submit', () => {
    const buyer = buyerModel.getData();
    const items = cartModel.getItems();

    api.createOrder({
        ...buyer,
        payment: buyer.payment!,
        items: items.map((i) => i.id),
        total: cartModel.getTotalPrice(),
    })
        .then((result) => {
            modal.content = success.render({total: result.total});
            modal.open();
            cartModel.clear();
            buyerModel.clear();
        })
        .catch((err) => {
            console.error('Ошибка при оформлении заказа:', err);
        });
});


events.on('success:close', () => {
    modal.close();
});

// Загрузка товаров

api.getProducts()
    .then((data) => {
        catalogModel.setItems(data.items);
    })
    .catch((err) => {
        console.error('Ошибка при получении товаров:', err);
    });