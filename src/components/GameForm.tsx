import Board from "@/models/Board";
import React from "react";
import { Link } from "react-router-dom";

type GameFormProps = {
  boards: Board[];
};

const GameForm: React.FC<GameFormProps> = ({ boards }: GameFormProps) => (
  <div className="min-w-max">
    <div className="flex flex-col gap-4">
      {boards.map((board, i) => (
        <Link
          to={`/g/${board.size.x}/${board.size.y}/${board.mines}`}
          tabIndex={i}
          key={board.name}
          className="bg-white/40 px-4 py-2 rounded-md text-gray-700 transition-all shadow-sm hover:scale-110 hover:shadow-lg hover:bg-sky-600 hover:text-white dark:bg-black/40 dark:text-gray-200 dark:hover:bg-fuchsia-900">
          <p className="text-2xl mb-2">{board.name}</p>
          <p className="text-sm font-light opacity-70">{board.description}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default GameForm;
