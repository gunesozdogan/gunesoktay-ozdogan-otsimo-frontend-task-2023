import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../MenuItem/MenuItem';
import { getMenu } from '../../utilityFunctions/API';
import { menuActions } from '../../store/menuSlice';
import { ingredientsActions } from '../../store/ingredientsSlice';
import { getIngredients } from '../../utilityFunctions/API';
import { getMealInfo } from '../../utilityFunctions/mealFunctions';

import styles from './Menu.module.css';

const Menu = () => {
    const dispatch = useDispatch();
    const mealsState = useSelector((state) => state.menu.meals);
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
        };

        setMenuAndIngredients();
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {mealsState.map((meal) => {
                return <MenuItem meal={meal} key={meal.id} />;
            })}
        </div>
    );
};

export default Menu;
