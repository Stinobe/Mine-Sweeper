import GameEvents, { GameEvent } from "@/utils/EventDispatcher";

export type TileInfo = {
  isMine: boolean;
  isFlagged: boolean;
  isVisible: boolean;
  exploded: boolean;
  surrounding: number;
  makeVisible: () => void;
  toggleFlag: () => void;
  addComponentListener: (cb: (tile: TileInfo) => void) => void;
}

class Tile {
  public coords: { x: number, y: number };
  public isFlagged: boolean = false;
  public isVisible: boolean = false;
  public surrounding: number = 0;
  public exploded: boolean = false;
  public informer: (coords: { x: number, y: number }[]) => void;
  public componentCb: ((tile: TileInfo) => void)[] = [];

  private hasMine: boolean = false;

  constructor(x: number, y: number, mineList: {x: number, y: number}[], informer: (coords: {x: number, y: number}[]) => void) {
    this.coords = { x, y };
    this.informer = informer;
    this.hasMine = !!mineList.find(mine => mine.x === x && mine.y === y);
    mineList.forEach(mine => {
      if (this.surroundingCoords.find(coord => coord.x === mine.x && coord.y === mine.y)) this.surrounding += 1;
    });
    GameEvents.subscribe(GameEvent.OPEN_MINE, () => {
      if (!this.isVisible && this.hasMine) {
        this.makeVisible();
      }
    });
  }

  public get isMine(): boolean {
    return this.isVisible && this.hasMine;
  }

  public toggleFlag() {
    this.isFlagged = !this.isFlagged;
    GameEvents.trigger(GameEvent.TOGGLE_FLAG, this.isFlagged ? 1 : -1);
    this.informComponent();
  }

  public makeVisible() {
    if (!this.isFlagged && !this.isVisible) {
      this.isVisible = true;
      if (!this.isMine && this.surrounding === 0) {
        this.informSurroundings();
      } else if (this.isMine && !this.exploded) {
        this.exploded = true;
        GameEvents.trigger(GameEvent.OPEN_MINE);
      }
      this.informComponent();
    }    
  }

  public informSurroundings() {
    this.informer(this.surroundingCoords);
  }

  public addComponentListener(cb: (tile: TileInfo) => void): void {
    this.componentCb.push(cb);
  }

  private informComponent() {
    this.componentCb.forEach(cb => {
      cb(this.info);
    });
  }

  private get surroundingCoords(): { x: number, y: number }[] {
    const calc = [-1, 0, 1];
    const coords: { x: number, y: number }[] = [];

    for (let i = 0; i < calc.length; i++) {
      for (let y = 0; y < calc.length; y++) {
        if (Math.abs(calc[i] || calc[y])) {
          coords.push({ x: this.coords.x + calc[i], y: this.coords.y + calc[y] });
        }
      }
    }

    return coords.filter(coord => coord.x > -1 && coord.y > -1);
  };

  public get info(): TileInfo {
    return {
      isMine: this.isMine,
      isFlagged: this.isFlagged,
      isVisible: this.isVisible,
      exploded: this.exploded,
      surrounding: this.isVisible ? this.surrounding : 0,
      makeVisible: this.makeVisible.bind(this),
      toggleFlag: this.toggleFlag.bind(this),
      addComponentListener: this.addComponentListener.bind(this)
    }
  }

}

export default Tile;