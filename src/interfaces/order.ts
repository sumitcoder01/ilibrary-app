import { Book } from "./book";

export interface orderDate {
    seconds: number;
    nanoseconds: number;
}

export interface Order {
    id: string;
    userId: string;
    book: Book;
    order_at: orderDate;
    status: string;
}

export interface OrderDetail {
    id: string;
    orderId:string;
    userId: string;
    displayName: string;
    photoUrl: string;
    email: string;
    order_at: orderDate;
    status: string;
}