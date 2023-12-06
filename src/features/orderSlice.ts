import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../types/types";


interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state: { orders: any[] }, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state: { orders: any[] }, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order: { id: any }) => order.id !== action.payload
      );
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
