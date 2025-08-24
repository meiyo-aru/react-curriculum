import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SeeMoreState {
    componentId: string | null
    seeMoreId: number | null;
}

const initialState: SeeMoreState = {
    componentId: null,
    seeMoreId: null
};

// Slice to manage the state of "see more" buttons across the application
export const SeeMoreSlice = createSlice({
    name: 'SeeMore', 
    initialState,    
    reducers: {   
        setSeeMoreClicked: (state, action: PayloadAction<{seeMoreId: number; componentId: string}>) => {
            if (state.seeMoreId === action.payload.seeMoreId  && state.componentId === action.payload.componentId) {
                state.seeMoreId =  null 
                state.componentId = null
            } else {
                state.componentId = action.payload.componentId;
                state.seeMoreId =  action.payload.seeMoreId
            }
        }
    },
});

export const { setSeeMoreClicked } = SeeMoreSlice.actions;

export default SeeMoreSlice.reducer;