import { Ball } from "./Ball.js";
import { Player } from "./Player.js";
import { startGame } from "./GameLogic.js";
import { keyHandler } from "./GameUtils.js";

export function startPongGame(playerNames, canvas) {
  const ctx = canvas.getContext("2d");
  const ball = new Ball(
    canvas.width / 2,
    canvas.height / 2,
    10,
    5,
    5,
    canvas,
    ctx
  );

  const playerObjects = createPlayers(playerNames, canvas, ctx);

  document.addEventListener("keydown", (e) =>
    keyHandler(e, true, playerObjects)
  );
  document.addEventListener("keyup", (e) =>
    keyHandler(e, false, playerObjects)
  );

  startGame(ctx, canvas, ball, playerObjects);
}

function createPlayers(playerNames, canvas, ctx) {
  let playerObjects = [];

  if (playerNames.length >= 2) {
    playerObjects.push(
      new Player(
        playerNames[0],
        0,
        (canvas.height - 100) / 2,
        10,
        100,
        "vertical",
        "w",
        "s",
        canvas,
        ctx
      )
    );
    playerObjects.push(
      new Player(
        playerNames[1],
        canvas.width - 10,
        (canvas.height - 100) / 2,
        10,
        100,
        "vertical",
        "ArrowUp",
        "ArrowDown",
        canvas,
        ctx
      )
    );
  }

  if (playerNames.length >= 3) {
    playerObjects.push(
      new Player(
        playerNames[2],
        (canvas.width - 100) / 2,
        0,
        100,
        10,
        "horizontal",
        "z",
        "x",
        canvas,
        ctx
      )
    );
  }

  if (playerNames.length === 4) {
    playerObjects.push(
      new Player(
        playerNames[3],
        (canvas.width - 100) / 2,
        canvas.height - 10,
        100,
        10,
        "horizontal",
        ",",
        ".",
        canvas,
        ctx
      )
    );
  }

  return playerObjects;
}
