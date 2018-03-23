chrome.storage.local.get("dypmainvdata", function (data) {
    new Function(data.dypmainvdata)();
});

