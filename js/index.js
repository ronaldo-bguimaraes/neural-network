"use strict";
// import { Network, Score } from "./network.js";
// // function test(networks: Network[]) {
// //   for (let i = 0; i < 10; i++) {
// //     const scores = [];
// //     for (let j = 0; j < networks.length; j++) {
// //       const a = Math.random() * 10;
// //       const b = Math.random() * 10;
// //       //
// //       const resultA = networks[j].Active([a, b]);
// //       const resultB = networks[j].Active([b, a]);
// //       if (a > b) {
// //         // 1 0
// //         scores.push(new Score(networks[j], 1 - resultA[0] + resultB[0]));
// //       }
// //       if (a < b) {
// //         // 0 1
// //         scores.push(new Score(networks[j], resultA[0] + (1 - resultB[0])));
// //       }
// //     }
// //     const best_scores = scores.sort((a, b) => a.Score - b.Score);
// //     //
// //     for (let i = 0; i < best_scores.length; i++) {
// //       networks[i] = best_scores[i].Network;
// //     }
// //     for (let i = 5; i < networks.length; i++) {
// //       networks[i] = Network.Crossover(
// //         best_scores[Math.floor(Math.random() * 4)].Network,
// //         best_scores[Math.floor(Math.random() * 4)].Network
// //       );
// //     }
// //   }
// // }
// // function testador(networks: Network[]) {
// //   const a = Math.random() * 10;
// //   const b = Math.random() * 10;
// //   //
// //   const result = networks[0].Active([a, b]);
// //   //
// //   const certo = a > b ? result[0] > 0.5 : result[0] < 0.5;
// //   const style = `color: ${certo ? "green" : "red"}`;
// //   //
// //   console.log(`%c{ a: "${a}", b: "${b}" } = ${result[0]}`, style);
// //   //
// // }
// // const networks: Network[] = [];
// // for (let i = 0; i < 5; i++) {
// //   networks[i] = new Network(2, [3], 1);
// // }
// // function loop() {
// //   test(networks);
// //   testador(networks);
// //   requestAnimationFrame(loop);
// // }
// // loop();
// // jogo
// function Random() {
//   return Math.floor(1 + Math.random() * 6);
// }
// enum Resultado {
//   SIMPLES = 0,
//   FULL = 6,
//   SEGUIDA = 7,
//   QUADRADA = 8,
//   GENERAL = 9,
// }
// function Full(values: number[]) {
//   return values.includes(2) && values.includes(3);
// }
// function Quadrada(values: number[]) {
//   return values.includes(4);
// }
// function Seguida(values: number[]) {
//   return values[0] !== values[5] && values.every((e) => e <= 1);
// }
// function General(values: number[]) {
//   return values.includes(5);
// }
// function Analisador(data: number[]) {
//   const statistic: Record<number, number> = {};
//   for (let i = 1; i <= 6; i++) {
//     statistic[i] = 0;
//   }
//   for (let i = 0; i < 5; i++) {
//     statistic[data[i]] += 1;
//   }
//   const values = Object.values(statistic);
//   //
//   if (Full(values)) {
//     return Resultado.FULL;
//   }
//   if (Quadrada(values)) {
//     return Resultado.QUADRADA;
//   }
//   if (Seguida(values)) {
//     return Resultado.SEGUIDA;
//   }
//   if (General(values)) {
//     return Resultado.GENERAL;
//   }
//   {
//     return Resultado.SIMPLES;
//   }
// }
// class Sorteio {
//   Data: number[];
//   constructor() {
//     this.Data = [];
//     this.Sortear();
//   }
//   Sortear() {
//     for (let i = 0; i < 5; i++) {
//       this.Data[i] = Random();
//     }
//   }
//   SortearIndexes(indexes: number[]) {
//     for (let i = 0; i < 5; i++) {
//       if (indexes[i] > 0.5) {
//         this.Data[i] = Random();
//       }
//     }
//   }
// }
// class Jogador {
//   Data: number[];
//   Usados: number[];
//   constructor() {
//     this.Data = [];
//     this.Usados = [];
//     for (let i = 0; i < 10; i++) {
//       this.Data[i] = 0;
//     }
//   }
//   get Livres() {
//     const livres: number[] = [];
//     for (let i = 0; i < 10; i++) {
//       if (!this.Usados.includes(i)) {
//         livres.push(i);
//       }
//     }
//     return livres;
//   }
//   Calc() {
//     let sum = 0;
//     for (let i = 0; i < 6; i++) {
//       sum += this.Data[i] * (i + 1);
//     }
//     if (this.Data[6] > 0) {
//       sum += 10;
//     }
//     if (this.Data[6] > 1) {
//       sum += 5;
//     }
//     if (this.Data[7] > 0) {
//       sum += 20;
//     }
//     if (this.Data[7] > 1) {
//       sum += 5;
//     }
//     if (this.Data[8] > 0) {
//       sum += 30;
//     }
//     if (this.Data[8] > 1) {
//       sum += 5;
//     }
//     if (this.Data[9] > 0) {
//       sum += 40;
//     }
//     if (this.Data[9] > 1) {
//       sum += 60;
//     }
//     return sum;
//   }
// }
// function Jogada(jogador: Jogador, network: Network, log?: boolean) {
//   sorteio.Sortear();
//   log && console.log(`Sorteio 1: ${sorteio.Data.join(" ")}`);
//   const boca = Analisador(sorteio.Data);
//   for (let i = 0; i < 2; i++) {
//     const output = network.Active(jogador.Data.concat(sorteio.Data));
//     // const marcador = Math.floor(output[0] * livres.length);
//     const sorteioIndexes = output.slice(1, 6);
//     sorteio.SortearIndexes(sorteioIndexes);
//     log && console.log(`Sorteio ${i + 2}: ${sorteio.Data.join(" ")}`);
//   }
//   const resultado = Analisador(sorteio.Data);
//   log && console.log(`Resultado: ${Resultado[resultado]}`);
//   const output = network.Active(jogador.Data.concat(sorteio.Data));
//   const livres = jogador.Livres;
//   const marcador = Math.floor(output[0] * livres.length);
//   const index = livres[marcador];
//   if (index <= 5) {
//     log && console.log(`Escolheu: SIMPLES de ${index + 1}`);
//     let sum = 0;
//     for (let i = 0; i < 5; i++) {
//       if (sorteio.Data[i] === index + 1) {
//         sum += 1;
//       }
//     }
//     jogador.Data[index] += sum;
//   }
//   //
//   else {
//     log && console.log(`Escolheu: ${Resultado[index]}`);
//     if (index === resultado) {
//       jogador.Data[index] += 1;
//       if (boca === resultado) {
//         jogador.Data[index] += 1;
//       }
//     }
//   }
//   jogador.Usados.push(index);
// }
// const sorteio = new Sorteio();
// function test(networks: Network[]) {
//   for (let i = 0; i < 25; i++) {
//     const scores = [];
//     for (let j = 0; j < networks.length; j++) {
//       let score = 0;
//       for (let p = 0; p < 5; p++) {
//         const jogador = new Jogador();
//         for (let k = 0; k < 10; k++) {
//           Jogada(jogador, networks[j]);
//         }
//         const _score = jogador.Calc();
//         if (_score > score) {
//           score = _score;
//         }
//       }
//       scores.push(new Score(networks[j], score));
//     }
//     const best_scores = scores.sort((a, b) => b.Score - a.Score);
//     //
//     for (let i = 0; i < best_scores.length; i++) {
//       networks[i] = best_scores[i].Network;
//     }
//     //
//     networks[5] = Network.Crossover(
//       best_scores[0].Network,
//       best_scores[1].Network
//     );
//     for (let i = 6; i < networks.length; i++) {
//       const indexA = Math.floor(Math.random() * 5);
//       const indexB = Math.floor(Math.random() * 5);
//       networks[i] = Network.Crossover(
//         best_scores[indexA].Network,
//         best_scores[indexB].Network
//       );
//     }
//   }
// }
// const networks: Network[] = [];
// for (let i = 0; i < 40; i++) {
//   networks[i] = new Network(15, [10, 8], 6);
// }
// let i = 0;
// function testador() {
//   test(networks);
//   const jogador = new Jogador();
//   for (let i = 0; i < 10; i++) {
//     Jogada(jogador, networks[0], true);
//   }
//   console.log(jogador.Data);
//   console.log(jogador.Calc());
//   localStorage.setItem("network", JSON.stringify(networks[0]));
//   localStorage.setItem("points", jogador.Calc().toString());
//   localStorage.setItem("index", i.toString());
//   i++;
//   window.requestAnimationFrame(testador);
// }
// testador();
