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

        if (!ingredientInfo[0].groups) {
            ingredientGroups.push(...['non-vegan', 'non-vegetarian']);
        } else if (!ingredientInfo[0].groups.includes('vegan')) {
            ingredientGroups.push('non-vegan');
        }

        const ingredientOptions = ingredientInfo[0].options;

        ingredientOptions.forEach((option) => {
            const plus =
                option.quality === 'low'
                    ? 0.1
                    : option.quality === 'medium'
                    ? 0.05
                    : 0;

            prices[option.quality] +=
                (option.price * ingredient.quantity) / 1000 + plus;
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
    if (parameter === 'vegan') {
        return menu.filter((meal) => !meal.info.groups.includes('non-vegan'));
    } else if (parameter === 'vegetarian') {
        return menu.filter(
            (meal) => !meal.info.groups.includes('non-vegetarian')
        );
    }
};

export const getMealByID = (menu, id) => {
    return menu.filter((meal) => Number(meal.id) === Number(id));
};

export const calculatePrice = (selections) => {
    const selectionsArray = Object.entries(selections);
    let priceSum = 0;
    let scoreSum = 0;

    selectionsArray.forEach((ingredientInfo) => {
        const ingredient = ingredientInfo[1];
        const quantity = ingredient.quantity;
        let quality = Number(ingredient.quality);
        let price = (Number(ingredient.price) * quantity) / 1000;

        price =
            quality === 30
                ? price
                : quality === 20
                ? price + 0.05
                : price + 0.1;

        priceSum += price;
        scoreSum = scoreSum + quality / selectionsArray.length;
    });

    return [priceSum, scoreSum];
};

export const getQualityPriceVersion = (parameter, meal, allIngredients) => {
    const ingredientIndex = parameter === 'high' ? 0 : 2;
    const ingredients = meal.ingredients;
    const classes = [];
    const allSelectedIngredients = [];

    ingredients.forEach((ingredient, index) => {
        const quantity = ingredient.quantity;
        const info = getIngredientInfo(ingredient.name, allIngredients)[0]
            .options[ingredientIndex];
        const quality =
            info.quality === 'low' ? 1 : info.quality === 'medium' ? 2 : 3;
        const className = `${index}_${ingredient.name}_${info.name}_${info.price}_${quality}_${quantity}`;
        const selectedIngredient = {
            name: ingredient.name,
            selection: {
                name: info.name,
                price: info.price,
                quality: Number(quality) * 10,
                quantity: Number(quantity),
            },
        };
        classes.push(className);
        allSelectedIngredients.push(selectedIngredient);
    });

    return [classes, allSelectedIngredients];
};
