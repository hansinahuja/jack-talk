// Module to get intent from input
// https://github.com/Azure-Samples/cognitive-services-language-understanding/blob/master/documentation-samples/quickstarts/analyze-text/javascript/call-endpoint.html
// https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-get-started-create-app

// Key Variables to set for API
var PROJECT_NAME = "macrohard"
var APPID = "<<your_appid>>";
var SUBSCRIPTION_KEY = "<<your_key>>";

// Internally call the LUIS API
function get_intent(utterance) {
    // Generate URL for API
    var params = {
        "verbose": "false"
    };
    var URL = `https://${PROJECT_NAME}.cognitiveservices.azure.com/luis/prediction/v3.0/apps/${APPID}/slots/staging/predict?verbose=true&show-all-intents=true&log=true&subscription-key=${SUBSCRIPTION_KEY}&query=${utterance}`
    
    // Send a GET request 
    var request = new XMLHttpRequest();
    request.open("GET", URL, false);
    request.send();

    // Parse the output
    output = JSON.parse(request.responseText);
    intent = output.prediction.topIntent;
    entity = output.prediction.entities.number;

    console.log(output);

    return [intent, entity];
}