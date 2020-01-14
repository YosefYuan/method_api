// self make
function currying2(fn, ...oldArgs) {
    return function (...args) {
        const length = fn.length;
        args = oldArgs.concat(args);
        if (args.length >= length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return currying2.apply(null, args2.concat(args))
            }
        }
    }
}

const fn2 = (a, b, c) => a + b + c;
fn2.length = 3;
const b = currying2(fn2, 1)(4, 3);
console.log("b", b);