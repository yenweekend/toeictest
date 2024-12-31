function roundUpToMultipleOfFour(number) {
    return number % 4 === 0 ? number : number + (4 - (number % 4)); 
}
export { roundUpToMultipleOfFour}
export const getFirstAndLastInitials = (fullName) => {
        const words = fullName.split(' ');
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
