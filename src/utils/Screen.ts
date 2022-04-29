const getMaxForScreen = (size: number, gap: number): { x: number, y: number } => {
  const { innerWidth, innerHeight } = window;
  const maxWidth = Math.floor(innerWidth * 0.9);
  const maxHeight = Math.floor(innerHeight * 0.9);
  const tileSize = size + gap;
  return {
    x: Math.floor(maxWidth / tileSize),
    y: Math.floor(maxHeight / tileSize)
  }
}

export {
  getMaxForScreen
};
