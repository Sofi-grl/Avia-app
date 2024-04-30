import { configureStore } from '@reduxjs/toolkit';
import flightDataReducer from './flightDataSlice';

const store = configureStore({
  reducer: {
    flightData: flightDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
