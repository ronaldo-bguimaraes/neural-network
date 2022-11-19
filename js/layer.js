import { enumerate, PowerArray, Neuron } from './neuron.js';
export class Layer {
    _neurons;
    _length;
    _input_length;
    constructor(length, input_length) {
        this._length = length;
        this._input_length = input_length;
        this._neurons = PowerArray.generate(length, () => new Neuron(input_length));
    }
    get length() {
        return this._length;
    }
    get input_length() {
        return this._input_length;
    }
    *active(input) {
        for (const neuron of this._neurons) {
            yield neuron.active(input);
        }
    }
    static crossover(layers, mutation) {
        const child = new Layer(layers[0]._length, layers[0].input_length);
        for (const [idx] of enumerate(child._neurons)) {
            child._neurons[idx] = Neuron.crossover(layers.map(layer => layer._neurons[idx]), mutation);
        }
        return child;
    }
}
