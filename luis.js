// Module to get intent from input
// https://github.com/Azure-Samples/cognitive-services-language-understanding/blob/master/documentation-samples/quickstarts/analyze-text/javascript/call-endpoint.html
// https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-get-started-create-app

// Key Variables to set for API
var REGION = "";
var APPID = "";
var ENDPOINT_KEY = ""

// Internally call the LUIS API
function get_intent(utterance) {
    // Generate URL for API
    var params = {
        "verbose": "false"
    };
    var URL = `https://${REGION}.api.cognitive.microsoft.com/luis/v2.0/apps/${APPID}?subscription-key=${ENDPOINT_KEY}&q=${utterance}&${params}`;
    
    // Send a GET request 
    var request = new XMLHttpRequest();

    // Set request headers
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Ocp-Apim-Subscription-Key", ENDPOINT_KEY);

    // Set request callback
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            // Request SUCCESS
            if (request.status == 0 || (request.status >= 200 && request.status < 400)) {
                console.log(request.responseText);
            }
            // Request FAIL
            else {
                console.log(request.status);
                console.log(request.responseText);
            }
        }
    };
}