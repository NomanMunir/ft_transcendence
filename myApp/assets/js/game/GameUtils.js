export function drawBackground(ctx, canvas) {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height / 4,
    canvas.width / 2,
    canvas.height / 2,
    canvas.height
  );
  gradient.addColorStop(0, "#2a2a2a");
  gradient.addColorStop(1, "#4c4c4c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw dotted middle line
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function keyHandler(e, isPressed, playerObjects) {
  playerObjects.forEach((player) => {
    if (e.key === player.upKey) player.upPressed = isPressed;
    if (e.key === player.downKey) player.downPressed = isPressed;
  });
}
