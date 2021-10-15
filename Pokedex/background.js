chrome.action.onClicked.addListener(function (activeTab) {
    var newURL = "https://www.pokernow.club/";
    chrome.tabs.update(undefined, {
        url: newURL
    });
});