![作业题](https://s0.lgstatic.com/i/image/M00/1F/4B/CgqCHl7m3iuAC31fAC18FIagZlY698.png)

### 简答题

#### 一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务？

JS是单线程的，在处理执行任务的时候，同时只能执行一个任务。JS异步可以在遇到异步API代码时，发起一个异步调用（交给Web APIs处理，js是单线程，但运行环境web浏览器是多线程的），直接进入下一个任务。然后在回调函数或者事件监听触发时在处理后续逻辑。同步执行还是异步执行不是写代码的方式，而是运行环境提供的API是同步工作还是异步工作。

EventLoop 用来监听调用栈与消息队列，当调用栈为空时，就会依次执行消息队列里的回调函数。

消息队列存放的就像是异步执行的回调函数，在异步任务完成后讲回调函数插入消息队列，排队等候执行。

JS中宏任务是消息队列中的回调，排队等待执行。微任务放在当前宏任务执行完后立即执行的微任务队列。微任务比宏任务优先执行。JS中宏任务有，setTimeout setInterval，微任务有process.nextTick、Promise.resolve、MutationObserver、queueMicrotask

### 代码题

一、将下面异步代码使用Promise的方式改进
``` js
setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
        var b = 'lagou'
        setTimeout(function () {
            var c = 'I ❤ U'
            console.log(a + b + c)
        }, 10)
    }, 10)
}, 10)
```

答：
``` js
(async function () {
    let a = await new Promise((resolve, reject) => setTimeout(() => resolve('hello'), 10))
    let b = await new Promise((resolve, reject) => setTimeout(() => resolve('lagou'), 10))
    let c = await new Promise((resolve, reject) => setTimeout(() => resolve('I ❤ U'), 10))
    console.log(a + b + c)
})()
```

二、基于以下代码完成下面的四个练习。

``` js
const fp = require('lodash/fp')

const cars = [
    {name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: 'Spyker C12 Zagato', horsepower: 610, dollar_value: 40000, in_stock: true},
    {name: 'Jaguar XKR-S', horsepower: 560, dollar_value: 70000, in_stock: true},
    {name: 'Audi R8', horsepower: 2660, dollar_value: 502000, in_stock: true},
    {name: 'Aston Martin One-77', horsepower: 60, dollar_value: 7000, in_stock: true},
    {name: 'Pagani Huayra', horsepower: 960, dollar_value: 3000, in_stock: true},
]
```
练习1：使用函数组合 fp.flowRight() 重新实现下面这个函数
``` js
let isLastInstock = function (cars) {
    let last_car = fp.last(cars)
    return fp.prop('in_stock', last_car)
}
```
答：
``` js
let isLastInstock = function (cars) {
    // let last_car = fp.last(cars)
    // return fp.prop('in_stock', last_car)
    return fp.flowRight(fp.prop('in_stock'), fp.last)(cars)
}

console.log('练习1：', isLastInstock(cars))
```

练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name 
``` js

console.log('练习2：', fp.flowRight(fp.prop('name'), fp.first)(cars))
```

练习3：使用帮助函数 _average 重构 averageDollarValue, 使用函数组合的方式实现
``` js
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
        return car.dollar_value
    }, cars)

    return _average(dollar_values)
}
```

答：
``` js
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = function (cars) {
    return fp.flowRight(_average, fp.map(car => car.dollar_value))(cars)
    // return fp.flowRight(fp.reduce(fp.add, 0), fp.map(car => car.dollar_value))(cars) / cars.length
}

console.log('练习3：', averageDollarValue(cars))
```

练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线链接的小写字符串，把数组中的name 转换为这种形式：例如： sanitizeNames(['Hello World']) => ["hello world"]
``` js
let _underscore = fp.replace(/\W+/g, '_')
```
答：
``` js
let _underscore = fp.replace(/\W+/g, '_')

function sanitizeNames(names) {
    return fp.map(fp.flowRight(_underscore, fp.toLower), names)
}

console.log('练习4：', sanitizeNames(fp.map(fp.prop('name'), cars)))
```

