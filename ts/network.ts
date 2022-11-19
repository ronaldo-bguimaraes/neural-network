import { Layer } from './layer.js';

import { before, enumerate, PowerArray } from './neuron.js';

export class Network {
  private readonly _arch: number[];
  private readonly _layers: PowerArray<Layer>;
  error: number;

  constructor(arch: number[]) {
    this._layers = new PowerArray<Layer>();
    this._arch = arch;
    for (let i = 0; i < before(arch.length); i++) {
      this._layers[i] = new Layer(arch[i + 1], arch[i]);
    }
    this.error = 0;
  }

  get arch() {
    return this._arch;
  }

  active(input: Iterable<number>) {
    let result = input;
    for (const layer of this._layers) {
      result = Array.from(layer.active(result));
    }
    return result;
  }

  static crossover(networks: Network[], mutation: number) {
    const child = new Network(networks[0]._arch);
    for (const [idx] of enumerate(child._layers)) {
      child._layers[idx] = Layer.crossover(networks.map(network => network._layers[idx]), mutation)
    }
    return child;
  }
}