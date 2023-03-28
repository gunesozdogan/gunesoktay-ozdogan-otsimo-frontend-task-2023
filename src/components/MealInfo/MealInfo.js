import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import MealButtons from '../MealButtons/MealButtons';
import {
    getIngredientInfo,
    calculatePrice,
    getMealByID,
} from '../../utilityFunctions/mealFunctions';
import { mealActions } from '../../store/mealSlice';
import toTitleCase from '../../utilityFunctions/helperFunctions';

import styles from './MealInfo.module.css';

const MealInfo = ({ id }) => {
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu.meals);
    const allIngredients = useSelector((state) => state.ingredients.all);
    const selectedIngredients = useSelector(
        (state) => state.meal.selectedIngredients
    );
    const mealPrice = useSelector((state) => state.meal.price);
    const mealQualityScore = useSelector((state) => state.meal.qualityScore);
    const mealInfo = getMealByID(menu, id)[0];
    const ingredientInfo = [];
    const { name, info, ingredients } = mealInfo;

    ingredients.forEach((ingredient) => {
        ingredientInfo.push(
            ...getIngredientInfo(ingredient.name, allIngredients)
        );
    });

    useEffect(() => {
        dispatch(mealActions.setCurrent(mealInfo));
        dispatch(mealActions.setPrice(0));
        dispatch(mealActions.setQualityScore(0));
        dispatch(mealActions.resetSelectedIngredient());
    }, [dispatch]);

    const ingredientSelectionHandler = (e) => {
        const selectedElement = e.target.closest('div');
        const className = selectedElement.className.split(' ')[1];
        const [
            ingredientIndex,
            ingredientName,
            selectionName,
            price,
            quality,
            quantity,
        ] = selectedElement.getAttribute('data-key').split('_');

        document
            .querySelectorAll('.' + className)
            .forEach((element) => element.classList.remove('selected'));

        selectedElement.classList.add('selected');

        dispatch(
            mealActions.addSelectedIngredient({
                name: ingredientName,
                selection: {
                    name: selectionName,
                    price: Number(price),
                    quality: quality * 10,
                    quantity: Number(quantity),
                },
            })
        );
    };

    useEffect(() => {
        if (Object.keys(selectedIngredients).length === ingredients.length) {
            dispatch(
                mealActions.setPrice(calculatePrice(selectedIngredients)[0])
            );
            dispatch(
                mealActions.setQualityScore(
                    calculatePrice(selectedIngredients)[1]
                )
            );
        }
    }, [selectedIngredients, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles['upper-container']}>
                <h4 className={styles['meal-name']}>{toTitleCase(name)}</h4>
                <div className={styles['meal-quality-price']}>
                    <div className={styles['quality-score-container']}>
                        <span className={styles['quality-score-text']}>
                            Quality Score:
                        </span>
                        <span className={styles['quality-score-value']}>
                            {mealQualityScore.toFixed(1)}{' '}
                        </span>
                    </div>
                    <div className={styles['price-container']}>
                        <span className={styles['price-text']}>Price:</span>
                        <span className={styles['price-value']}>
                            {'$' + mealPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
                <MealButtons meal={mealInfo} />
            </div>
            <div className={styles['lower-container']}>
                <div className={styles['ingredients-header-container']}>
                    <span>Ingredients</span>
                </div>

                <div className={styles['ingredients-container']}>
                    {ingredientInfo.map((ingredient, infoIndex) => {
                        const { name, options } = ingredient;
                        const quantity = info.ingredients[infoIndex].quantity;
                        const quantity_type =
                            info.ingredients[infoIndex].quantity_type;

                        return (
                            <div
                                key={infoIndex}
                                className={styles['ingredient-container']}
                            >
                                <div className={styles['ingredient-name']}>
                                    <span>{`${name} `}</span>
                                    <span>{`(${quantity} ${quantity_type}s)`}</span>
                                </div>

                                {options.map((option, index) => {
                                    return (
                                        <div
                                            onClick={ingredientSelectionHandler}
                                            key={option.name}
                                            data-key={`${infoIndex}_${name}_${
                                                option.name
                                            }_${option.price}_${
                                                3 - index
                                            }_${quantity}`}
                                            className={`${
                                                styles[
                                                    'ingredient-quality-selection'
                                                ]
                                            } ${`ingredient-quality-selection-${
                                                infoIndex + 1
                                            }`}`}
                                        >
                                            <span
                                                className={
                                                    styles[
                                                        'ingredient-quality-name'
                                                    ]
                                                }
                                            >
                                                {option.name}
                                            </span>
                                            <span
                                                className={
                                                    styles[
                                                        'ingredient-quality-price'
                                                    ]
                                                }
                                            >
                                                {'$' + option.price.toFixed(2)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MealInfo;
