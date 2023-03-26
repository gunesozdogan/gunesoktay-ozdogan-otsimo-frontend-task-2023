export const getMenu = async () => {
    const response = await fetch(
        'https://apis.career.otsimo.xyz/api/restaurant/listMeals'
    );
    const data = await response.json();

    return data;
};

export const getIngredients = async () => {
    const response = await fetch(
        'https://apis.career.otsimo.xyz/api/restaurant/listIngredients'
    );
    const data = await response.json();

    return data;
};
