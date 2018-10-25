chrome.storage.local.get("mainvdata",function (data) {
    new Function(data.mainvdata)();
});