class Grid {
  private sizeX: number;
  private sizeY: number;
  private totalMines: number;

  constructor(x: string, y: string, mines: string) {
    this.sizeX = Number(x);
    this.sizeY = Number(y);
    this.totalMines = Number(mines);
  }
}