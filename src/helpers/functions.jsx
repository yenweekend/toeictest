function roundUpToMultipleOfFour(number) {
    return number % 4 === 0 ? number : number + (4 - (number % 4)); 
}
export { roundUpToMultipleOfFour}