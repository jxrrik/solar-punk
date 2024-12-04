import React from "react";

const Debug = ({ position, velocity, animationState }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: 10,
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        borderRadius: "5px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
      }}
    >
      <div><strong>Position:</strong> {`(${Math.round(position.x)}, ${Math.round(position.y)})`}</div>
      <div><strong>Velocity:</strong> {`dx: ${velocity.dx.toFixed(2)}, dy: ${velocity.dy.toFixed(2)}`}</div>
      <div><strong>Animation:</strong> {animationState}</div>
    </div>
  );
};

export default Debug;
