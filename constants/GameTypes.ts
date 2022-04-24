import Board from "@/models/Board";

const GameTypes: Board[] = [
  new Board({ name: "Easy", horizontal: 10, vertical: 15, minesPercentage: .1 }),
  new Board({ name: "Medium", horizontal: 50, vertical: 50, minesPercentage: .04}),
  new Board({ name: "Hard", horizontal: 100, vertical: 100, minesPercentage: .06 }),
  new Board({ name: "Try me ...", horizontal: 125, vertical: 125, minesPercentage: .08 })
];

export default GameTypes;