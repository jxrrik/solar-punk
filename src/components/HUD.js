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
