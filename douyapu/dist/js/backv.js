localStorage.channelId1013||("undefined"!=typeof newCid?localStorage.channelId1013=newCid:localStorage.channelId1013="120000");var plusUpdateUrl,cid=localStorage.channelId1013,browserType=window.navigator.userAgent;function browserObj(){var e=chrome;return/MetaSr/i.test(navigator.userAgent)&&(e=sogouExplorer),e}function removeCookie(e,t){chrome.cookies.remove({url:e,name:t.name})}browserObj().extension.onMessage.addListener(function(t,e,a){return"getCook"==t.name?chrome.cookies.getAll({url:t.url,name:t.key},function(e){a(e)}):"clearCook"==t.name?chrome.cookies.get({url:t.url,name:"t"},function(e){e&&e.name&&removeCookie(t.url,e),a("1")}):"universal"==t.name&&$.ajax({type:t.type,url:t.url,dataType:t.dataType,data:t.data,success:function(e){a(e)},error:function(){a("")}}),!0});var unis_url="http://www.douyapu.com/uninstall.php",statis_post_api1="https://ext.statis.xixixihaha.com/index/Commoninterface/statisticsPlug";if(-1!=browserType.indexOf("QQBrowser"))plusUpdateUrl="3";else if(-1!=browserType.indexOf("LBBROWSER"))plusUpdateUrl="4";else if(-1!=browserType.indexOf("2345"))plusUpdateUrl="2";else if(-1!=browserType.indexOf("BIDUBrowser"))plusUpdateUrl="6";else if(-1!=browserType.indexOf("UBrowser"))plusUpdateUrl="5";else{var _mime=function(e,t){var a=navigator.mimeTypes;for(var o in a)if(a[o][e]==t)return!0;return!1};plusUpdateUrl=_mime("type","application/vnd.chromium.remoting-viewer")?"1":"7"}function statisApi(){if(unis(unis_url,cid,plusUpdateUrl),!(-1<document.cookie.indexOf("newdailyActivity"))){var e=setLeftTime(5);document.cookie="newdailyActivity="+escape(cid)+";expires="+e.toGMTString();var t=localStorage.sid1?localStorage.sid1:0,a=localStorage.t1?localStorage.t1:0;$.ajax({url:statis_post_api1,type:"post",data:{sid:t,t:a,cid:cid,type:plusUpdateUrl},dataType:"json",success:function(e){e.sid&&(localStorage.sid1=e.sid),e.t&&(localStorage.t1=e.t)}})}}function unis(e,t,a){browserObj().runtime.setUninstallURL(e+"?cid="+t+"&type="+a)}function setLeftTime(e){var t=(new Date).getTime(),a=1e3*e,o=new Date;return o.setTime(a+t),o}statisApi(),chrome.storage.local.set({dypListSetting:"show"}),$.ajax({url:"http://xiaobaiszt.douyapu.com/plug_navs.json",success:function(e){chrome.storage.local.set({dypNav201815:e})}}),$.ajax({url:"http://xiaobaiszt.douyapu.com/pushAct",success:function(e){chrome.storage.local.set({dypAlert20180226:e})}}),chrome.storage.local.set({dypSetNew:{dypTop:"show",dypMid:"show"}}),chrome.storage.local.set({dypSetting:{dypTop:"show",dypMid:"show"}}),chrome.storage.local.get(null,function(e){e.dypIp20180308||$.ajax({url:"http://2018.ip138.com/ic.asp",dataType:"html",success:function(e){chrome.storage.local.set({dypIp20180308:e})}});var t=["dypAlert20180226","dypIp20180308","dypListSetting","dypNav201815","dypSetNew","dypSetting","dypSwitch","dypbackvdata","dypjsonvdata","dypmainvdata","dyppopvdata","dypsetvdata","dypbackv","dypjsonv","dypmainv","dyppopv","dypsetv"],r=[];$.each(e,function(a){var o=1;$.each(t,function(e,t){if(t==a)return o=0,!1}),o&&r.push(a)}),chrome.storage.local.remove(r)});