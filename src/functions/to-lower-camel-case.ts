export const toLowerCamelCase = (string: string) => {
    const upperCamelCase = string
        .split('-')
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join('');

    return upperCamelCase[0].toLowerCase() + upperCamelCase.slice(1);
};