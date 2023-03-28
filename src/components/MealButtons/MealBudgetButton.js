import styles from './MealBudgetButton.module.css';
import { getMaxQualityByBudget } from '../../utilityFunctions/mealFunctions';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MealBudgetButton = () => {
    const meal = useSelector((state) => state.meal.current);
    const allIngredients = useSelector((state) => state.ingredients.all);

    const clickHandler = () => {
        getMaxQualityByBudget(meal, allIngredients);
    };
    return (
        <>
            <div className={styles.container}>
                <span>$</span>
                <input className={styles.budget} type="text" />
            </div>
            <button onClick={clickHandler}>Best Quality by Budget</button>
        </>
    );
};

export default MealBudgetButton;
