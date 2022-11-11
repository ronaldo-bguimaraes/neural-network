import { Neuron } from "./neuron.js";

class Layer {
  protected Length: number;
  constructor(length: number) {
    this.Length = length;
  }
}

class InputLayer extends Layer {
  public Active(inputs: number[]): number[] {
    return inputs;
  }
}

class HiddenLayer extends Layer {
  protected InputLength: number;
  protected Neurons: Neuron[];

  constructor(length: number, inputLength: number) {
    super(length);
    this.InputLength = inputLength;
    this.Neurons = [];
    for (let i = 0; i < length; i++) {
      this.Neurons[i] = new Neuron(inputLength);
    }
  }

  public Active(inputList: number[]) {
    const outputs: number[] = [];
    for (const key in this.Neurons) {
      outputs[key] = this.Neurons[key].Active(inputList);
    }
    return outputs;
  }

  public static Crossover(a: HiddenLayer, b: HiddenLayer) {
    const child = new HiddenLayer(a.Length, a.InputLength);
    for (let i = 0; i < a.Length; i++) {
      child.Neurons[i] = Neuron.Crossover(a.Neurons[i], b.Neurons[i]);
    }
    return child;
  }
}

class OutputLayer extends HiddenLayer {
  public Active(inputList: number[]): number[] {
    const outputs: number[] = [];
    for (const key in this.Neurons) {
      outputs[key] = this.Neurons[key].Active(inputList);
    }
    return outputs;
  }
}

function CreateInputLayer(length: number): InputLayer {
  return new InputLayer(length);
}

function CreateHiddenLayer(length: number, inputLength: number): HiddenLayer {
  return new HiddenLayer(length, inputLength);
}

function CreateOutputLayer(length: number, inputLength: number): OutputLayer {
  return new OutputLayer(length, inputLength);
}

export {
  InputLayer,
  HiddenLayer,
  OutputLayer,
  CreateInputLayer,
  CreateHiddenLayer,
  CreateOutputLayer,
};
