chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "getText") {
        var text = document.documentElement.innerText;
        sendResponse({txt: text});
    } else {
        sendResponse({});
    }
});
