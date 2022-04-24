import Board from "@/models/Board";

const name = "Basic";
const horizontal = 5;
const vertical = 5;
const cells = 25;
const minesPercentage = .2;
const mines = 5;
const boardDescription = "5x5 board with 5 mines";

const board = new Board({ name, horizontal, vertical, minesPercentage });
const exceptionalBoard = new Board({ name, horizontal, vertical, minesPercentage: 40 });

describe("Board instance", () => {

  test("Name of the board", () => {
    expect(board.name).toEqual(name);
  });

  test("Size", () => {
    expect(board.cells).toEqual(cells);
  });

  test("Mines", () => {
    expect(board.mines).toEqual(mines);
    expect(exceptionalBoard.mines).toEqual(10);
    expect(exceptionalBoard.minesPercentage).toEqual(.4);
  });

  test("Description", () => { 
    expect(board.description).toEqual(boardDescription);
  });

});