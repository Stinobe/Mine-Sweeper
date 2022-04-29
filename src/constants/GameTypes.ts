import Board from "@/models/Board";

const GameTypes: Board[] = [
  new Board({ name: "Easy", horizontal: 10, vertical: 15, minesPercentage: .125 }),
  new Board({ name: "Medium", horizontal: 15, vertical: 20, minesPercentage: .25}),
  new Board({ name: "Hard", horizontal: 20, vertical: 25, minesPercentage: .375 }),
];

export default GameTypes;