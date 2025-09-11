"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";
import GameBuilder, { Reason } from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(30)
  .carrotCount(20)
  .bugCount(20)
  .build();
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLAY❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WON 🎊";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST 💩";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickLister(() => {
  game.start();
});
