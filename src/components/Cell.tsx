import { TileInfo } from "@/models/Tile";
import classes from "@/utils/Classes";
import TouchEvent from "@/utils/Touch";
import {
  FireIcon,
  FlagIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";

type CellProps = {
  tile: TileInfo;
  x: number;
  y: number;
};

const Cell: React.FC<CellProps> = ({ tile }: CellProps) => {
  const [cell, setCell] = useState(tile);
  tile.addComponentListener(setCell);

  const [hasInteraction, setHasInteraction] = useState<boolean>(false);

  const touchEvent = new TouchEvent(cell.makeVisible, cell.toggleState, () => {
    setHasInteraction(true);
    setTimeout(() => {
      setHasInteraction(false);
    }, 400);
  });

  return (
    <div className="w-10 h-10 flex content-center justify-center relative">
      {hasInteraction && (
        <div
          className={classes(
            "absolute -left-1 -right-1 -top-1 -bottom-1 animate-ping md:hidden rounded-full",
            cell.isFlagged
              ? "bg-yellow-700/40 dark:bg-yellow-300/40"
              : "bg-white/40 dark:bg-black/40",
            cell.isMarked
              ? "bg-blue-700/40 dark:bg-blue-500/40"
              : "bg-white/40 dark:bg-black/40"
          )}></div>
      )}
      {cell.isVisible ? (
        <span
          className={classes(
            "absolute top-0 right-0 bottom-0 left-0 transition-colors grid justify-center content-center",
            cell.exploded
              ? "bg-red-400 dark:bg-red-800 text-white"
              : "bg-white/30 dark:bg-black/20",
            cell.isFlagged && cell.isMine
              ? "bg-green-600 dark:bg-green-700"
              : ""
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
          onTouchStart={touchEvent.start}
          onTouchEnd={touchEvent.end}
          onClick={touchEvent.click}
          onContextMenu={touchEvent.context}
          className={classes(
            "absolute top-0 right-0 bottom-0 left-0 transition-colors grid justify-center content-center bg-white/40 dark:bg-black/40",
            {
              "cursor-pointer": true,
              "hover:bg-white/60": true,
              "dark:hover:bg-black/60": true,
            }
          )}>
          <span>
            {cell.isFlagged && (
              <FlagIcon className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
            )}
            {cell.isMarked && (
              <QuestionMarkCircleIcon className="h-6 w-6 text-blue-700 dark:text-blue-500" />
            )}
          </span>
        </span>
      )}
    </div>
  );
};

export default Cell;
