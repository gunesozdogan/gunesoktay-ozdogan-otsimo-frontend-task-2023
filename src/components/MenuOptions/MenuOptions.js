import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './MenuOptions.module.css';

import nameAscendingIcon from '../../assets/nameAscending.svg';
import nameDescendingIcon from '../../assets/nameDescending.svg';
import priceAscendingIcon from '../../assets/priceAscending.svg';
import priceDescendingIcon from '../../assets/priceDescending.svg';

import { sortMeals } from '../../utilityFunctions/mealFunctions';
import { menuActions } from '../../store/menuSlice';

const MenuOptions = () => {
    const [sortVisible, setSortVisible] = useState(false);
    const [sortDirection, setSortDirection] = useState();
    const [sortType, setSortType] = useState();
    const [filterVisible, setFilterVisible] = useState(false);

    const dispatch = useDispatch();
    const displayedMeals = useSelector((state) => state.menu.displayedMeals);

    const sortOptionClickHandler = () => {
        setSortVisible(!sortVisible);
    };

    const sortSelectionClickHandler = (e) => {
        const [type, direction] = e.target
            .closest('div')
            .getAttribute('data-key')
            .split('-');

        setSortDirection(direction);
        setSortType(type);

        dispatch(
            menuActions.setDisplayedMeals(
                sortMeals(displayedMeals, type, sortDirection)
            )
        );
    };

    const filterOptionClickHandler = () => {
        setFilterVisible(!filterVisible);
    };

    return (
        <div className={styles.container}>
            <div
                className={styles['button-container']}
                onClick={sortOptionClickHandler}
            >
                <button className={styles['sort-button']}>
                    <span>Sort by</span>
                    <svg
                        className={styles.svg}
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" />
                    </svg>
                </button>
                {sortVisible ? (
                    <div className={styles['sort-selection-container']}>
                        <div
                            className={
                                sortType === 'name'
                                    ? `${styles['sort-selection-active']} ${styles['sort-selection']}`
                                    : styles['sort-selection']
                            }
                            onClick={sortSelectionClickHandler}
                            data-key={`name-${
                                sortDirection === 'ascending'
                                    ? 'descending'
                                    : 'ascending'
                            }`}
                        >
                            <span>Name</span>
                            <img
                                src={
                                    sortDirection === 'ascending'
                                        ? nameDescendingIcon
                                        : nameAscendingIcon
                                }
                                alt="ascending-icon"
                            />
                        </div>
                        <div
                            className={
                                sortType === 'low'
                                    ? `${styles['sort-selection-active']} ${styles['sort-selection']}`
                                    : styles['sort-selection']
                            }
                            onClick={sortSelectionClickHandler}
                            data-key={`low-${
                                sortDirection === 'ascending'
                                    ? 'descending'
                                    : 'ascending'
                            }`}
                        >
                            <span>Cheapest Price</span>
                            <img
                                src={
                                    sortDirection === 'ascending'
                                        ? priceDescendingIcon
                                        : priceAscendingIcon
                                }
                                alt="ascending-icon"
                            />
                        </div>
                        <div
                            className={
                                sortType === 'medium'
                                    ? `${styles['sort-selection-active']} ${styles['sort-selection']}`
                                    : styles['sort-selection']
                            }
                            onClick={sortSelectionClickHandler}
                            data-key={`medium-${
                                sortDirection === 'ascending'
                                    ? 'descending'
                                    : 'ascending'
                            }`}
                        >
                            <span>Average Price</span>
                            <img
                                src={
                                    sortDirection === 'ascending'
                                        ? priceDescendingIcon
                                        : priceAscendingIcon
                                }
                                alt="ascending-icon"
                            />
                        </div>
                        <div
                            className={
                                sortType === 'high'
                                    ? `${styles['sort-selection-active']} ${styles['sort-selection']}`
                                    : styles['sort-selection']
                            }
                            onClick={sortSelectionClickHandler}
                            data-key={`high-${
                                sortDirection === 'ascending'
                                    ? 'descending'
                                    : 'ascending'
                            }`}
                        >
                            <span>Highest Price</span>
                            <img
                                src={
                                    sortDirection === 'ascending'
                                        ? priceDescendingIcon
                                        : priceAscendingIcon
                                }
                                alt="ascending-icon"
                            />
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={styles['button-container']}>
                <button
                    className={styles['filter-button']}
                    onClick={filterOptionClickHandler}
                >
                    <span>Filter by</span>
                    <svg
                        className={styles.svg}
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" />
                    </svg>
                </button>
                {filterVisible ? (
                    <div className={styles['filter-selection-container']}>
                        <div
                            className={styles['filter-selection']}
                            onClick={sortSelectionClickHandler}
                        >
                            <span>All</span>
                        </div>
                        <div
                            className={styles['filter-selection']}
                            onClick={sortSelectionClickHandler}
                        >
                            <span>Vegan</span>
                        </div>
                        <div
                            className={styles['filter-selection']}
                            onClick={sortSelectionClickHandler}
                        >
                            <span>Vegetarian</span>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default MenuOptions;
