if (!Promise.wrap) {
    Promise.wrap = function (fn) {
        return function () {
            var args = [].slice.call(arguments);
            return new Promise(function (resolve, reject) {
                fn.apply(null, args.concat(function (err, v) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(v);
                    }
                }))
            })
        }
    }
}

function test(data,cb) {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            cb("err message");
        } else {
            cb(null, "ok");
        }
    }, 2000);
};

Promise.wrap(test)().then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});