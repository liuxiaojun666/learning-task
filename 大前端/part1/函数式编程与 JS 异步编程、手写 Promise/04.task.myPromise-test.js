const MyPromise = require('./04.task.myPromise')

const p = new MyPromise((resolve, reject) => {
    console.log('1')
    setTimeout(() => {
        resolve('2')
        // reject('3')
    }, 2000)
    // reject('3')
})

// const p1 = p.then(value => {
//     console.log('p1', value)
//     return p1
// }, err => {
//     console.log(err);
// })

// p.then(value => {
//     console.log('p2', value)
// }, err => {
//     console.log(err);
// })

// p1.then(console.log, console.log)

p.then(res => {
    console.log(res)
    return new MyPromise((resolve) => {
        setTimeout(() => {
            console.log('oo');
            // 测试 resolve 一个promise 看会不会等待
            resolve(new MyPromise(r => setTimeout(() => r('ok'), 2000)))
        }, 2000)
    })
}).then(console.log)


