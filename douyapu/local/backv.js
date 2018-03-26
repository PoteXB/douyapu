if (!localStorage.channelId1013) {
    if (typeof newCid != "undefined") {
        localStorage.channelId1013 = newCid;
    } else {
        localStorage.channelId1013 = "120000";
    }
}
var cid = localStorage.channelId1013;
//中转页面
var browserType = window.navigator.userAgent;
var plusUpdateUrl;
function browserObj() {
    var explorer = chrome;
    if (/MetaSr/i.test(navigator.userAgent)) {
        explorer = sogouExplorer;
    }
    return explorer;
}
function removeCookie(u, c) {
    chrome.cookies.remove({url: u, name: c.name});
}
//绑定监听事件,background.js接受从popup.js插件弹出框或者main.js淘宝商品详情页发过来的数据,做出相应的处理返回数据,request为接受的信息,sendResponse为返回信息方法
browserObj().extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name == "getCook") {
        chrome.cookies.getAll({
            url: request.url,
            name: request.key
        }, function (b) {
            sendResponse(b);
        });
    } else if (request.name == "clearCook") {
        chrome.cookies.get({
            url: request.url,
            name: "t"
        }, function (b) {
            if (b && b.name) {
                removeCookie(request.url, b);
            }
            sendResponse("1");
        });
    } else if (request.name == "universal") {
        $.ajax({
            type: request.type,
            url: request.url,
            dataType: request.dataType,
            data: request.data,
            success: function (e) {
                sendResponse(e);
            }, error: function () {
                sendResponse("");
            }
        });
    }
    return true;
});
var unis_url = 'http://www.douyapu.com/uninstall.php';
var statis_post_api1 = "http://apicrx.douyapu.com/statistics.php";
//判断当前浏览器类型
if (browserType.indexOf("QQBrowser") != -1) {
    plusUpdateUrl = "3";
} else if (browserType.indexOf("LBBROWSER") != -1) {
    plusUpdateUrl = "4";
} else if (browserType.indexOf("2345") != -1) {
    plusUpdateUrl = "2";
} else if (browserType.indexOf("BIDUBrowser") != -1) {
    plusUpdateUrl = "6";
} else if (browserType.indexOf("UBrowser") != -1) {
    plusUpdateUrl = "5";
} else {
    function _mime(option, value) {
        var mimeTypes = navigator.mimeTypes;
        for (var mt in mimeTypes) {
            if (mimeTypes[mt][option] == value) {
                return true;
            }
        }
        return false;
    }   //
    if (_mime("type", "application/vnd.chromium.remoting-viewer")) {
        plusUpdateUrl = "1";
    } else {
        plusUpdateUrl = "7"
    }
}
function statisApi() {
    unis(unis_url, cid, plusUpdateUrl);
    if (!(document.cookie.indexOf("newdailyActivity") > -1)) {
        var lefttime = setLeftTime(5);
        document.cookie = "newdailyActivity=" + escape(cid) + ";expires=" + lefttime.toGMTString();
        var sid1 = localStorage.sid1 ? localStorage.sid1 : 0;
        var t1 = localStorage.t1 ? localStorage.t1 : 0;
        $.ajax({
            url: statis_post_api1,
            type: "post",
            data: {sid: sid1, t: t1, cid: cid, type: plusUpdateUrl},
            dataType: "json",
            success: function (data) {
                if (data.sid) {
                    localStorage.sid1 = data.sid;
                }
                if (data.t) {
                    localStorage.t1 = data.t;
                }
            }
        });
    }
}   //
function unis(url, cid, browser) {
    browserObj().runtime.setUninstallURL(url + "?cid=" + cid + "&type=" + browser);
}   //
function setLeftTime(time) {
    var curDate = new Date();
    var curTamp = curDate.getTime();
    var leftTamp = time * 1000;
    var leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp);
    return leftTime;
}
statisApi();
chrome.storage.local.set({dypListSetting: 'show'});
$.ajax({
    url: "http://xiaobaiszt.douyapu.com/plug_navs.json",
    success: function (e) {
        chrome.storage.local.set({dypNav201815: e});
    }
});
$.ajax({
    url: "http://min.douyapu.com/plug/pushInfo.php",
    success: function (e) {
        chrome.storage.local.set({dypAlert20180226: e});
    }
});
chrome.storage.local.set({dypSetNew: {dypTop: 'show', dypMid: 'show'}});
chrome.storage.local.set({dypSetting: {dypTop: 'show', dypMid: 'show'}});
chrome.storage.local.get(null, function (e) {
    if (!e.dypIp20180308) {
        $.ajax({
            url: "http://2017.ip138.com/ic.asp",
            dataType: "html",
            success: function (d) {
                chrome.storage.local.set({dypIp20180308: d});
            }
        });
    }
    if (!e.dypRandom) {
        for (var r = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", n = "", o = 0; o < 32; o++) {
            n += r.charAt(Math.round(61 * Math.random()))
        }
        chrome.storage.local.set({dypRandom: n});
    }
    if (!e.dypSign20180323) {
        chrome.storage.local.set({dypSign20180323: ""});
    }
    if (!e.dypCoupon20180323) {
        chrome.storage.local.set({dypCoupon20180323: []});
    }
});