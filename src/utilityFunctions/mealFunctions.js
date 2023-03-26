export const getIngredientInfo = (ingredientName, allIngredients) => {
    return allIngredients.filter(
        (currentIngredient) => currentIngredient.name === ingredientName
    );
};

export const getMealInfo = (meal, allIngredients) => {
    const prices = {
        low: 0,
        medium: 0,
        high: 0,
    };
    const ingredientGroups = [];

    meal.ingredients.forEach((ingredient) => {
        const ingredientInfo = getIngredientInfo(
            ingredient.name,
            allIngredients
        );

        ingredientInfo[0].groups
            ? ingredientGroups.push(...ingredientInfo[0].groups)
            : ingredientGroups.push('meat');

        const ingredientOptions = ingredientInfo[0].options;

        ingredientOptions.forEach((option) => {
            prices[option.quality] +=
                (option.price * ingredient.quantity) / 1000;
        });
    });

    return [prices, [...new Set(ingredientGroups)]];
};

export const sortMeals = (menu, sortType, sortDirection) => {
    const menuCopy = [...menu];

    if (sortType === 'name') {
        if (sortDirection === 'ascending') {
            menuCopy.sort((a, b) =>
                a.name > b.name ? -1 : b.name > a.name ? 1 : 0
            );
        } else {
            menuCopy.sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            );
        }
    } else {
        if (sortDirection === 'ascending') {
            menuCopy.sort((a, b) => b.info[sortType] - a.info[sortType]);
        } else {
            menuCopy.sort((a, b) => a.info[sortType] - b.info[sortType]);
        }
    }

    return menuCopy;
};

export const filterMeals = (menu, parameter) => {
    return menu.filter(
        (meal) =>
            !meal.info.groups.includes('meat') &&
            meal.info.groups.includes(parameter)
    );
};
