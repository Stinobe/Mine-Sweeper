import Game from "@/components/Game";
import Grid from "@/models/Grid";
import React from "react";
import { useParams } from "react-router-dom";

const GamePage: React.FC = () => {
  const params = useParams<{ x: string; y: string; mines: string }>();

  const grid = new Grid(
    Number(params.x),
    Number(params.y),
    Number(params.mines)
  );

  return <Game tiles={grid.TileInfo} />;
};

export default GamePage;
