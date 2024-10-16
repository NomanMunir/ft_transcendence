import { Ball } from "./Ball.js";
import { Player } from "./Player.js";
import { keyHandler, startCountdownWithDetails } from "./GameUtils.js";
import { updateState } from "../stateManager.js";
import { startGame } from "./GameLogic.js";
import { AI } from "./AI.js";

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

  const playerObjects = createPlayers(playerNames, canvas, ctx);
  document.addEventListener("keydown", (e) =>
  keyHandler(e, true, playerObjects)
  );
  document.addEventListener("keyup", (e) =>
  keyHandler(e, false, playerObjects)
  );
  updateState(
    {
      pongGame:
      {
        canvas,
        ctx,
        ball,
        winningScore: 6,
        playerObjects,
        gameOver: false,
      }
    }
  );
  const winner  = await startGameWithCountdownAndPromise();
  return winner;
}

export async function startGameWithCountdownAndPromise() {
  await startCountdownWithDetails();
  return new Promise((resolve) => {
    startGame(resolve);
  });
}

function createPlayers(playerNames, canvas, ctx)
{
  let playerObjects = [];

  
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
  if (playerNames.length === 1)
  {
    playerObjects.push(
      new AI(
        "AI",
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
    if (playerObjects[0].name === "AI")
        playerObjects[0].name = "AI (Player)";
  }
  if (playerNames.length >= 2) {
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
