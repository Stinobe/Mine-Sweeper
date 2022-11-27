import Tile from "@/models/Tile";
import { getRandomNumber } from "./GenerateMap";

class Field {
  private static sizeX: number = 0;
  private static sizeY: number = 0;
  private static totalMines: number = 0;
  private static mineList: Coords[] = [];

  private static hasMine({ x, y }: Coords): boolean {
    const index = this.mineList.findIndex(mine => mine.x === x && mine.y === y);
    return index > -1;
  }

  private static generateGrid(x: number, y: number): Tile[][] {
    const tiles: Tile[][] = [];
    // Generate each row
    for (let yi = 0; yi < y; yi++) {
      const row: Tile[] = [];
      // Generate each column
      for (let xi = 0; xi < x; xi++) {
        const coords: Coords = { x: xi, y: yi };
        const hasMine: boolean = this.hasMine(coords);
        // Push new item
        row.push(new Tile(coords, hasMine));
      }
      tiles.push(row);
    }
    return tiles;
  };

  private static generateMines(): Coords[] {
    // Reset mine list
    const mineList: Coords[] = [];
    
    // Generate unqiue mines
    while (mineList.length < this.totalMines) {
      // Get random coords
      const locationX = getRandomNumber(this.sizeX);
      const locationY = getRandomNumber(this.sizeY);

      // Check if the coordinates exist
      const exists = mineList.findIndex(mine => mine.x === locationX && mine.y === locationY) > -1;

      // If coordinates don't exist, push them into the array
      if (!exists) mineList.push({ x: locationX, y: locationY });
    }

    return mineList;
  }

  public static generate(x: number, y: number, mines: number): void {
    this.sizeX = x;
    this.sizeY = y;
    this.totalMines = mines;
    this.mineList = this.generateMines();
  };

};

export default Field;