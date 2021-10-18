var subscriptionKey = "<<your_key>>",
  serviceRegion = "eastus";
var SpeechSDK;
var recognizer, synthesizer;

var audio = document.createElement("audio");
var source = document.createElement("source");
source.src = "https://ekan5h.github.io/lofi-airplane/alert.wav";
source.type = "audio/wav";
audio.appendChild(source);

setTimeout(() => {
  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
  }
}, 1000);

var listen = (f = () => {}, e = ()=> {}) => {
  var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "<<your_key>>",
    "eastus"
  );

  var speechtxt = document.getElementById("speechtxt");
  speechtxt.innerText = "Listening...";
  audio.play();
  speechConfig.speechRecognitionLanguage = "en-US";
  var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizeOnceAsync(
    function (result) {
      speechtxt.innerText = ""; // result.text
      let i = 0;
      for (let word of result.text.split(" ")) {
        setTimeout(() => {
          speechtxt.innerText += " " + word;
        }, 200 * i);
        i++;
      }

      setTimeout(() => {
        audio.play();
      }, 200 * i);

      setTimeout(() => {
        bars.style.bottom = "-120px";
      }, 200 * i + 1000);

      window.console.log(result);

      recognizer.close();
      recognizer = undefined;
      f(result.text)
    },
    function (err) {
      speechtxt.innerText = ":(";
      setTimeout(() => {
        bars.style.bottom = "-120px";
      }, 1000);

      window.console.log(err);

      recognizer.close();
      recognizer = undefined;
      e(err);
    }
  );
};

var speak = (text) => {
  var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "<<your_key>>",
    "eastus"
  );

  speechConfig.speechRecognitionLanguage = "en-US";
  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
  synthesizer.speakTextAsync(
    text,
    (r) => {
      synthesizer.close();
      synthesizer = undefined;
    },
    (e) => {
      synthesizer.close();
      synthesizer = undefined;
    }
  );
};
