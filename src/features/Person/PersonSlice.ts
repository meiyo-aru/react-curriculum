import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Person } from "../../types/Person"

interface PersonSliceState {
    person: Person | null
}

const initialState: PersonSliceState = {
    person: null
}

export const PersonSlice = createSlice({
    name: "Person",
    initialState,
    reducers: {
        setPerson:(state, action: PayloadAction<PersonSliceState>) => {
            state.person = action.payload.person
        }
    }
})


export const { setPerson } = PersonSlice.actions;

export default PersonSlice.reducer;