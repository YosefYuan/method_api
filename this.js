// 源自
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

// Part1
// just in broswer
// console.log('globalThis', globalThis); 
// --------------------

// Part2
function f1() {
    return this;
}
console.log("In Node", f1() === global);
console.log("In a browser:", f1() === window);
// --------------------

// Part3
// Note that in non–strict mode, with call and apply, if the value passed as this is not an object, an attempt will be made to 
// CONVERT it to an object
// using the internal ToObject operation. So if the value passed is a primitive like 7 or 'foo', it will be converted to an Object using the related constructor, so the primitive number 7 is converted to an object as if by new Number(7) and the string 'foo' to an object as if by new String('foo'), e.g.

function bar() {
    console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]
bar.call('foo'); // [object String]
// --------------------

// Part4
// ECMAScript 5 introduced Function.prototype.bind(). Calling f.bind(someObject) creates a new function with the same body and scope as f, but where this occurs in the original function, in the new function it is 
// permanently bound to the FIRST argument of bind, 
// regardless of how the function is being used.

function f() {
    return this.a;
}

var g = f.bind({
    a: 'azerty'
});
console.log(g()); // azerty

var h = g.bind({
    a: 'yoo'
}); // bind only works once!
console.log(h()); // azerty

var o = {
    a: 37,
    f: f,
    g: g,
    h: h
};
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty
// --------------------

// Part5
// In arrow functions, this retains the value of the enclosing lexical context's this. 
// In GLOBAL code, it will be set to the GLOBAL object:

var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true

// Note: if this arg is passed to call, bind, or apply on invocation of an arrow function it will be 
// IGNORED. 
// You can still prepend arguments to the call, but the FIRST argument (thisArg) should be set to NULL.

// Call as a method of an object
var obj = {
    func: foo
};
console.log(obj.func() === globalObject); // true

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind
foo = foo.bind(obj);
console.log(foo() === globalObject); // true

// No matter what, foo's this is set to what it was 
// when it was CREATED (in the example above, the global object). 
// The same applies to arrow functions CREATED inside other functions: their this remains that of the enclosing lexical context.


// Create obj with a method bar that returns a function that
// returns its this. The returned function is created as 
// an arrow function, so its this is permanently bound to the
// this of its enclosing function. The value of bar can be set
// in the call, which in turn sets the value of the 
// returned function.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var obj = {
    bar: function () {
        var x = (() => this);
        return x;
    }
};

// Call bar as a method of obj, setting its this to obj
// Assign a reference to the returned function to fn
var fn = obj.bar();

// Call fn without setting this, would normally default
// to the global object or undefined in strict mode
console.log(fn() === obj); // true

// But caution if you reference the method of obj without calling it
var fn2 = obj.bar;
// Calling the arrow function's this from inside the bar method()
// will now return window, because it follows the this from fn2.
console.log(fn2()() == window); // true

// In the above, the function (call it anonymous function A) assigned to obj.bar returns another function (call it anonymous function B) that is created as an arrow function. As a result, function B's  this is permanently set to the this of obj.bar (function A) when called. When the returned function (function B) is called, its this will always be what it was set to initially. In the above code example, function B's this is set to function A's this which is obj, so it remains set to obj even when called in a manner that would normally set its this to undefined or the global object (or any other method as in the previous example in the global execution context).
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// --------------------

// Part 6

// When a function is called as a method of an object, its this is set to the object the method is called on.
// In the following example, when o.f() is invoked, inside the function this is bound to the o object.

var o = {
    prop: 37,
    f: function () {
        return this.prop;
    }
};

console.log(o.f()); // 37

//   Note that this behavior is not at all affected by how or where the function was defined. In the previous example, we defined the function inline as the f member during the definition of o. However, we could have just as easily defined the function first and later attached it to o.f. Doing so results in the same behavior:
var o = {
    prop: 37
};

function independent() {
    return this.prop;
}

o.f = independent;

console.log(o.f()); // 37

// This demonstrates that it matters only that the function was invoked from the f member of o.

// Similarly, the this binding is only affected by the most IMMEDIATE member reference. In the following example, when we invoke the function, we call it as a method g of the object o.b. This time during execution, this inside the function will refer to o.b. The fact that the object is itself a member of o has no consequence; the most 
// IMMEDIATE 
// reference is all that matters.

o.b = {
    g: independent,
    prop: 42
};
console.log(o.b.g()); // 42


// Part 7
// In an inline event handler
// When the code is called from an inline on-event handler, its this is set to the DOM element on which the listener is placed:

// CHECK IT IN "thisInDOM.html"

// only the outer code has its this set this way:

// the inner function's this isn't set so it returns the global/window object (i.e. the default object in non–strict mode where this isn't set by the call).