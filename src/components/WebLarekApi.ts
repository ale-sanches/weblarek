import { IApi, IOrderRequest, IOrderResponse, TProductListResponse } from '../types';

export class WebLarekApi {
    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
    }

    getProducts(): Promise<TProductListResponse> {
        return this._api.get<TProductListResponse>('/product/');
    }

    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this._api.post<IOrderResponse>('/order/', order);
    }
}
