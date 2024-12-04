const fs = require("fs");
const path = require("path");

const projectStructure = {
  src: {
    components: {
      "Game.js": `
import React from "react";
import Player from "./Player";
import Tile from "./Tile";
import HUD from "./HUD";
import "./Game.css";

const Game = () => {
  return (
    <div className="game">
      <HUD />
      <div className="map">
        {[...Array(15)].map((_, row) =>
          [...Array(20)].map((_, col) => <Tile key={\`\${row}-\${col}\`} x={col} y={row} />)
        )}
        <Player />
      </div>
    </div>
  );
};

export default Game;
`,
      "Player.js": `
import React, { useState, useEffect } from "react";
import { TILE_SIZE } from "../constants/GameConfig";
import { handleInput } from "../systems/InputSystem";
import { movePlayer } from "../systems/MovementSystem";

const Player = () => {
  const [position, setPosition] = useState({ x: 10 * TILE_SIZE, y: 7 * TILE_SIZE });

  useEffect(() => {
    const onKeyDown = (event) => {
      setPosition((prev) => movePlayer(prev, handleInput(event)));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: TILE_SIZE,
        height: TILE_SIZE,
        backgroundColor: "black",
      }}
    />
  );
};

export default Player;
`,
      "Tile.js": `
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
        backgroundColor: x % 2 === y % 2 ? "green" : "darkgreen",
      }}
    />
  );
};

export default Tile;
`,
      "HUD.js": `
import React from "react";

const HUD = () => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, color: "white", padding: 10 }}>
      <h1>Farm RPG Simulator</h1>
      <p>Gold: 100 | Crops: 5</p>
    </div>
  );
};

export default HUD;
`,
    },
    systems: {
      "InputSystem.js": `
export const handleInput = (event) => {
  switch (event.key.toLowerCase()) {
    case "w":
      return { dx: 0, dy: -1 };
    case "a":
      return { dx: -1, dy: 0 };
    case "s":
      return { dx: 0, dy: 1 };
    case "d":
      return { dx: 1, dy: 0 };
    default:
      return { dx: 0, dy: 0 };
  }
};
`,
      "MovementSystem.js": `
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../constants/GameConfig";

export const movePlayer = (position, { dx, dy }) => {
  const newX = Math.max(0, Math.min(position.x + dx * TILE_SIZE, (MAP_WIDTH - 1) * TILE_SIZE));
  const newY = Math.max(0, Math.min(position.y + dy * TILE_SIZE, (MAP_HEIGHT - 1) * TILE_SIZE));
  return { x: newX, y: newY };
};
`,
    },
    constants: {
      "GameConfig.js": `
export const TILE_SIZE = 50;
export const MAP_WIDTH = 20; // 20 tiles
export const MAP_HEIGHT = 15; // 15 tiles
`,
    },
    styles: {
      "Game.css": `
body, html {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.game {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.map {
  position: relative;
  width: 100%;
  height: 100%;
}
`,
    },
  },
};

function createFiles(basePath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const currentPath = path.join(basePath, key);
    if (typeof value === "string") {
      fs.writeFileSync(currentPath, value.trim());
      console.log(`File created: ${currentPath}`);
    } else {
      fs.mkdirSync(currentPath, { recursive: true });
      console.log(`Directory created: ${currentPath}`);
      createFiles(currentPath, value);
    }
  }
}

const baseDir = path.join(__dirname, "src");
createFiles(baseDir, projectStructure);
