import GameEvents, { GameEvent } from "@/utils/EventDispatcher";
import React, { useState } from "react";

const GameState: React.FC = () => {
  const [flags, setFlags] = useState<number>(0);

  GameEvents.subscribe(GameEvent.TOGGLE_STATE, num => {
    setFlags(flags + num);
  });

  return <div>{flags} / 015</div>;
};

export default GameState;
