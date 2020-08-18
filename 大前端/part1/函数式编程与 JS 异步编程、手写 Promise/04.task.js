const PENDDING = 'pendding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
    constructor (executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            
        }
    }

    state = PENDDING
    value = void 0
    reson = void 0

    resolve = value => {
        if (this.state !== PENDDING) return
        this.state = FULFILLED
    }

    reject = err => {
        if (this.state !== PENDDING) return
        this.state = REJECTED
    }

    then (successCallback, failCallback) {
        switch (this.state) {
            case FULFILLED:
                successCallback(this.value)
                break;

            case REJECTED:
                failCallback(this.reson)
                break;

            case PENDDING:
                
                break;
        
            default:
                break;
        }
    }
}

module.exports = myPromise
