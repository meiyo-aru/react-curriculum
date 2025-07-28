import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PersonSliceState {
    personId: number | null
}

const initialState: PersonSliceState = {
    personId: null
}

export const PersonSlice = createSlice({
    name: "Person",
    initialState,
    reducers: {
        setPerson:(state, action: PayloadAction<{personId: number}>) => {
            state.personId = action.payload.personId
        }
    }
})


export const { setPerson } = PersonSlice.actions;

export default PersonSlice.reducer;