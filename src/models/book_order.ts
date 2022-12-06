export type BookOrderStatus = 'completed' | 'pending' | 'failed';

export interface BookOrder {
  id: string;
  status: BookOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountBook: number;
  amount: number;
  bookCurrency: string;
  currency: string;
}
