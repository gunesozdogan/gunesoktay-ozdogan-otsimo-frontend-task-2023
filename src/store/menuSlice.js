import { createSlice } from '@reduxjs/toolkit';

const initialMenuState = {
    meals: [],
    mealsInfo: [],
    displayedMeals: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState: initialMenuState,
    reducers: {
        set(state, action) {
            state.meals = action.payload;
            state.displayedMeals = action.payload;
        },
        setInfo(state, action) {
            state.mealsInfo = action.payload;
        },
        setDisplayedMeals(state, action) {
            state.displayedMeals = action.payload;
        },
        getCalculatedMealPrices(state, action) {
            const copyMeals = [...state.meals];

            copyMeals.forEach((meal) => {
                meal.info = action.payload[meal.id];
            });

            state.meals = copyMeals;
            state.displayedMeals = copyMeals;
        },
    },
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;
