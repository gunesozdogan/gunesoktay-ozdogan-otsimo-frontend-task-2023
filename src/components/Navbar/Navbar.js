import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Meals Spot</h1>
            <div className={styles.navbar}>
                <Link to="/" className={styles.navlink}>
                    Home
                </Link>
                <Link to="/menu" className={styles.navlink}>
                    Menu
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
