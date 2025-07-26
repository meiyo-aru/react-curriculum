import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ShowMoreState {
    componentId: string | null
}

const initialState: ShowMoreState = {
    componentId: null,
};

export const ShowMoreSlice = createSlice({
    name: "ShowMore",
    initialState,
    reducers: {
           setShowMoreClicked: (state, action: PayloadAction<{componentId: string}>) => {
            if (state.componentId === action.payload.componentId) {
                state.componentId = null
            } else {
                state.componentId = action.payload.componentId;
            }
        }
    }
});

export const { setShowMoreClicked } = ShowMoreSlice.actions;

export default ShowMoreSlice.reducer;