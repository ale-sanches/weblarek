import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/Models/ProductsCatalog';
import { Cart } from './components/Models/Cart';
import { BuyerData } from './components/Models/BuyerData';


// Каталог товаров
const catalog = new ProductCatalog();

catalog.setItems(apiProducts.items);
console.log('Все товары каталога:', catalog.getItems());

const foundItem = catalog.getItemById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
console.log('Товар по id:', foundItem);

const unknownItem = catalog.getItemById('несуществующий-id');
console.log('Товар с несуществующим id:', unknownItem);

catalog.setPreview(apiProducts.items[0]);
console.log('Товар для предпросмотра:', catalog.getPreview());

// Корзина
const cart = new Cart();

console.log('Пустая корзина:', cart.getItems());
console.log('Количество товаров в пустой корзине:', cart.getCount());
console.log('Стоимость пустой корзины:', cart.getTotalPrice());

const [product1, product2, product3] = apiProducts.items;

cart.addItem(product1);
cart.addItem(product2);
cart.addItem(product3); // price: null — не влияет на сумму
console.log('Корзина после добавления трёх товаров:', cart.getItems());
console.log('Количество товаров:', cart.getCount());
console.log('Итоговая стоимость (null не учитывается):', cart.getTotalPrice());

cart.addItem(product1); // повторное добавление — дубль не должен появиться
console.log('Корзина после повторного добавления product1 (дублей быть не должно):', cart.getItems());

console.log('product1 в корзине (ожидаем true):', cart.hasItem(product1.id));
console.log('product2 в корзине (ожидаем true):', cart.hasItem(product2.id));
console.log('Товар с несуществующим id в корзине (ожидаем false):', cart.hasItem('несуществующий-id'));

cart.removeItem(product2);
console.log('Корзина после удаления product2:', cart.getItems());
console.log('product2 в корзине после удаления (ожидаем false):', cart.hasItem(product2.id));

cart.clear();
console.log('Корзина после очистки:', cart.getItems());
console.log('Количество товаров после очистки:', cart.getCount());

// Данные покупателя
const buyer = new BuyerData();

console.log('Данные покупателя (начальные):', buyer.getData());
console.log('Валидация пустых данных (ожидаем все 4 ошибки):', buyer.validate());

buyer.setField('payment', 'card');
console.log('Валидация после выбора оплаты (ожидаем 3 ошибки):', buyer.validate());

buyer.setField('address', 'ул. Пушкина, д. 1');
buyer.setField('phone', '+79991234567');
buyer.setField('email', 'user@example.com');
console.log('Данные покупателя после заполнения всех полей:', buyer.getData());
console.log('Валидация заполненных данных (ожидаем пустой объект):', buyer.validate());

buyer.setField('email', '');
console.log('Валидация после очистки email (ожидаем 1 ошибку):', buyer.validate());

buyer.clear();
console.log('Данные покупателя после очистки:', buyer.getData());
console.log('Валидация после очистки (ожидаем все 4 ошибки):', buyer.validate());

//запрос товаров с сервера
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';

const baseApi = new Api(API_URL);
const webLarekApi = new WebLarekApi(baseApi);

webLarekApi.getProducts()
    .then((data) => {
        catalog.setItems(data.items);
        console.log('Товары получены с сервера и сохранены в каталог:', catalog.getItems());
    })
    .catch((err) => {
        console.error('Ошибка при получении товаров с сервера:', err);
    });