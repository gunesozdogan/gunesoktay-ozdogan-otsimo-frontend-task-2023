import { Routes, Route } from 'react-router-dom';

import './App.css';
import MenuPage from './pages/MenuPage';
import WelcomePage from './pages/WelcomePage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/menu" element={<MenuPage />}></Route>
            <Route></Route>
        </Routes>
    );
};

export default App;
