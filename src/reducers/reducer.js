import { createSlice } from '@reduxjs/toolkit';

const orderReducer = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
  },
});

export const { addOrder, removeOrder } = orderReducer.actions;
export default orderReducer.reducer;