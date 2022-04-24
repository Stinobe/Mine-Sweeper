import { TileInfo } from "@/models/Tile";
import classes from "@/utils/Classes";
import { ChevronLeftIcon, FireIcon, FlagIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cell from "./Cell";

type GameProps = {
  tiles: TileInfo[][];
};

export enum GameMode {
  SWEEP,
  FLAG,
}

const Game: React.FC<GameProps> = ({ tiles }: GameProps) => {
  // const [grid, setGrid] = useState<TileInfo[][]>(tiles);
  const [mode, setMode] = useState<GameMode>(GameMode.SWEEP);
  // subscriber(setGrid);

  const toggleMode = (): void => {
    if (mode === GameMode.SWEEP) {
      setMode(GameMode.FLAG);
    } else {
      setMode(GameMode.SWEEP);
    }
  };

  return (
    <>
      <div className="grid mb-4">
        <div onClick={toggleMode} className="flex justify-between">
          <Link to="/">
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <div className="flex dark:text-white">
            <span
              className={classes(
                "p-2 rounded-l-md",
                mode === GameMode.SWEEP
                  ? "bg-sky-600 dark:bg-fuchsia-900"
                  : "bg-white/20 opacity-40"
              )}>
              <FireIcon
                className={classes(
                  "h-5 w-5",
                  mode === GameMode.SWEEP ? "text-white" : ""
                )}
              />
            </span>
            <span
              className={classes(
                "p-2 rounded-r-md",
                mode === GameMode.FLAG
                  ? "bg-sky-600 dark:bg-blue-900"
                  : "bg-white/20 opacity-40"
              )}>
              <FlagIcon
                className={classes(
                  "h-5 w-5",
                  mode === GameMode.FLAG ? "text-white" : ""
                )}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="flex-col inline-flex gap-1">
        {tiles.map((row, y) => (
          <div className="inline-flex gap-1" key={`row${y}`}>
            {row.map((cell, x) => (
              <Cell
                tile={cell}
                x={x}
                y={y}
                mode={mode}
                key={`cell_${x}_${y}`}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
