class Neuron {
  private Bias: number;
  private Length: number;
  private Weights: number[];

  constructor(length: number) {
    // inicialize random number to bias
    this.Bias = Neuron.Random();
    // store the length neuron
    this.Length = length;
    // inicialize the weight array
    this.Weights = [];
    // set random numbers in weight array
    for (let i = 0; i < length; i++) {
      this.Weights[i] = Neuron.Random();
    }
  }

  private static Random(): number {
    return (Math.random() - Math.random()) * 10;
  }

  private Sigmoid(value: number): number {
    return (1 + Math.tanh(value)) / 2;
    // return 1 / (1 + Math.exp(-value));
  }

  Active(inputs: number[]): number {
    let sum = this.Bias;
    for (const key in inputs) {
      sum += inputs[key] * this.Weights[key];
    }
    return this.Sigmoid(sum);
  }

  static Crossover(a: Neuron, b: Neuron) {
    // console.log(a, b);
    const child = new Neuron(a.Length);
    child.Bias = (a.Bias + b.Bias) / 2 + Neuron.Random();
    for (let i = 0; i < child.Length; i++) {
      child.Weights[i] = (a.Weights[i] + b.Weights[i]) / 2 + Neuron.Random();
    }
    return child;
  }
}

export { Neuron };
