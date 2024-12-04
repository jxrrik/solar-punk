const SpriteSystem = {
    getSpriteUrl: (animationState, currentFrame) => {
      // Gera o nome do arquivo com base no estado e no frame
      return `/sprites/player/red-ogre-${animationState}-${String(currentFrame).padStart(2, "0")}.png`;
    },
    getTotalFrames: () => ({
      idle: 4, // Número de frames na animação "idle"
      run: 6,  // Número de frames na animação "run"
      attack: 8, // Número de frames na animação "attack"
      die: 8, // Número de frames na animação "die"
      fall: 2, // Número de frames na animação "fall"
      hurt: 3, // Número de frames na animação "hurt"
    }),
  };
  
  export default SpriteSystem;
  