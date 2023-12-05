import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../reducers/order';  

const store = configureStore({
  reducer: {
    orders: orderReducer,
  },

});

export default store;