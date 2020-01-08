if (!Promise.wrap) {
    Promise.wrap = function (fn) {
        return function () {
            const args = [].slice.call(arguments);
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                }))
            })
        }
    }
}

function test(data, cb) {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            cb("err message");
        } else {
            cb(null, data);
        }
    }, 2000);
};

Promise.wrap(test)(666).then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});