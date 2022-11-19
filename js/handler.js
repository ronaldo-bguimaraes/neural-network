import { Network } from './network.js';
import { PowerArray } from './neuron.js';
export class Score {
    network;
    score;
    constructor(network, error) {
        this.network = network;
        this.score = error;
    }
}
export function wait(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export class Trainer {
    _generation;
    _scores;
    _length;
    _set;
    _crossover;
    _mutation;
    _generation_idx;
    constructor(arch, length, crossover, mutation) {
        this._generation = PowerArray.generate(length, () => new Network(arch));
        this._length = length;
        this._set = [];
        this._crossover = crossover;
        this._mutation = mutation;
        this._generation_idx = 0;
        this._scores = new PowerArray();
    }
    set set(set) {
        this._set = set;
    }
    *gen_test(network) {
        for (const set of this._set) {
            yield PowerArray.multimap(set.output, network.active(set.input), (a, b) => Math.abs(a - b) ** 2);
        }
    }
    get_error(network) {
        return PowerArray.sum(PowerArray.generator_map(this.gen_test(network), PowerArray.sum)) ** 2;
    }
    run() {
        const count = Math.floor(this._crossover * this._length);
        for (const network of this._generation) {
            const error = this.get_error(network);
            const score = new Score(network, error);
            this._scores.push(score);
        }
        const sort = this._scores.slice().sort((a, b) => a.score - b.score);
        const selected = sort.slice(0, count).map(e => e.network);
        this._generation = new PowerArray();
        for (let i = 0; i < this._length; i++) {
            const new_network = Network.crossover(selected, this._mutation);
            this._generation.push(new_network);
        }
        this._generation_idx += 1;
        return this._generation[0];
    }
    async find(accept) {
        const best = this.run();
        if (this.get_error(best) < accept) {
            console.log(this._generation_idx);
            return best;
        }
        await wait(1);
        return this.find(accept);
    }
}
