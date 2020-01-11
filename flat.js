var arr = [1, 2, [3, 4, [5, 6]]]

// method 1
function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) : arr.slice();
};

// method 2
function flatten(input) {
    const stack = [...input];
    const res = [];
    while (stack.length) {
        // pop value from stack
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    return res.reverse();
}

// method 3
function* flatten(array, depth) {
    if (depth === undefined) depth = 1;
    for (const item of array) {
        if (Array.isArray(item)) {
            yield* flatten(item, depth - 1);
        } else {
            yield* item;
        }
    }
}
var arr = [1, 2, [3, 4, [5, 6]]];
const flattened = [...flatten(arr, Infinity)];

console.log(flatDeep(arr, 1)); //Infinity
console.log(flatten(arr));
console.log(flattened);