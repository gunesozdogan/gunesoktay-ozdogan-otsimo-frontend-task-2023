import { createSlice } from '@reduxjs/toolkit';

const initialMealState = {
    current: [],
    selectedIngredients: {},
    price: 0,
    qualityScore: 0,
};

const mealSlice = createSlice({
    name: 'meal',
    initialState: initialMealState,
    reducers: {
        setCurrent(state, action) {
            state.current = action.payload;
        },
        addSelectedIngredient(state, action) {
            state.selectedIngredients[action.payload.name] =
                action.payload.selection;
        },
        resetSelectedIngredient(state) {
            state.selectedIngredients = {};
        },
        setPrice(state, action) {
            state.price = action.payload;
        },
        setQualityScore(state, action) {
            state.qualityScore = action.payload;
        },
    },
});

export const mealActions = mealSlice.actions;

export default mealSlice.reducer;
