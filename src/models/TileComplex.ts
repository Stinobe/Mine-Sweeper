const TileStates: State[] = [State.DEFAULT, State.FLAGGED, State.MARKED];

const TileComplex = function (this: any, coords: Coords, isMine: boolean): any {
  let isVisible: boolean = false;

  const toggle = () => {
    isVisible = !isVisible;
  };

  const out = { toggle };

  Object.defineProperties(out, {
    coords: {
      value: coords,
    },
    isMine: {
      value: isVisible ? isMine : isVisible,
    },
    isVisible: {
      value: isVisible,
    },
  });

  return out;
} as any as { new (coords: Coords, isMine: boolean): any };

const tile = new TileComplex({ x: 1, y: 1 }, true);
console.log("Before", tile);
tile.toggle();
console.log("After", tile);
