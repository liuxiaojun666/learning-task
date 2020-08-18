const {Container, Maybe} = require('./support')
const fp = require('lodash/fp')

// 练习1：使用fp.add(x, y) 和fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1

let maybe = Maybe.of([5, 6, 1])

let ex1 = (number) => {
    return maybe.map(fp.map(fp.add(number)))
}
console.log('练习1：', ex1(10))

// 练习2：实现一个函数 ex2，能够使用fp.first 获取列表的第一个元素

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

let ex2 = () => {
    return xs.map(fp.first)._value
}

console.log('练习2：', ex2())

// 练习3：实现一个函数 ex3，使用safeProp 和 fp.first 找到user 的名字的首字母

let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})

let user = {id: 2, name: 'Albert'}

let ex3 = () => {
    return safeProp('name', user).map(fp.first)._value
}

console.log('练习3：', ex3())

// 练习4：使用Maybe 重写 ex4 ，不要有 if 语句

let ex4 = function (n) {
    return Maybe.of(n).map(parseInt)._value
}

console.log('练习4：', ex4('99'))


