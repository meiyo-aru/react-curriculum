import { configureStore } from '@reduxjs/toolkit';
import SeeMoreReducer from './features/SeeMore/SeeMoreSlice'; 
import ShowMoreReducer from './features/ShowMoreButton/ShowMoreButtonSlice'
import Person from './features/Person/PersonSlice'
export const store = configureStore({
  reducer: {
    SeeMore: SeeMoreReducer, 
    ShowMore: ShowMoreReducer,
    Person: Person
  },
 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;