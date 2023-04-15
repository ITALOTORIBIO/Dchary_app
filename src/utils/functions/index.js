import cryptoRandomString from 'crypto-random-string';

export const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
};

export const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
};

export const union = (a, b) => {
    return [...a, ...not(b, a)];
};

export const generateRandomString = () => {
    const wordRandom = cryptoRandomString({ length: 18, type: 'alphanumeric' });
    return wordRandom;
};
