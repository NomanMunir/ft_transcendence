import { Ball } from "./Ball.js";
import { Player } from "./Player.js";
import { keyHandler, startCountdownWithDetails } from "./GameUtils.js";
import { getState, updateState } from "../stateManager.js";
import { startGame } from "./GameLogic.js";

export async function startPongGame(playerNames, canvas)
{
  const { width, height } = canvas;
  const ctx = canvas.getContext("2d");
  const ball = new Ball(
    width / 2,
    height / 2,
    10,
    5,
    5,
    canvas,
    ctx
  );
  console.log(playerNames);
  const playerObjects = createPlayers(playerNames, canvas, ctx);
  document.addEventListener("keydown", (e) =>
  keyHandler(e, true, playerObjects)
  );
  document.addEventListener("keyup", (e) =>
  keyHandler(e, false, playerObjects)
  );
  updateState({canvas, ctx, ball, winningScore: 2, playerObjects, gameOver: false});
  await startCountdownWithDetails();
  return new Promise((resolve) => {
    startGame(resolve);
  })
}
function createPlayers(playerNames, canvas, ctx)
{
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