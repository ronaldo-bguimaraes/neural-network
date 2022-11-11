import { InputLayer, HiddenLayer, OutputLayer } from "./layer.js";

interface IInputOutputSet {
  Inputs: number[];
  Outputs: number[];
}

class Network {
  private InputLayer: InputLayer;
  private HiddenLayers: HiddenLayer[];
  private OutputLayer: OutputLayer;

  protected InputLength: number;
  protected HiddenLengths: number[];
  protected OutputLength: number;

  public constructor(
    inputLength: number,
    hiddenLengths: number[],
    outputLength: number
  ) {
    this.InputLength = inputLength;
    this.HiddenLengths = hiddenLengths;
    this.OutputLength = outputLength;

    this.InputLayer = new InputLayer(inputLength);
    this.HiddenLayers = [];

    for (let i = 0; i < hiddenLengths.length; i++) {
      this.HiddenLayers.push(
        new HiddenLayer(
          hiddenLengths[i],
          i > 0 ? hiddenLengths[i - 1] : inputLength
        )
      );
    }

    this.OutputLayer = new OutputLayer(
      outputLength,
      hiddenLengths.at(-1) as number
    );
  }

  public Active(inputs: number[]) {
    // get result from inputLayer
    let _inputs = this.InputLayer.Active(inputs);
    for (const hiddenLayer of this.HiddenLayers) {
      // get result from a hiddenLayer
      _inputs = hiddenLayer.Active(_inputs);
    }
    // get result from outputLayer
    return this.OutputLayer.Active(_inputs);
  }

  public static Crossover(parentA: Network, parentB: Network) {
    const child = new Network(
      parentA.InputLength,
      parentA.HiddenLengths,
      parentA.OutputLength
    );
    for (let i = 0; i < parentA.HiddenLayers.length; i++) {
      child.HiddenLayers[i] = HiddenLayer.Crossover(
        parentA.HiddenLayers[i],
        parentB.HiddenLayers[i]
      );
    }
    child.OutputLayer = HiddenLayer.Crossover(
      parentA.OutputLayer,
      parentB.OutputLayer
    );
    return child;
  }

  public getError(inputOutputSetList: IInputOutputSet[]) {
    let sum = 0;
    for (const error of inputOutputSetList) {
      let sub = 0;
      const result = this.Active(error.Inputs);
      for (const key in error.Outputs) {
        sub += Math.pow(error.Outputs[key] - result[key], 2);
      }
      sum += sub;
    }
    return sum;
  }
}

class Score {
  public Score: number;
  public Network: Network;
  public constructor(network: Network, score: number) {
    this.Score = score;
    this.Network = network;
  }
}

class Networks {
  public Length: number;
  private Networks: Network[];
  public constructor(
    length: number,
    inputLength: number,
    hiddenLengths: number[],
    outputLength: number
  ) {
    this.Length = length;
    this.Networks = [];
    for (let i = 0; i < this.Length; i++) {
      this.Networks[i] = new Network(inputLength, hiddenLengths, outputLength);
    }
  }

  public TrainOutput(inputOutputSets: IInputOutputSet[]) {
    const callback = () => {
      const networkList: Network[] = [];
      for (let i = 0; i < this.Length; i++) {
        networkList[i] = Network.Crossover(this.Networks[0], this.Networks[1]);
      }
      function getError(network: Network) {
        return network.getError(inputOutputSets);
      }
      this.Networks = networkList.sort((a, b) => getError(a) - getError(b));
      return getError(this.bestNetwork);
    };

    return (generationCount: number) => {
      let error = 0;
      for (let i = 0; i < generationCount; i++) {
        error = callback();
      }
      return error;
    };
  }

  public get bestNetwork() {
    return this.Networks[0];
  }

}

export { Network, Networks, Score, IInputOutputSet };
