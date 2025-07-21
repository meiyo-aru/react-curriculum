// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import SeeMoreReducer from './features/SeeMore/SeeMoreSlice'; 
export const store = configureStore({
  reducer: {
    SeeMore: SeeMoreReducer, // Adiciona o reducer do contador ao store
  },
 
});

// Opcional: Inferir os tipos `RootState` e `AppDispatch` a partir do store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;