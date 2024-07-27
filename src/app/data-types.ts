export interface signUp{
 name:string;
 password:boolean,
 email:string
}
export interface login{
 name:string;
 password:boolean,
}
export interface product{
    productName: string
    productPrice: number
    productColor: string
    productCategory: string
    productURL: string
    productDescription: string;
    id:string;
    quantinty: undefined | number
}