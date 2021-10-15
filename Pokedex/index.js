// @match        https://www.pokernow.club/games/*
(function () {
  "use strict";

  var style_css = `
      #bars {
          background: black;
          height: 80px;
          position: fixed;
          left: 0px;
          bottom: -120px;
          width: 100%;
          box-shadow: black 1px -5px 20px 2px;
          font-family: arial;
          font-size: x-large;
          color: #555;
          padding-left: 200px;
          padding-top: 50px;
          transition: 0.5s;
          z-index: 1000;
      }
  
      .bar {
      background: cyan;
          height: 3px;
          top: 50%;
          transform: translate(0%, -50%);
          position: absolute;
          width: 3px;
          animation: sound 0ms -800ms linear infinite alternate;
      }
  
      @keyframes sound {
          0% {
          opacity: .35;
              height: 3px;
          }
          100% {
              opacity: 1;
              height: 28px;
          }
      }
  
      .bar:nth-child(1)  { left: 101px; animation-duration: 948ms; }
      .bar:nth-child(2)  { left: 105px; animation-duration: 866ms; }
      .bar:nth-child(3)  { left: 109px; animation-duration: 814ms; }
      .bar:nth-child(4)  { left: 113px; animation-duration: 916ms; }
      .bar:nth-child(5)  { left: 117px; animation-duration: 800ms; }
      .bar:nth-child(6)  { left: 121px; animation-duration: 427ms; }
      .bar:nth-child(7)  { left: 125px; animation-duration: 882ms; }
      .bar:nth-child(8)  { left: 129px; animation-duration: 838ms; }
      .bar:nth-child(9)  { left: 133px; animation-duration: 974ms; }
      .bar:nth-child(10) { left: 137px; animation-duration: 884ms; }
      `;

  // var script = document.createElement("script");
  // script.src = "https://aka.ms/csspeech/jsbrowserpackageraw";
  // document.body.appendChild(script);

  var style = document.createElement("style");
  style.innerHTML = style_css;
  document.head.appendChild(style);

  var bars = document.createElement("div");
  bars.id = "bars";
  document.body.appendChild(bars);

  for (let i = 0; i < 10; i++) {
    var temp = document.createElement("div");
    temp.className = "bar";
    bars.appendChild(temp);
  }

  bars.innerHTML += "<p id='speechtxt'>Listening...</p>";

  // ------------------------------------------------------------------------------------------
  // DOM Modifications end here. Add js code below...
  // ------------------------------------------------------------------------------------------

  var handling = true;
  var speechtxt = document.getElementById("speechtxt");
  window.addEventListener(
    "keydown",
    function (event) {
      if (handling && event.keyCode == 32) {
        handling = false;
        bars.style.bottom = "0px";
        setTimeout(() => {
          listen(
            (response) => {
              // Add LUIS functoinality here
              // Check command dictionary in poker.js for list of intents
              // Entity is used for Bet-X, LUIS directly gets the bet amount
              // For other intents, entity is undefined
              [intent, entity] = get_intent(response);
              if (command[intent] == undefined) {
                throw Error;
              }
              speak(command[intent](entity));
              // speak(readTableCards());
              handling = true;
            },
            (err) => {
              speak("I could not catch that.");
              handing = true;
            }
          );
        }, 500);
      }
    },
    true
  );
})();
