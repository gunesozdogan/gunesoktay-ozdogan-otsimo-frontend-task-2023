import { createSlice } from '@reduxjs/toolkit';

const initialMenuState = {
    meals: [],
    mealsInfo: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState: initialMenuState,
    reducers: {
        set(state, action) {
            state.meals = action.payload;
        },
        setInfo(state, action) {
            state.mealsInfo = action.payload;
        },
    },
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;
