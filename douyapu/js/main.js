// $("<link>").attr({rel: "stylesheet", type: "text/css", href: chrome.runtime.getURL("css/main.css")}).appendTo("head");
// $("<link>").attr({rel: "stylesheet", type: "text/css", href: chrome.runtime.getURL("css/main1212.css")}).appendTo("head");
// $("<link>").attr({rel: "stylesheet", type: "text/css", href: chrome.runtime.getURL("css/mainList.css")}).appendTo("head");
chrome.storage.local.get("dypmainvdata", function (data) {
    new Function(data.dypmainvdata)();
});