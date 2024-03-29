import { TileInfo } from "@/models/Tile";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import Cell from "./Cell";
import IconButton from "./IconButton";
import GameState from "./State";

type GameProps = {
  tiles: TileInfo[][];
};

const Game: React.FC<GameProps> = ({ tiles }: GameProps) => {
  return (
    <>
      <div className="grid mb-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <IconButton label="Menu" icon={ChevronLeftIcon} />
          </Link>
          <GameState />
        </div>
      </div>
      <div className="flex-col inline-flex gap-1">
        {tiles.map((row, y) => (
          <div className="inline-flex gap-1" key={`row_${y}`}>
            {row.map((cell, x) => (
              <Cell tile={cell} x={x} y={y} key={`cell_${x}_${y}`} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Game;
