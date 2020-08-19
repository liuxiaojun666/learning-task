const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor = (resolve, reject) => any) {
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            throw error
        }
    }

    status = PENDING
    value = void 0
    reson = void 0
    successCallback = []
    failCallback = []

    resolve = value => {
        if (this.status !== PENDING) return
        if (value instanceof MyPromise) {
            if (value === this) throw TypeError('不可以这样玩哦，会死递归的')
            return value.then(this.resolve, this.reject)
        }
        this.value = value
        this.status = FULFILLED
        while (this.successCallback.length) this.successCallback.shift()()
    }

    reject = reson => {
        if (this.status !== PENDING) return
        this.reson = reson
        this.status = REJECTED
        while (this.failCallback.length) this.failCallback.shift()()
    }

    then (successCallback, failCallback) {
        if (typeof successCallback !== 'function') successCallback = value => value
        if (typeof failCallback !== 'function') failCallback = reson => { throw reson }

        const p = new MyPromise((resolve, reject) => {
            const f = (cb, info) => {
                setTimeout(() => {
                    try {
                        promiseResolve(cb(info), p, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            switch (this.status) {
                case FULFILLED:
                    f(successCallback, this.value)
                    break
    
                case REJECTED:
                    f(failCallback, this.reson)
                    break
    
                case PENDING:
                    this.successCallback.push(() => f(successCallback, this.value))
                    this.failCallback.push(() => f(failCallback, this.reson))
                    break
            }
        })

        return p
    }

    catch (failCallback) {
        return this.then(void 0, failCallback)
    }

    finally (cb) {
        return this.then(value => {
            cb()
            return value
        }, reson => {
            cb()
            throw reson
        })
    }

    static resolve (data) {
        // 实例方法 resolve 已经实现 resolve 一个 promise 的处理，这里不用判断  promise 类型 特殊处理
        return new MyPromise(resolve => resolve(data))
    }

    static reject (err) {
        return new MyPromise((r, reject) => reject(err))
    }

    static all (array) {
        const result = []
        let len = 0
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value
                if (++len === array.length) resolve(result)
            }
            for (const index = 0; index < array.length; index++) {
                const p = array[index];
                if (p instanceof MyPromise) p.then(res => addData(index, res), reject)
                else addData(index, p)
            }
        })
    }

    static any (array) {
        const result = []
        let len = 0
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value
                if (++len === array.length) reject(new AggregateError(result))
            }
            for (const index = 0; index < array.length; index++) {
                const p = array[index];
                if (p instanceof MyPromise) p.then(resolve, reson => addData(index, reson))
                else resolve(p)
            }
        })
    }

    static allSettled (array) {
        const result = []
        let len = 0
        return new MyPromise(resolve => {
            function addData(key, value) {
                result[key] = value
                if (++len === array.length) resolve(result)
            }
            for (const index = 0; index < array.length; index++) {
                const p = array[index];
                if (p instanceof MyPromise) p.then(res => addData(index, res), reson => addData(index, reson))
                else addData(index, p)
            }
        })
    }

    static race (array) {
        return new MyPromise((resolve, reject) => {
            for (const index = 0; index < array.length; index++) {
                const p = array[index];
                if (p instanceof MyPromise) p.then(resolve, reject)
                else resolve(p)
            }
        })
    }
    
}

function promiseResolve(x, p, resolve, reject) {
    if (x === p) throw new TypeError('不可以返回当前 promise 实例')
    if (x instanceof MyPromise) x.then(resolve, reject)
    else resolve(x)
}

module.exports = MyPromise

