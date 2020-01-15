function curry(fn) {
    var limit = fn.length
    return function currying(...args) {
        if (args.length >= limit) {
            return fn.apply(null, args)
        } else {
            return function (...args2) {
                return currying.apply(null, args.concat(args2))
            }
        }
    }
}

const fn = (a, b, c) => a + b + c;
const b = curry(fn)(1)(2)(3);
console.log("b", b);