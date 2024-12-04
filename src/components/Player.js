import React, { useState, useEffect } from "react";
import { TILE_SIZE } from "../constants/GameConfig";
import SpriteSystem from "../systems/SpriteSystem";
import Debug from "./Debug";

const Player = () => {
  const [position, setPosition] = useState({
    x: Math.floor(window.innerWidth / 2) - TILE_SIZE / 2,
    y: Math.floor(window.innerHeight / 2) - TILE_SIZE / 2,
  });

  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const [keysPressed, setKeysPressed] = useState({});
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationState, setAnimationState] = useState("idle"); // Ex: "idle", "run"
  const [isFacingRight, setIsFacingRight] = useState(true); // Controle da direção do personagem
  const acceleration = 0.3;
  const maxSpeed = 5;
  const friction = 0.05;
  const frameRate = 100; // Tempo entre frames em milissegundos
  const totalFrames = SpriteSystem.getTotalFrames();

  const handleKeyDown = (event) => {
    setKeysPressed((prev) => ({ ...prev, [event.key.toLowerCase()]: true }));
  };

  const handleKeyUp = (event) => {
    setKeysPressed((prev) => ({ ...prev, [event.key.toLowerCase()]: false }));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let dx = velocity.dx;
      let dy = velocity.dy;

      // Atualiza a direção baseada no movimento horizontal
      if (keysPressed.a && !keysPressed.d) setIsFacingRight(false);
      if (keysPressed.d && !keysPressed.a) setIsFacingRight(true);

      // Aplica aceleração
      if (keysPressed.w) dy -= acceleration;
      if (keysPressed.s) dy += acceleration;
      if (keysPressed.a) dx -= acceleration;
      if (keysPressed.d) dx += acceleration;

      // Limita a velocidade máxima
      dx = Math.max(-maxSpeed, Math.min(maxSpeed, dx));
      dy = Math.max(-maxSpeed, Math.min(maxSpeed, dy));

      // Aplica fricção quando nenhuma tecla é pressionada
      if (!keysPressed.w && !keysPressed.s) dy *= 1 - friction;
      if (!keysPressed.a && !keysPressed.d) dx *= 1 - friction;

      setPosition((prev) => ({
        x: Math.max(0, Math.min(prev.x + dx, window.innerWidth - TILE_SIZE)),
        y: Math.max(0, Math.min(prev.y + dy, window.innerHeight - TILE_SIZE)),
      }));

      // Atualiza o estado da animação baseado no movimento
      setAnimationState(
        (keysPressed.w || keysPressed.s || keysPressed.a || keysPressed.d) &&
        (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1)
          ? "run"
          : "idle"
      );
      setVelocity({ dx, dy });
    }, 16);

    return () => clearInterval(interval);
  }, [velocity, keysPressed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames[animationState]);
    }, frameRate);

    return () => clearInterval(interval);
  }, [animationState]);

  const spriteUrl = SpriteSystem.getSpriteUrl(animationState, currentFrame);

  return (
    <>
      {/* Sombra */}
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y + TILE_SIZE * 0.4, // Ajuste no eixo Y para aproximar a sombra
          transform: "translate(-25%, -250%)",
          width: TILE_SIZE * 0.5, // Largura achatada
          height: TILE_SIZE * 0.13, // Altura achatada
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Cor e transparência da sombra
          borderRadius: "50%", // Forma circular achatada
          opacity: .8
        }}
      />
      {/* Personagem */}
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scaleX(${isFacingRight ? -1 : 1})`, // Inverte o sprite corretamente
          width: TILE_SIZE,
          height: TILE_SIZE,
          backgroundImage: `url(${spriteUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Debugger */}
      <Debug position={position} velocity={velocity} animationState={animationState} />
    </>
  );
};

export default Player;
