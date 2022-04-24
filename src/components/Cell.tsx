import { TileInfo } from "@/models/Tile";
import classes from "@/utils/Classes";
import { FireIcon, FlagIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { GameMode } from "./Game";

type CellProps = {
  tile: TileInfo;
  x: number;
  y: number;
  mode: GameMode;
};

const Cell: React.FC<CellProps> = ({ tile, x, y, mode }: CellProps) => {
  const [cell, setCell] = useState(tile);
  tile.addComponentListener(setCell);
  return (
    <div className="w-10 h-10 flex content-center justify-center relative">
      {cell.isVisible ? (
        <span
          className={classes(
            "absolute top-0 right-0 bottom-0 left-0 transition-colors grid justify-center content-center",
            cell.exploded
              ? "bg-red-400 dark:bg-red-800 text-white"
              : "bg-white/30 dark:bg-black/20"
          )}>
          <span className="inline-block align-bottom">
            {cell.isMine ? (
              <FireIcon className="h-5 w-5" />
            ) : (
              cell.surrounding || ""
            )}
          </span>
        </span>
      ) : (
        <span
          onClick={() => {
            if (mode === GameMode.SWEEP) {
              cell.makeVisible();
            } else if (mode === GameMode.FLAG) {
              cell.toggleFlag();
            }
          }}
          className={classes(
            "absolute top-0 right-0 bottom-0 left-0 transition-colors grid justify-center content-center bg-white/40 dark:bg-black/40",
            {
              "cursor-pointer":
                !cell.isFlagged || (cell.isFlagged && mode === GameMode.FLAG),
              "hover:bg-white/60":
                !cell.isFlagged || (cell.isFlagged && mode === GameMode.FLAG),
              "dark:hover:bg-black/60":
                !cell.isFlagged || (cell.isFlagged && mode === GameMode.FLAG),
            }
          )}>
          <span>
            {cell.isFlagged ? (
              <FlagIcon className="h-4 w-4 text-yellow-700 dark:text-yellow-300" />
            ) : (
              ""
            )}
          </span>
        </span>
      )}
    </div>
  );
};

export default Cell;
