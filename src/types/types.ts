export interface RootState {
  orders: {
    orders: {
      status: any;
      id: string;
      items: string[];
    }[];
  };
}
