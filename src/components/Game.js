import React from "react";
import Player from "./Player";
import Tile from "./Tile";
import HUD from "./HUD";
import { MAP_WIDTH, MAP_HEIGHT } from "../constants/GameConfig";
import "./Game.css";

const Game = () => {
  return (
    <div className="game">
      <HUD />
      <div className="map">
        {[...Array(MAP_HEIGHT)].map((_, row) =>
          [...Array(MAP_WIDTH)].map((_, col) => <Tile key={`${row}-${col}`} x={col} y={row} />)
        )}
        <Player />
      </div>
    </div>
  );
};

export default Game;
