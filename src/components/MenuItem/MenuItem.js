import { Link } from 'react-router-dom';

import styles from './MenuItem.module.css';
import toTitleCase from '../../utilityFunctions/helperFunctions';
import { useSelector } from 'react-redux';

const MenuItem = (props) => {
    const { name, ingredients, id } = props.meal;
    const mealInfo = useSelector((state) => state.menu.mealsInfo);
    const lowPrice = mealInfo[id].low;
    const highPrice = mealInfo[id].high;

    return (
        <Link to={`/meal/${id}`} className={styles.container}>
            <div className={styles['container-left']}>
                <h4 className={styles.name}>{toTitleCase(name)}</h4>
                <ul className={styles['ingredients-container']}>
                    {ingredients.map((ingredient, index) => {
                        return (
                            <li
                                className={styles['ingredient-container']}
                                key={index}
                            >
                                <span className={styles['ingredient-name']}>
                                    {ingredient.name}
                                </span>
                                <span
                                    className={styles['ingredient-quantity']}
                                >{`(${ingredient.quantity} ${ingredient.quantity_type}s)`}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={styles['price-container']}>
                <span className={styles.price}>{`$${lowPrice.toFixed(
                    2
                )} - $${highPrice.toFixed(2)}`}</span>
            </div>
        </Link>
    );
};

export default MenuItem;
