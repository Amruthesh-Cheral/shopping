export interface signUp {
    name: string;
    password: boolean,
    email: string
}
export interface login {
    name: string;
    password: boolean,
}
export interface product {
    productName: string
    productPrice: number
    productColor: string
    productCategory: string
    productURL: string
    productDescription: string;
    id: string;
    productId: string | undefined
    quantinty: undefined | number
}
export interface cart {
    productName: string
    productPrice: number
    productColor: string
    productCategory: string
    productURL: string
    productDescription: string;
    id: string | undefined;
    quantinty: undefined | number;
    userId: string |number | undefined;
    productId: string | undefined;
}
export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number;
}
export interface order {
    email: string,
    address: string,
    contact: string,
    userId: string,
    totalPrice: number,
    id: string | undefined,
    productURL: string
}