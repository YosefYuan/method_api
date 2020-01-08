function sumSquare(...arguments) {
    let sum = 0;
    sum = arguments.reduce((accumulator, currentValue) => {
        return accumulator + currentValue * currentValue
    }, 0)
    return sum;
}

const test = sumSquare(1, 3, 4, 6, 8);
console.log(test)