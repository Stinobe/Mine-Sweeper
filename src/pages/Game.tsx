import Game from "@/components/Game";
import Grid from "@/models/Grid";
import React from "react";
import { useParams } from "react-router-dom";

const GamePage: React.FC = () => {
  const params = useParams<{ x: string; y: string; mines: string }>();

  const minMines = Number(params.x) * Number(params.y) * 0.1;
  const maxMines = Number(params.x) * Number(params.y) * 0.4;

  let mines: number = Number(params.mines);

  if (mines < minMines) mines = minMines;
  if (mines > maxMines) mines = maxMines;

  const grid = new Grid(Number(params.x), Number(params.y), Number(mines));

  return <Game tiles={grid.TileInfo} />;
};

export default GamePage;
