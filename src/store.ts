import { configureStore } from '@reduxjs/toolkit';
import SeeMoreReducer from './features/SeeMore/SeeMoreSlice'; 
import ShowMoreReducer from './features/ShowMoreButton/ShowMoreButtonSlice'

export const store = configureStore({
  reducer: {
    SeeMore: SeeMoreReducer, 
    ShowMore: ShowMoreReducer
  },
 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;