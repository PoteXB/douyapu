if (!localStorage.channelId1013) {
    if (typeof newCid != "undefined") {
        localStorage.channelId1013 = newCid;
    } else {
        localStorage.channelId1013 = "";
    }
}
var cid = localStorage.channelId1013;
chrome.storage.local.set({channelId1013:cid});
if (!localStorage.productId1013) {
    if (typeof newPid != "undefined") {
        localStorage.productId1013 = newPid;
    } else {
        localStorage.productId1013 = "";
    }
}
var productId = localStorage.productId1013;
chrome.storage.local.set({productId1013:productId});
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
var tongjiUrl = 'http://www.318000.com.cn';
function statisApi() {
    if (!(document.cookie.indexOf("newdailyActivity") > -1)) {
        var lefttime = setLeftTime(5);
        document.cookie = "newdailyActivity=" + escape(cid) + ";expires=" + lefttime.toGMTString();
        var sid1 = localStorage.sid1 ? localStorage.sid1 : 0;
        var t1 = localStorage.t1 ? localStorage.t1 : 0;
        $.ajax({
            url:tongjiUrl + "/index/Commoninterface/statisticsPlug",
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
chrome.runtime.setUninstallURL(tongjiUrl + "/uninstall.php?cid=" + cid);