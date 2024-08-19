export enum ApiEndPoints {
    // auth
    signIn = 'auth/login',
    signUp = 'auth/signUp',
    profileGet = 'profile/get',

    // products add
    products = 'products',
    productsiD = 'products/',
    wCartUserid = 'wCart?userId=',
    productLimit3 = 'products?_limit=3',
    productLimit7 = 'products?_limit=7',

    // cart items
    cartUserid = 'cart?userId=',
    wCart = 'wCart',
    cart = 'cart',
    wCartId = 'wCart/',
    cartId = 'cart/',
    
    // order
    orders = 'orders',
    ordersId = 'orders/',
    ordersUserId = 'orders?userId=',
}