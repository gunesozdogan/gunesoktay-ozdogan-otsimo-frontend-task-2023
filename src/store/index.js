import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './menuSlice';
import ingredientReducer from './ingredientsSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
        ingredients: ingredientReducer,
    },
});

export default store;
