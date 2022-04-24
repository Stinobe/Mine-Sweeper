import { getRandomNumber } from "@/utils/GenerateMap";
import Tile, { TileInfo } from "./Tile";

class Grid {
  private sizeX: number;
  private sizeY: number;
  private totalMines: number;
  private mineList: { x: number, y: number }[] = [];
  public tiles: Tile[][] = [];

  constructor(x: number, y: number, mines: number) {
    this.sizeX = x;
    this.sizeY = y;
    this.totalMines = mines;
    this.generateMineList();
    this.generateGrid();
  }
  
  private generateGrid(): void {
    if (this.tiles.length) this.tiles = [];
    for (let i = 0; i < this.sizeY; i++) {
      const row: Tile[] = [];
      for (let z = 0; z < this.sizeX; z++) {
        const tile = new Tile(z, i, this.mineList, this.updateTiles.bind(this));
        row.push(tile);
      }
      this.tiles.push(row);
    }
  }

  private generateMineList(): void {
    if (this.mineList.length) this.mineList = [];

    while (this.mineList.length < this.totalMines) {
      const locationX = getRandomNumber(this.sizeX);
      const locationY = getRandomNumber(this.sizeY);
      const exists = !!this.mineList.find(mine => mine.x === locationX && mine.y === locationY);
      if (!exists) this.mineList.push({ x: locationX, y: locationY });
    }
  }

  private updateTiles(coords: { x: number, y: number }[]): void {
    coords.forEach(this.updateTile.bind(this));
  }

  private updateTile({ x, y }: { x: number, y: number }) {
    if(this.tiles[y] && this.tiles[y][x] && !this.tiles[y][x].isVisible) {
      this.tiles[y][x].makeVisible();
    }
  }

  public get TileInfo(): TileInfo[][] {
    return this.tiles.map(row => row.map(tile => tile.info));
  }
}

export default Grid;