import {IBuyer, TPayment} from '../../types';

export class BuyerData {
    private payment: TPayment | null = null;
    private address: string = '';
    private phone: string = '';
    private email: string = '';

    setField(field: keyof IBuyer, value: string): void {
        if (field === 'payment') {
            if (value !== 'card' && value !== 'cash') {
                console.error(`Недопустимое значение способа оплаты: ${value}`);
                return;
            }
            this.payment = value;
        } else {
            this[`${field}`] = value;
        }
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            phone: this.phone,
            email: this.email,
        };
    }

    clear(): void {
        this.payment = null;
        this.address = '';
        this.phone = '';
        this.email = '';
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.address) {
            errors.address = 'Укажите адрес доставки';
        }
        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.email) {
            errors.email = 'Укажите email';
        }

        return errors;
    }
}