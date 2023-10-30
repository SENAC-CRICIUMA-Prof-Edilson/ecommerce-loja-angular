import { CartItemInterface } from "./cart-item.interface";

export interface CartInterface {
    valorfrete:number,
    cliente:number,
    sessionid:string,
    items:Array<CartItemInterface>
}