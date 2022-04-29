import Board from "@/models/Board";
import Grid from "@/models/Grid";
import { Debounce } from "@/utils/Debounce";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Optimize from "./Optimize";

type GameFormProps = {
  boards: Board[];
};

const GameForm: React.FC<GameFormProps> = ({ boards }: GameFormProps) => {
  const [isOptimized, setIsOptimized] = useState<boolean>(false);

  const toggleOptimized = (): void => {
    setIsOptimized(!isOptimized);
  };

  const [maxSize, setMaxSize] = useState<{ x: number; y: number }>(
    Grid.maxForScreen
  );

  const debouncer = new Debounce(() => {
    setMaxSize(Grid.maxForScreen);
  });

  window.addEventListener("resize", debouncer);

  const getSize = (board: {
    x: number;
    y: number;
    minesPercentage: number;
  }) => {
    const size = isOptimized ? maxSize : board;
    const { x, y } = size;
    const mines = Math.round(x * y * board.minesPercentage);
    return { x: size.x, y: size.y, mines };
  };

  return (
    <div className="min-w-max">
      <div className="flex flex-col gap-4 w-96">
        <Optimize
          onToggle={toggleOptimized}
          maxSize={maxSize}
          isOptimized={isOptimized}
        />
        {boards.map((board, i) => {
          const boardInfo = getSize({
            x: board.size.x,
            y: board.size.y,
            minesPercentage: board.minesPercentage,
          });
          return (
            <Link
              to={`/g/${boardInfo.x}/${boardInfo.y}/${boardInfo.mines}`}
              tabIndex={i}
              key={board.name}
              className="bg-white/40 px-5 py-3 rounded-md text-gray-700 transition-all shadow-sm hover:scale-110 hover:shadow-lg hover:bg-sky-600 hover:text-white dark:bg-black/40 dark:text-gray-200 dark:hover:bg-fuchsia-900">
              <p className="text-2xl mb-2">{board.name}</p>
              <p className="text-sm font-light opacity-70">
                {`${boardInfo.x} x ${boardInfo.y} board with ${boardInfo.mines} mines`}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GameForm;
