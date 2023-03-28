import MenuItem from '../MenuItem/MenuItem';
import MenuOptions from '../MenuOptions/MenuOptions';

import styles from './Menu.module.css';

const Menu = ({ menu }) => {
    return (
        <div className={styles.container}>
            <MenuOptions />
            <div className={styles['inner-container']}>
                {menu.map((meal) => {
                    return <MenuItem meal={meal} key={meal.id} />;
                })}
            </div>
        </div>
    );
};

export default Menu;
