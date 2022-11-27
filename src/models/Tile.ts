const States: State[] = [State.DEFAULT, State.FLAGGED, State.MARKED];

const Tile = function (this: any, coords: Coords, isMine: boolean) {
  this.isVisible = false;
  let state = 0;
  let isBlocked = false;

  const makeVisible = (): void => {
    this.isVisible = true;
  };

  Object.defineProperty(this, "isVisible", {
    set: value => {
      if (!isBlocked) {
        this.isVisible = true;
        this.isBlocked = true;
      }
    },
  });

  const toggleState = (): void => {
    let newState = state + 1;
    if (newState === States.length) newState = 0;
    state = newState;
  };

  const output = {
    makeVisible,
    toggleState,
  };

  Object.defineProperties(output, {
    isVisible: {
      get: () => this.isVisible,
      enumerable: true,
    },
    isMine: {
      get: () => this.isVisible && isMine,
      enumerable: true,
    },
    isBlocked: {
      get: () => isBlocked,
    },
  });

  return output;
} as any as { new (coords: Coords, isMine: boolean): any };

const tile = new Tile({ x: 1, y: 1 }, true);
console.log("Before", tile);
setTimeout(() => {
  tile.makeVisible();
  console.log("After", tile);
}, 5000);

export default Tile;
