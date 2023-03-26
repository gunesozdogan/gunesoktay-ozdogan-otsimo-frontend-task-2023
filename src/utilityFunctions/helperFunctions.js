const toTitleCase = (string) => {
    const ignore = [
        'with',
        'and',
        'the',
        'a',
        'an',
        'for',
        'to',
        'but',
        'at',
        'by',
    ];
    const words = string.split(' ');

    string = words
        .map((word, index) =>
            ignore.includes(word) && index
                ? word
                : word[0].toUpperCase() + word.slice(1)
        )
        .join(' ');

    return string;
};

export default toTitleCase;
