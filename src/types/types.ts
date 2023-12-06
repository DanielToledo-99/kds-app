export interface RootState {
  orders: {
    orders: Order[];
  };
}
export type OrderStatus = "wait" | "process" | "finish" | "error";
export interface OrderItems {
  nombre: string;
  costo: number;
  fecha: Date;
  cantidad: number;
  observaciones: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItems[];
}
