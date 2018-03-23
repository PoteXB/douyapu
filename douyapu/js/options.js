chrome.storage.local.get("dypsetvdata", function (data) {
    new Function(data.dypsetvdata)();
});