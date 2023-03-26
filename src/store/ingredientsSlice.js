import { createSlice } from '@reduxjs/toolkit';

const initialIngredientsState = {
    all: [],
    isCalculating: true,
    loadedIngredientNum: 0,
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialIngredientsState,
    reducers: {
        set(state, action) {
            state.all = action.payload;
        },
        setCalculating(state, action) {
            state.isCalculating = action.payload;
        },
        setLoadedNum(state, action) {
            state.loadedIngredientNum = action.payload;
        },
        increaseLoadedNum(state) {
            state.loadedIngredientNum++;
        },
    },
});

export const ingredientsActions = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
