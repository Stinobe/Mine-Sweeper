type BoardProps = {
  name: string;
  horizontal: number;
  vertical: number;
  minesPercentage: number;
}

class Board {
  public name: string;
  public size: { x: number, y: number };
  public minesPercentage: number;

  constructor({ name, horizontal, vertical, minesPercentage }: BoardProps) {
    this.name = name;
    this.size = { x: horizontal, y: vertical };
    this.minesPercentage = Math.abs(minesPercentage > 1 ? minesPercentage / 100 : minesPercentage);
  }

  get cells(): number {
    return this.size.x * this.size.y;
  }

  get mines(): number {
    return Math.floor(this.cells * this.minesPercentage);
  }

  get description(): string {
    return `${this.size.x}x${this.size.y} board with ${this.mines} mines`
  }
}

export default Board;