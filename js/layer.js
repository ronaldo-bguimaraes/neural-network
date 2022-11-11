import { Neuron } from "./neuron.js";
class Layer {
    Length;
    constructor(length) {
        this.Length = length;
    }
}
class InputLayer extends Layer {
    Active(inputs) {
        return inputs;
    }
}
class HiddenLayer extends Layer {
    InputLength;
    Neurons;
    constructor(length, inputLength) {
        super(length);
        this.InputLength = inputLength;
        this.Neurons = [];
        for (let i = 0; i < length; i++) {
            this.Neurons[i] = new Neuron(inputLength);
        }
    }
    Active(inputList) {
        const outputs = [];
        for (const key in this.Neurons) {
            outputs[key] = this.Neurons[key].Active(inputList);
        }
        return outputs;
    }
    static Crossover(a, b) {
        const child = new HiddenLayer(a.Length, a.InputLength);
        for (let i = 0; i < a.Length; i++) {
            child.Neurons[i] = Neuron.Crossover(a.Neurons[i], b.Neurons[i]);
        }
        return child;
    }
}
class OutputLayer extends HiddenLayer {
    Active(inputList) {
        const outputs = [];
        for (const key in this.Neurons) {
            outputs[key] = this.Neurons[key].Active(inputList);
        }
        return outputs;
    }
}
function CreateInputLayer(length) {
    return new InputLayer(length);
}
function CreateHiddenLayer(length, inputLength) {
    return new HiddenLayer(length, inputLength);
}
function CreateOutputLayer(length, inputLength) {
    return new OutputLayer(length, inputLength);
}
export { InputLayer, HiddenLayer, OutputLayer, CreateInputLayer, CreateHiddenLayer, CreateOutputLayer, };
