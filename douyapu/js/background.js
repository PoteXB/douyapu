var newCid = "120000";
!function () {
    chrome.storage.local.get("dypbackv", function (e) {
        e = !$.isEmptyObject(e) ? e.dypbackv : "1.0.0.0";
        chrome.storage.local.get("dypjsonv", function (e1) {
            e1 = !$.isEmptyObject(e1) ? e1.dypjsonv : "1.0.0.0";
            chrome.storage.local.get("dypmainv", function (e2) {
                e2 = !$.isEmptyObject(e2) ? e2.dypmainv : "1.0.0.0";
                chrome.storage.local.get("dyppopv", function (e3) {
                    e3 = !$.isEmptyObject(e3) ? e3.dyppopv : "1.0.0.0";
                    chrome.storage.local.get("dypsetv", function (e4) {
                        e4 = !$.isEmptyObject(e4) ? e4.dypsetv : "1.0.0.0";
                        post(e, e1, e2, e3, e4);
                    });
                });
            });
        });
    });
    function post(e, e1, e2, e3, e4) {
        $.ajax({
            type: "post",
            // url: "http://192.168.3.116/api/combine",
            url: "http://xiaobaiszt.douyapu.com/api/combine",
            data: {backv: e, jsonv: e1, mainv: e2, popv: e3, setv: e4},
            dataType: "json",
            success: function (e) {
                if (e.length > 0) {
                    a(e);
                } else {
                    start()
                }
            },
            error: function () {
                b();
            }
        })
    }

    function a(e) {
        $.each(e, function (v, k) {
            var name = k.name;
            var url = k.link;
            var dataType = "html";
            var lurl = 'local/' + name + '.js';
            if (name == "jsonv") {
                dataType = "json";
                lurl = 'local/' + name + '.json';
            }
            var vname = "dyp" + name;
            var cname = "dyp" + name + "data";
            $.ajax({
                type: "get",
                // url: url,
                url: lurl + "1",
                dataType: dataType,
                success: function (e) {
                    chrome.storage.local.set({[cname]: e}, function () {
                        if (name == "backv") {
                            start();
                        }
                    });
                    chrome.storage.local.set({[vname]: k.version})
                },
                error: function () {
                    chrome.storage.local.get([vname], function (data) {
                        if ($.isEmptyObject(data)) {
                            $.get(lurl, function (e) {
                                chrome.storage.local.set({[cname]: e}, function () {
                                    if (name == "backv") {
                                        start();
                                    }
                                });
                            }, dataType);
                        }
                    });
                }
            })
        })
    }

    function b() {
        var arr = ["backv", "mainv", "popv", "jsonv", "setv"];
        $.each(arr, function (v, k) {
            var vname = "dyp" + k;
            var cname = "dyp" + k + "data";
            var dataType = "html";
            var lurl = 'local/' + k + '.js';
            if (k == "jsonv") {
                dataType = "json";
                lurl = 'local/' + k + '.json';
            }
            chrome.storage.local.get([vname], function (e) {
                if ($.isEmptyObject(e)) {
                    $.get(lurl, function (e) {
                        chrome.storage.local.set({[cname]: e}, function () {
                            if (k == "backv") {
                                start();
                            }
                        });
                    }, dataType);
                } else {
                    start();
                }
            });
        });
    }

    chrome.storage.local.set({
        dypSetting: {
            dypTop: 'show',
            dypMid: 'show'
        }
    });
    $.ajax({
        // url: "http://192.168.3.116/api/switchctrl",
        url: "http://xiaobaiszt.douyapu.com/api/switchctrl",
        success: function (e) {
            chrome.storage.local.set({dypSwitch: e});
        }
    });
}();

function start() {
    chrome.storage.local.get("dypbackvdata", function (data) {
        new Function(data.dypbackvdata)();
    });
}