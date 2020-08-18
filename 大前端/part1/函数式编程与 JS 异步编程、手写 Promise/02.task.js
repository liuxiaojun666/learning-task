const fp = require('lodash/fp')

const cars = [
    {name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: 'Spyker C12 Zagato', horsepower: 610, dollar_value: 40000, in_stock: true},
    {name: 'Jaguar XKR-S', horsepower: 560, dollar_value: 70000, in_stock: true},
    {name: 'Audi R8', horsepower: 2660, dollar_value: 502000, in_stock: true},
    {name: 'Aston Martin One-77', horsepower: 60, dollar_value: 7000, in_stock: true},
    {name: 'Pagani Huayra', horsepower: 960, dollar_value: 3000, in_stock: true},
]

// 练习1： 使用函数组合 fp.flowRight() 重新实现下面这个函数 ``

// let isLastInstock = function (cars) {
//     let last_car = fp.last(cars)
//     return fp.prop('in_stock', last_car)
// }

let isLastInstock = function (cars) {
    // let last_car = fp.last(cars)
    // return fp.prop('in_stock', last_car)
    return fp.flowRight(fp.prop('in_stock'), fp.last)(cars)
}

console.log('练习1：', isLastInstock(cars))

//**************************************************************************************** */

// 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name 

console.log('练习2：', fp.flowRight(fp.prop('name'), fp.first)(cars))

//**************************************************************************************** */

// 练习3：使用帮助函数 _average 重构 averageDollarValue, 使用函数组合的方式实现
// let _average = function (xs) {
//     return fp.reduce(fp.add, 0, xs) / xs.length
// }
// let averageDollarValue = function (cars) {
//     let dollar_values = fp.map(function (car) {
//         return car.dollar_value
//     }, cars)

//     return _average(dollar_values)
// }

let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = function (cars) {
    return fp.flowRight(_average, fp.map(car => car.dollar_value))(cars)
    // return fp.flowRight(fp.reduce(fp.add, 0), fp.map(car => car.dollar_value))(cars) / cars.length
}

console.log('练习3：', averageDollarValue(cars))

//**************************************************************************************** */
// 练习4： 使用 flowRight 写一个 sanitizeNames() 函数， 返回一个下划线链接的小写字符串， 把数组中的name 转换为这种形式： 例如： sanitizeNames(['Hello World']) => ["hello world"]
let _underscore = fp.replace(/\W+/g, '_')

function sanitizeNames(names) {
    return fp.map(fp.flowRight(_underscore, fp.toLower), names)
}

console.log('练习4：', sanitizeNames(fp.map(fp.prop('name'), cars)))

