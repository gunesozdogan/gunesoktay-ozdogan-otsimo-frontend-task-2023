export const getMenu = async () => {
    try {
        const response = await fetch(
            'https://apis.career.otsimo.xyz/api/restaurant/listMeals'
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getIngredients = async () => {
    try {
        const response = await fetch(
            'https://apis.career.otsimo.xyz/api/restaurant/listIngredients'
        );
        const data = await response.json();

        return data;
    } catch (error) {
        debugger;
        console.log(error);
    }
};
