chrome.storage.local.get("setvdata",function (data) {
    new Function(data.setvdata)();
});