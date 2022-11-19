export function before(value) {
    return --value;
}
export function after(value) {
    return ++value;
}
export class Random {
    static unsigned() {
        return Math.random();
    }
    static signed() {
        return Random.unsigned() - Random.unsigned();
    }
    static bit() {
        return Math.round(Random.unsigned());
    }
    static boolean() {
        return Random.signed() > 0;
    }
    static choice(values) {
        return values[Math.floor(Math.random() * values.length)];
    }
}
export function* enumerate(iterable) {
    let count = 0;
    for (const value of iterable) {
        yield [count++, value];
    }
}
export class PowerArray extends Array {
    *generator_map(callback) {
        yield* PowerArray.generator_map(this, callback);
    }
    static *generator_map(iterable, callback) {
        for (const [idx, value] of enumerate(iterable)) {
            yield callback(value, idx);
        }
    }
    static generate(length, callback) {
        return PowerArray.from({ length }, callback);
    }
    *multimap(other, callback) {
        yield* PowerArray.multimap(this, other, callback);
    }
    static *multimap(iterable, other, callback) {
        const indexed = Array.from(other);
        for (const [idx, value] of enumerate(iterable)) {
            yield callback(value, indexed[idx], idx);
        }
    }
    static sum(iterable) {
        let result = 0;
        for (const value of iterable) {
            result += value;
        }
        return result;
    }
}
export class Neuron {
    _bias;
    _weights;
    _length;
    constructor(length) {
        this._bias = Random.signed();
        this._weights = PowerArray.generate(length, Random.signed);
        this._length = length;
    }
    get length() {
        return this._length;
    }
    _sigmoid(value) {
        return 1 / (1 + Math.exp(-value));
    }
    _sum(input) {
        return this._weights.multimap(input, (a, b) => a * b);
    }
    active(input) {
        const gen = this._sum(input);
        const res = this._bias + PowerArray.sum(gen);
        return this._sigmoid(res);
    }
    static crossover(neurons, mutation) {
        const child = new Neuron(neurons[0]._length);
        child._bias = Random.choice(neurons)._bias + (Random.signed() * mutation * child._bias);
        for (const [idx, value] of enumerate(child._weights)) {
            child._weights[idx] = Random.choice(neurons)._weights[idx] + (Random.signed() * mutation * value);
        }
        return child;
    }
}
