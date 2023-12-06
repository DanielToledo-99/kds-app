// Ejemplo de configuración básica de la tienda
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from '../features/orderSlice';

const rootReducer = combineReducers({
  orders: orderReducer,
  // Otros reductores si los tienes
});

const store = configureStore({
  reducer: rootReducer,
  // Otras configuraciones de la tienda si las tienes
});

export default store;