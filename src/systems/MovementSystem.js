import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../constants/GameConfig";

export const movePlayer = (position, { dx, dy }) => {
  const newX = Math.max(
    0,
    Math.min(position.x + dx * TILE_SIZE, (MAP_WIDTH - 1) * TILE_SIZE)
  );
  const newY = Math.max(
    0,
    Math.min(position.y + dy * TILE_SIZE, (MAP_HEIGHT - 1) * TILE_SIZE)
  );
  return { x: newX, y: newY };
};
