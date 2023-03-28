import MealInfo from '../components/MealInfo/MealInfo';
import Navbar from '../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

const MealPage = () => {
    const params = useParams();

    return (
        <div className="outer-container">
            <Navbar />
            <MealInfo id={params.mealID} />
        </div>
    );
};

export default MealPage;
