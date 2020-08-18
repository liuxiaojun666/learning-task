(async function () {
    let a = await new Promise((resolve, reject) => setTimeout(() => resolve('hello'), 10))
    let b = await new Promise((resolve, reject) => setTimeout(() => resolve('lagou'), 10))
    let c = await new Promise((resolve, reject) => setTimeout(() => resolve('I ❤ U'), 10))
    console.log(a + b + c)
})()