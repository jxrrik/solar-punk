import React from "react";
import { TILE_SIZE } from "../constants/GameConfig";

const Tile = ({ x, y }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x * TILE_SIZE,
        top: y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundColor: "green", // Cor sólida para o mapa
      }}
    />
  );
};

export default Tile;
