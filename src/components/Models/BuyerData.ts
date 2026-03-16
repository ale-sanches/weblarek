import { IBuyer, TPayment } from '../../types';

export class BuyerData {
    private _payment: TPayment = 'card';
    private _address: string = '';
    private _phone: string = '';
    private _email: string = '';

    setField(field: keyof IBuyer, value: string): void {
        if (field === 'payment') {
            this._payment = value as TPayment;
        } else {
            this[`_${field}`] = value;
        }
    }

    getData(): IBuyer {
        return {
            payment: this._payment,
            address: this._address,
            phone: this._phone,
            email: this._email,
        };
    }

    clear(): void {
        this._payment = 'card';
        this._address = '';
        this._phone = '';
        this._email = '';
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (!this._payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this._address) {
            errors.address = 'Укажите адрес доставки';
        }
        if (!this._phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this._email) {
            errors.email = 'Укажите email';
        }

        return errors;
    }
}