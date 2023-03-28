import styles from './MealButtons.module.css';
import { getQualityPriceVersion } from '../../utilityFunctions/mealFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { mealActions } from '../../store/mealSlice';

const MealButtons = ({ meal }) => {
    const dispatch = useDispatch();
    const [buttonTypeState, setButtonTypeState] = useState();
    const [buttonClicked, setButtonClicked] = useState(false);
    const allIngredients = useSelector((state) => state.ingredients.all);

    const buttonHandler = (e) => {
        const buttonType = e.target.getAttribute('data-key');
        let clickType;
        if (buttonTypeState === buttonType) {
            clickType = false;
            setButtonTypeState();
            setButtonClicked(clickType);
        } else {
            clickType = true;
            setButtonTypeState(buttonType);
            setButtonClicked(clickType);
        }

        const [classes, allSelectedIngredients] = getQualityPriceVersion(
            buttonType,
            meal,
            allIngredients
        );

        document
            .querySelectorAll('.selected')
            .forEach((node) => node.classList.remove('selected'));

        if (clickType) {
            classes.forEach((className) => {
                document
                    .querySelector(`div[data-key="${className}"]`)
                    .classList.add('selected');
            });

            allSelectedIngredients.forEach((ingredient) => {
                dispatch(mealActions.addSelectedIngredient(ingredient));
            });
        } else {
            dispatch(mealActions.resetSelectedIngredient());
            dispatch(mealActions.setPrice(0));
            dispatch(mealActions.setQualityScore(0));
        }
    };

    return (
        <div className={styles['button-container']}>
            <div className={styles['upper-button-container']}>
                <button
                    onClick={buttonHandler}
                    className={
                        buttonClicked && buttonTypeState === 'high'
                            ? `${styles.active} ${styles['quality-button']}`
                            : `${styles['quality-button']}`
                    }
                    data-key={'high'}
                >
                    Highest Quality and Price
                </button>
                <button
                    onClick={buttonHandler}
                    data-key={'low'}
                    className={
                        buttonClicked && buttonTypeState === 'low'
                            ? `${styles.active} ${styles['price-button']}`
                            : `${styles['price-button']}`
                    }
                >
                    Lowest Quality and Price
                </button>
            </div>
        </div>
    );
};

export default MealButtons;
