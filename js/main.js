import { Trainer } from './handler.js';
const handler = new Trainer([2, 5, 1], 20, 0.2, 0.5);
handler.set = [
    {
        input: [0, 0],
        output: [0],
    },
    {
        input: [0, 1],
        output: [1],
    },
    {
        input: [1, 0],
        output: [1],
    },
    {
        input: [1, 1],
        output: [0],
    }
];
console.time('find');
const best = await handler.find(0.1);
console.timeEnd('find');
console.log(handler);
