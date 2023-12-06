export interface RootState {

  orders: {
    orders: Order[];
  };
}

export interface OrderItem {
  nombre: string;
  costo: number;
  fecha: Date;
  cantidad: number
}

export interface Order {
  id: string;
  status: string;
  items: OrderItem[];
}