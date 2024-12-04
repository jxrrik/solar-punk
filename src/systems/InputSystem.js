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