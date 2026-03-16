import { IApi, IOrderRequest, IOrderResponse, TProductListResponse } from '../types';

export class WebLarekApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<TProductListResponse> {
        return this.api.get<TProductListResponse>('/product/');
    }

    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}
