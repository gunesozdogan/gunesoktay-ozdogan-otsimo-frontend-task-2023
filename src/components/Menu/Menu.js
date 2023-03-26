import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '../MenuItem/MenuItem';
import MenuOptions from '../MenuOptions/MenuOptions';

import { getMenu } from '../../utilityFunctions/API';
import { menuActions } from '../../store/menuSlice';
import { ingredientsActions } from '../../store/ingredientsSlice';
import { getIngredients } from '../../utilityFunctions/API';
import { getMealInfo } from '../../utilityFunctions/mealFunctions';

import styles from './Menu.module.css';

const Menu = () => {
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

    return (
        <div className={styles.container}>
            <MenuOptions />
            <div className={styles['inner-container']}>
                {displayedMenu.map((meal) => {
                    return (
                        <MenuItem
                            meal={meal}
                            key={meal.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Menu;
