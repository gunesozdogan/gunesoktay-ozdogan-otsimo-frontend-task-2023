import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './menuSlice';
import ingredientReducer from './ingredientsSlice';
import mealReducer from './mealSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        ingredients: ingredientReducer,
        meal: mealReducer,
    },
});

export default store;
