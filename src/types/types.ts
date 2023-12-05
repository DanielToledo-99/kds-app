export interface RootState {
  orders: {
    orders: {
      completed: any;
      id: string;
      items: string[];
    }[];
  };
}
