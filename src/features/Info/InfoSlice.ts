import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface InfoSliceState {
    infoFocused: number | null,
    componentId?: string | null
}

const initialState: InfoSliceState = {
    infoFocused: null,
    componentId: null
}

export const InfoSlice = createSlice({
    name: "Info",
    initialState,
    reducers: {
        setFocusedInfo:(state, action: PayloadAction<InfoSliceState>) => {
            state.infoFocused = action.payload.infoFocused
            state.componentId = action.payload.componentId
        }
    }   
})

export  const { setFocusedInfo } = InfoSlice.actions;

export default InfoSlice.reducer;