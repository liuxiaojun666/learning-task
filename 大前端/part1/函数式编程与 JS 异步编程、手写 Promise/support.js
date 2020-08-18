class Container {
    static of (value) {
        return new Container(value)
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of (x) {
        return new Maybe(x)
    }

    constructor (value) {
        this._value = value
    }

    map (fn) {
        return this.isNothing(this._value) ? this : Maybe.of(fn(this._value))
    }

    isNothing (v) {
        return v === null || v === void 0
    }
}


module.exports = {Container, Maybe}
