export interface SaleProduct {
    productId: number,
    productName: string,
    productDesc: string,
    quota: number,
    price: number
}

export enum SaleProductEnum {
    SUCCESS = 200,
    NeedLogin = 401,
}
