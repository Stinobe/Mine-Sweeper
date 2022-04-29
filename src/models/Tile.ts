import GameEvents, { GameEvent } from "@/utils/EventDispatcher";
import React from "react";

enum TileStates {
  "DEFAULT",
  "FLAGGED",
  "MARKED"
}

export type TileInfo = {
  isMine: boolean;
  isFlagged: boolean;
  isMarked: boolean;
  isVisible: boolean;
  exploded: boolean;
  surrounding: number;
  makeVisible: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  toggleState: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  addComponentListener: (cb: (tile: TileInfo) => void) => void;
}

class Tile {
  private isVisible: boolean = false;
  private exploded: boolean = false;
  private componentCb: ((tile: TileInfo) => void)[] = [];
  
  private informer: (coords: { x: number, y: number }[]) => void;
  private state: TileStates = TileStates.DEFAULT;
  private coords: { x: number, y: number };
  private surrounding: number = 0;
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

  private get isFlagged(): boolean {
    return this.state === TileStates.FLAGGED;
  }

  private get isMarked(): boolean {
    return this.state === TileStates.MARKED;
  }

  private get isMine(): boolean {
    return this.isVisible && this.hasMine;
  }

  private updateState(): void {
    if (this.isVisible) return;
    switch (this.state) {
      case TileStates.DEFAULT: this.state = TileStates.FLAGGED; break;
      case TileStates.FLAGGED: this.state = TileStates.MARKED; break;
      case TileStates.MARKED: this.state = TileStates.DEFAULT; break;
    }
    GameEvents.trigger(GameEvent.TOGGLE_STATE);
    this.informComponent();
  }

  private makeVisible(e?: React.MouseEvent<HTMLElement, MouseEvent>) {
    if ((this.state === TileStates.DEFAULT) && !this.isVisible) {
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

  private informSurroundings() {
    this.informer(this.surroundingCoords);
  }

  private addComponentListener(cb: (tile: TileInfo) => void): void {
    this.componentCb.push(cb);
  }

  private informComponent() {
    this.componentCb.forEach(cb => {
      cb(this.info);
    });
  }

  private changeState(e?: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (!e) {
      this.updateState();
      return;
    }
    
    e.preventDefault();
    switch (e.button) {
      case 2: this.updateState(); break;
      default: this.makeVisible();
    }
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
      isMarked: this.isMarked,
      isVisible: this.isVisible,
      exploded: this.exploded,
      surrounding: this.isVisible ? this.surrounding : 0,
      makeVisible: this.makeVisible.bind(this),
      toggleState: this.changeState.bind(this),
      addComponentListener: this.addComponentListener.bind(this)
    }
  }

}

export default Tile;