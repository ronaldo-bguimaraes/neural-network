export function before(value: number) {
  return --value;
}

export function after(value: number) {
  return ++value;
}

interface ArrayConstructor2 extends ArrayConstructor {
  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   */
  from<T, U extends Array<T>>(iterable: Iterable<T> | ArrayLike<T>): U;

  /**
   * Creates an array from an iterable object.
   * @param iterable An iterable object to convert to an array.
   * @param mapfn A mapping function to call on every element of the array.
   * @param thisArg Value of 'this' used to invoke the mapfn.
   */
  from<T, U, V extends Array<T>>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): V;
}

declare var Array: ArrayConstructor2;

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
  static choice<T>(values: T[]) {
    return values[Math.floor(Math.random() * values.length)];
  }
}

export function* enumerate<T>(iterable: Iterable<T>): Generator<[number, T], void> {
  let count = 0;
  for (const value of iterable) {
    yield [count++, value];
  }
}

export class PowerArray<T> extends Array<T> {
  *generator_map<U>(callback: (value: T, index: number) => U) {
    yield* PowerArray.generator_map(this, callback);
  }

  static *generator_map<T, U>(iterable: Iterable<T>, callback: (value: T, index: number) => U) {
    for (const [idx, value] of enumerate(iterable)) {
      yield callback(value, idx);
    }
  }

  static generate<T, U>(length: number, callback: (v: T, k: number) => U) {
    return PowerArray.from<T, U, PowerArray<T>>({ length }, callback);
  }

  *multimap<U, V>(other: Iterable<U>, callback: (value: T, other: U, index: number) => V) {
    yield* PowerArray.multimap(this, other, callback);
  }

  static *multimap<T, U, V>(iterable: Iterable<T>, other: Iterable<U>, callback: (value: T, other: U, index: number) => V) {
    const indexed = Array.from(other);
    for (const [idx, value] of enumerate(iterable)) {
      yield callback(value, indexed[idx], idx);
    }
  }

  static sum(iterable: Iterable<number>) {
    let result = 0;
    for (const value of iterable) {
      result += value;
    }
    return result;
  }
}

export class Neuron {
  private _bias: number;

  private readonly _weights: PowerArray<number>;
  private readonly _length: number;

  constructor(length: number) {
    this._bias = Random.signed();
    this._weights = PowerArray.generate(length, Random.signed);
    this._length = length;
  }

  get length() {
    return this._length;
  }

  private _sigmoid(value: number) {
    return 1 / (1 + Math.exp(-value));
  }

  private _sum(input: Iterable<number>) {
    return this._weights.multimap(input, (a, b) => a * b);
  }

  active(input: Iterable<number>) {
    const gen = this._sum(input);
    const res = this._bias + PowerArray.sum(gen);
    return this._sigmoid(res);
  }

  static crossover(neurons: Neuron[], mutation: number) {
    const child = new Neuron(neurons[0]._length);
    child._bias = Random.choice(neurons)._bias + (Random.signed() * mutation * child._bias);
    for (const [idx, value] of enumerate(child._weights)) {
      child._weights[idx] = Random.choice(neurons)._weights[idx] + (Random.signed() * mutation * value);
    }
    return child;
  }
}