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
            : ingredientGroups.push('Normal');

        const ingredientOptions = ingredientInfo[0].options;

        ingredientOptions.forEach((option) => {
            prices[option.quality] +=
                (option.price * ingredient.quantity) / 1000;
        });
    });

    return [prices, [...new Set(ingredientGroups)]];
};
