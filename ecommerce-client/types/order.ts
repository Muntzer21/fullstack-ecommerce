import { Product } from "./product";

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}
export interface OrderProduct {
  id: number;
  nameEn: string;
  nameAr: string;
  imageUrl: string;
}
export interface Order {
  id: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  user: OrderUser;
  items: OrderItem[];
}
export interface OrderUser {
  id: number;
  name: string;
  email: string;
}