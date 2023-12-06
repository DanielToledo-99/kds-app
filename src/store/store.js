
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/orderSlice';

const rootReducer = combineReducers({
  orders: orderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;