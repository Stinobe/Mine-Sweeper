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
        <div className="absolute left-0 right-0 top-0 bottom-0 animate-ping bg-white/40 dark:bg-black/40 rounded-full"></div>
      )}
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
