var a = 1;
var b = 2;

function* foo() {
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}

function* bar() {
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}

function step(gen) {
    var it = gen();
    var last;
    return function () {
        // 不管yield出来的是什么，下一次都把它原样传回去！
        last = it.next(last).value;
    };
}


var s1 = step(foo);
var s2 = step(bar);

// 首次运行*foo()
s1();
console.log("a", a, "b", b);
s1();
console.log("a", a, "b", b);
s1();
console.log("a", a, "b", b);


// 首次运行*bar()
s2();
console.log("a", a, "b", b);
s2();
console.log("a", a, "b", b);
s2();
console.log("a", a, "b", b);
s2();
console.log("a", a, "b", b);