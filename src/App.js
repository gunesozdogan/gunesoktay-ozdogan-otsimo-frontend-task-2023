import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getMenu, getIngredients } from './utilityFunctions/API';
import { getMealInfo } from './utilityFunctions/mealFunctions';
import { menuActions } from './store/menuSlice';
import { ingredientsActions } from './store/ingredientsSlice';

import './App.css';

import MenuPage from './pages/MenuPage';
import WelcomePage from './pages/WelcomePage';
import MealPage from './pages/MealPage';

const App = () => {
    const dispatch = useDispatch();
    const displayedMenu = useSelector((state) => state.menu.displayedMeals);
    const mealInfo = {};

    useEffect(() => {
        const setMenuAndIngredients = async () => {
            const menu = await getMenu();
            const allIngredients = await getIngredients();

            dispatch(menuActions.set(menu));
            dispatch(ingredientsActions.set(allIngredients));

            menu.forEach((meal) => {
                const mealID = meal.id;

                [mealInfo[mealID], mealInfo[mealID].groups] = getMealInfo(
                    meal,
                    allIngredients
                );
                mealInfo[mealID].name = meal.name;
                mealInfo[mealID].ingredients = meal.ingredients;
            });

            dispatch(menuActions.setInfo(mealInfo));
            dispatch(menuActions.getCalculatedMealPrices(mealInfo));
        };

        setMenuAndIngredients();
    }, [dispatch]);

    return displayedMenu.length ? (
        <Routes>
            <Route
                path="/"
                element={<WelcomePage />}
            ></Route>
            <Route
                path="/menu"
                element={<MenuPage menu={displayedMenu} />}
            ></Route>
            <Route
                path="/meal/:mealID"
                element={<MealPage />}
            ></Route>
        </Routes>
    ) : (
        ''
    );
};

export default App;
