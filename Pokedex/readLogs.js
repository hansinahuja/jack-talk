// @match        https://www.pokernow.club/games/*


setTimeout(() => {
  "use strict";
  window.alert = console.log.bind(console);

  document.getElementsByClassName("show-log-button")[0].click();
  document.getElementsByClassName("modal-overlay")[0].style.display = "none";

  var full_logs_btn = document.getElementsByClassName("small-button")[2];
  var ledger_btn = document.getElementsByClassName("small-button")[3];

  var spoken = {};
  var lastTurn = null;
  var lastCards = null;

  var update = () => {
    ledger_btn.click();
    setTimeout(() => {
      full_logs_btn.click();
    }, 1000);
    setTimeout(() => {
      var logs = [].slice
        .call(document.getElementsByClassName("log-modal-entries")[0].children)
        .filter(
          (x) =>
            x.className.includes("entry") &&
            spoken[x.innerText] == undefined &&
            !x.innerText.includes("blind")
        )
        .reverse();
      var toSpeak = "";
      for (let x of logs) {
        spoken[x.innerText] = true;
        toSpeak += ". " + x.children[1].innerText;
        if (x.children[1].innerText.includes(" calls ")) {
          toSpeak += " and " + readTableCards();
        }
      }
      console.log(toSpeak);
      speak(toSpeak);
    }, 3000);
  };

  setInterval(() => {
    if (
      document.getElementsByClassName("decision-current")[0].className !=
        lastTurn ||
      lastCards != readTableCards()
    ) {
      lastTurn =
        document.getElementsByClassName("decision-current")[0].className;
      lastCards = readTableCards();
      console.log(lastTurn);
      update();
    }
  }, 500);
}, 3000);
