import Navbar from '../components/Navbar/Navbar';
import Menu from '../components/Menu/Menu';

const MenuPage = ({ menu }) => {
    return (
        <div className="outer-container">
            <Navbar />
            <Menu menu={menu} />
        </div>
    );
};

export default MenuPage;
