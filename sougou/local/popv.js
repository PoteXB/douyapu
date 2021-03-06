var oHead = document.getElementsByTagName('HEAD').item(0);
var cssStyle = '*{box-sizing:border-box;cursor:default}blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,legend,li,ol,p,pre,td,textarea,th,ul{margin:0;padding:0}body{font:12px "Microsoft Yahei",sans-serif;color:#545454}img{display:block;border:0}a{text-decoration:none;color:#545454;display:inline-block;cursor:pointer}img{border:0;cursor:pointer}li,ul{list-style-type:none}.clear{zoom:1}.clear:after{visibility:hidden;clear:both;display:block;content:"";height:0}.clear:before{content:" ";display:table}.clear:after{content:"";display:block;clear:both}.fl{float:left}.fr{float:right}.fs-14{font-size:14px}.fs-12{font-size:12px}.fw-bold{font-weight:700}.c-ff3e3e{color:#ff3e3e}.td-through{text-decoration:line-through}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb:hover{background:#666}::-webkit-scrollbar-thumb{background:#cdcdcd;border-radius:12px}::-webkit-scrollbar-track{background:#f0f0f0}body{width:398px;height:528px}#header{padding:13px 0 0 15px}#header>div{height:24px;float:left;line-height:24px}.header-search{position:relative;border:1px solid #aaa;margin-left:16px;width:146px}.header-search span{text-align:center;height:22px;display:inline-block;line-height:24px;margin-left:7px;position:relative;cursor:pointer;color:#666}.header-search i{position:absolute;width:0;height:0;border:5px solid transparent;border-top-color:#545454;top:9px;right:-14px}.header-search input{display:inline-block;border:none;outline:0;height:17px;width:96px;line-height:22px;padding:0 21px 0 13px;cursor:text;font-size:12px;color:#545454;font-family:"Microsoft Yahei",sans-serif;margin-top:-1px}.header-search button{display:block;width:14px;height:13px;position:absolute;right:7px;top:5px;background:url(../image/popimg.png) 0 -25px;border:none;outline:0;cursor:pointer}.header-search ul{position:absolute;background-color:#fff;border:1px solid #D5D5D5;left:-1px;top:30px;z-index:222}.header-search li{cursor:pointer;width:48px;text-align:center}.header-search li:hover{background-color:#eee}.header-login{margin-left:20px;position:relative}.header-login-icon{display:inline-block;width:19px;height:18px;background:url(../image/popimg.png) -338px 0;margin:0 4px 0 0;vertical-align:-4px}.header-login-icon:hover{background:url(../image/popimg.png) -357px 0}.header-login-mark{cursor:pointer;line-height:26px}.header-login-ways{background-color:#FFF;position:absolute;box-shadow:0 3px 8px rgba(0,0,0,.3);left:-6px;top:26px;z-index:222}.header-login-ways p{line-height:16px}.header-login-ways p:hover{background-color:#eee}.header-login-ways a{padding:2px 8px;display:block;height:20px;width:68px;text-align:center;vertical-align:middle}.header-login-ways b{display:inline-block;margin-right:8px;vertical-align:-3px;width:14px;height:14px;background-image:url(../image/popimg.png)}.header-login-ways b.qq{background-position:-29px -23px}.header-login-ways b.wb{background-position:-69px -26px}.header-login-ways b.wx{background-position:-49px -24px}.header-setting b{display:inline-block;height:16px;width:18px;background:url(../image/popimg.png) -122px 0;cursor:pointer;margin:4px 0 0 15px}.header-setting b:hover{background:url(../image/popimg.png) -104px 0}.nav{border-top:2px solid #FE3E3E;margin-top:13px;padding:15px 0 25px 13px;width:405px;background-color:#fafafa}.nav li{float:left;font-size:14px;margin-right:23px;cursor:pointer;height:20px;line-height:20px;position:relative}.nav li.active{color:#fc394c;font-weight:700;line-height:21px}.nav li.active b{display:block}.nav b{display:none;position:absolute;width:20px;height:0;border-top:2px solid #fc394c;left:0;bottom:-4px}#content{position:relative}.content-box{position:absolute;color:#d4d4d4;padding:0 13px 0 13px;height:376px;width:398px;overflow:auto;background-color:#fafafa}.content-box li{border:1px solid #E7E7E7;padding:14px;margin-bottom:9px;position:relative;border-radius:2px;background-color:#fff;height:110px;width:372px}.content-box li:hover{border-color:#BDBCBC}.content-img{width:80px;height:80px}.content-title{color:#545454;height:32px;line-height:16px;overflow:hidden;width:240px;margin-top:-3px;cursor:pointer;font-size:14px}.content-price{margin:10px 0 14px 0;height:19px}.content-price span{display:inline-block;height:19px}.content-border{border-left:1px solid #C1C1C1;height:11px!important;width:0;margin:0 3px}.content-type{line-height:8px}.content-btn{color:#fff;background-color:red;width:60px;height:24px;line-height:24px;text-align:center;position:absolute;right:14px;bottom:11px;cursor:pointer;border-radius:2px}.content-close{width:20px;height:19px;position:absolute;right:-1px;top:-1px;background:url(../image/popimg.png) -92px -25px}.content-close:hover{background:url(../image/popimg.png) -112px -25px}.content-active-img{width:177px;height:72px}.content-active-box{width:150px;color:#545454}.content-active-title{font-size:14px;overflow-x:hidden;text-overflow:ellipsis;width:150px;white-space:nowrap;position:relative;top:-4px;font-weight:700;cursor:pointer}.content-active-text{height:28px;line-height:14px;overflow:hidden;color:#878787;font-size:12px;margin-top:4px}.content-active-time{margin-top:7px}.content-box li.content-active-li{height:98px;padding:13px;margin-bottom:17px}.footer{position:fixed;bottom:0;left:0;width:100%;background:#fff;padding:0 13px;height:40px}.footer-icon,.footer-logo{float:left;height:40px}.footer-border{float:left;height:16px;border-left:1px solid #c1c1c1;margin:12px 14px 0 13px}.footer-logo b{display:inline-block;width:56px;height:14px;background:url(../image/popimg.png) -376px 0;margin-top:13px}.footer-icon{width:288px}.footer-icon>div{float:left}.All-shop-logo{margin:5px 0 0 3px;height:16px}.All-shop-name{margin-top:3px;width:288px;font-size:12px;color:#666;line-height:12px}.All-shop-name a{float:left}.footer-icon a.shop_logo{margin-right:26px;float:left;width:16px;height:16px;background:center center no-repeat}.All-shop-name .shop_three_name{margin:0 7px 0 12px}.All-shop-name .shop_last_name{margin-right:0}.tbTitle{margin:0}.tmTitle{margin:0 0 0 17px}.jdTitle{margin:0 0 0 18px}.snTitle{margin:0 0 0 18px}.gmTitle{margin:0 0 0 18px}.yhdTitle{margin:0}.ymTitle{margin:0}.footer-icon a:hover{opacity:.5}.footer-icon a.tb{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABEVBMVEX/RQD/VQD/VAD/RQD/RQD/VQD/VQD////+RgD/RQD/QwD/SgD8////UwD/TQD/PQD/MwD/LAD/UQD/LgD90sH+49X92sn9y7P8n3z8eUb/QQH/PwD/OgD/OAD9/Pr9+fb+9vH+7ev+6N780bz9z7b9zLb8xrL+wqv+w6b7r5b8rYv+qYT9nXX9mXL+knH9lmn8j179iVb+hFL+gEv8fkX8ZTn9bin9ZCn+UBL+PgX/TQL+RwD/DAD+/fj+8uj91cT+0cT8yav8vaX9uJr+spH8ooz9m4f9lHn8onD7m2v7kGr8iWj9cFL+d079cjT8WDH9aC/9WS37ayr9WSH/Zx78Yxr+Wg3/Vwz7OgD8LAD/AQBbThY0AAAABnRSTlPn5ublSkmb2EzAAAAA3klEQVQY003BBW4DMRAAwA3dXmzHcIxhZuYyM+P/H1KpUqTMQCah7UlkIKlxovHQ0HL/kmBw/hF8zokpRSypZgCPXOYP2fDqpF4dEJIDI+6UbsrIKv2HHrNCCvxr+l0tuPgav6+aOI9ALFjTH9VqRbt1d44TCTSY5cdTp4v2/dMZjk1YG79tZ3ZhoV33OjhSsFbL/PVxn+DAO+3ixITo5bDwc4BHWHLLFj6aoNqst31uOJfebYsVVwKyxF8Sqcztwqo03iQFSpSgG51QEehK0g2k9J1QEF0HSEN2Tyr9BwwsHAF+24CqAAAAAElFTkSuQmCC)}.footer-icon a.tm{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEXnIQkUAQBsCgLnIQnnIQkAAAD///+/GQWSEAMzAgApAgBkBkEFAAAABHRSTlPa/VEeHsmOkgAAADxJREFUCNdjMHABA2YGFgjDgcEFCoCMNCBAZbi4pbiQyphVAjLOfSVDaASI0RrKEAoFDKIQOpBBFcIIAgAvbCXKUBf6NQAAAABJRU5ErkJggg==)}.footer-icon a.jd{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEXIFiLGCxjIFiLIFiLIFiLDAA3JFSH///++AADKFyTAAADPND3IDxu6AAD88fHhe4L79PPrqKzqpKnkjZPQN0DOLjjIEx/GExnFChLDAAvDAAnzzc/ooaTnmp7lk5fjio/ihYvhgYXfd37fdnzHCxe9AAD7+fb22Nn01dPdcHfaZW3VU1jTRk/MJC/FDxXFAg+thuh3AAAABnRSTlPy8ufaQvJeQstuAAAAnklEQVQY02XP5xKCMBAE4FDMXoDQuzRB7OX9304TcUaH+/nN3N0usy32M5bNTP43JmOciyd5DhFVXHCmoLwN90sXBxnthQZKkPo4AL3jaXACuGEjiwQ70kAK4rmWW5TGF/yIBI3INnplRKph+oAnz2+I52pZyaviiAKNfPT6qOGdgKsDhECn3hp5m7iUT200uEswoloIFb1W0VflVvVfDrkLeWhVic0AAAAASUVORK5CYII=)}.footer-icon a.sn{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABKVBMVEU0LCo0LCo0LCozKyk0LCo2LikyKin+//8UFi7/wQD/vQAZGS4dGi0rJiswKSn6twH/ywBEPDkKDTEPEDAQEi85LylbRyVHOSUvJyUmHhylfBf/0gD4swDM2Pb/8Kz/4YAABTMHCzEhHi49My0jHywmIitLPSePbBkFBQ3KlQzBjQz8uwP/yAH/4AD/2QD/xQD2qADnowDj7v////a5wdb/98zi3cb//6//8KH/95T/83ZWWGD/2Vf/6E08OkfEnjotIy9IPCr/4yj9yShRQCgSESZmUSUtJSF5YB6DZBw2KRuPaRqVeBecfhabdxZxVRP/xBC8jRAdEw/Pmw7hugzHpwzvuAfxsQT/6QD/zgD/tgD7rADlqQDYmgDAfgClbwCaaQCZaQB1TwCt1mA6AAAABHRSTlPmSknnIl/z/wAAAONJREFUGNMtj1WSw0AMRCe7g+YYEzvMDMvMzLxhuv8hMuNEP+p+pZLUYANAUZoaNm5Dj9TchYKEEh5hmrX8Hzdj5RyIgJh+fPk0Av3t1S3gGAfyTb9l6Akp6FWpxgGyPSYxDiSjZuJ7ADXZb/xXO4nxd/vPlb8AtP1mvTtP759PWbtRqgBIyy19eJJM7n10jPrTGYDYfpbS5Liys309yt9G+VLqDXYJ2SLkdGLm4/ysUmJXh6nUwVGzRuNR8bl69z5jQXfxcFkMAYKymS3/ehmr6MTwOhxWlIIj1CaIcCIKr+JHlgjxGuxWKE4IAAAAAElFTkSuQmCC)}.footer-icon a.gm{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABd1BMVEX////0AEfrANXhAMLvAVf0ADT1AOvyi9HnAM/eAb7ZALXbAqnjAI70AD3zACT0ABv+9fryAOPjAMjZALHcAKPdAJ7rAXD0AkzyAELxADf0ACn0APj1APL2w+z2vervAN/zoN7tANv6utn4p9b7wdX5sNL2mMvxdsPbDbvpP7PVAK/1aaruT6jRAKT5h5/jEZ/lG5veAJngAJHkAIjyNIXqF4DyKX3nAHvhAHjlAHHuAGvvAGPlAF/qAFz0AS/zABTyAA3yAAD8w//1G/383/n96/f6yvT92e/yaubwiuL7xN/uZ97xktnqXtfrENb6tdH5q8/tdM3tb8nyg8fofsbtaMbfKsL6l7rsWLnxf7fbGbfbDbP6lbLwXrD5iK3hD6rsdqn3cqXdEaPVAJ/vRp3tPZ3iAJfZAJfyRpLlC5HvOpDYAI/pGo3vLYrLAIndAIfmHYX2RoTgAIPtDXb1OXLzGmvdAGrnAGf0EVPpAFHlAEr0Dj/pADp7RWp1AAAA+0lEQVQY0x3I05bDAAAFwBu3Yd0ktW27Xdu2bevj95zO48AvZJJGymIgAz6z2zU6glu7YOWHQwZY1u3Co91+uRuPGynKsECaWRZisch5vJ6N5PTYxBTpM6PWCCHn507mYM1gljLA0Y7iI4bEOoQHzPMWNDs3OOKQyMO7ZtrhjWg1v19D0XTpJR/jbKdWHjRdvvr5PL+rX2+tLB/aBDi1TfwFcVbBzPZqrmADwRxgErhPIf0kli4KkOQ9hI9RTiES2a+LIvRe1iS/mZ7VxfFwsNKooa93fyX1y0kQ79Wqw9HGQJEVhmEkgiCcdIvuINsf9BRF1ruMJqkavfQPwcooj5IhmYMAAAAASUVORK5CYII=)}.footer-icon a.yhd{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEXkAQ3kAQ3kAQ3kAQ3kAQ3////97u/yhoz//f3+9/j+8/T72NrpLjjnHynmFiHmDxr96er2rbH0mZ7zjZPsSFDlCRX84+T7293609X6zdD6zM/4wcT1n6Twc3nuY2ruXmXsUVnqN0DoIy3hh8HbAAAABHRSTlPm50pJ6bzg4AAAAHpJREFUGNNFzNcWhCAMBFB0iShFrNt3Lf//kZoBYV5gbnIibkLG2H6WZ726Gyp9Pldvx3tDHf8AXhlNRM8ITpmGOJ8IVr10zdBH8M5OWBkA4SY2VIY/cX4ZvoAlwwMwJWgJ2RKsAfYEYwAPYHmj19wLURZy7iqO4Xl5AKNwBsrOpFT/AAAAAElFTkSuQmCC)}.footer-icon a.ym{margin-right:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAn1BMVEXd3d3d3d3d3d3d3d3///8AAAD09PT4uWYECAk9Pz/w8fH99erf4OD98d/74L67vLz3yYiEhYX8yIF0dnf3rk0lJycWGBj39/f9+/Xo6ejt7Obi4+T98uPZ2trT1NT45sWztLWztLT727OusLD/4aydo6f51qT91J2YmZh2eHdlanFnaGn9uFxOT1D4rE72pT7ynjItLS8qKywpKysQEREiCK4aAAAABHRSTlPy59pC0FRzugAAAIpJREFUGNNlz1UOxDAMBNC09TRJacvLzIz3P9sqVknqfNlPsmwLxxad2I6wXOrEtYTgIvl8M88UgmH4hgJ0C8HvTgSMKzCZn65A0EICFFDTBtYozYjXwBmaBsCqBtOUSuFSgT+ivS62i2wSzRjC+Eic3evAQKF83tJUPuKlX6+NZJ7LDV/ae673/h9Y/QiUNuWLZAAAAABJRU5ErkJggg==)}';
var oStyle = document.createElement("style");
oStyle.appendChild(document.createTextNode(cssStyle));
oHead.appendChild(oStyle);
$("body").append(`<div id="header" class="clear">
    <div class="header-logo"><a href="https://www.douyapu.com" target="_blank"><img src="data:image/png;base64,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" alt=""></a></div>
    <div class="header-search">
        <span data-id="dyp" data-type=1>豆芽铺<i></i></span>
        <input type="text" maxlength="10">
        <button></button>
        <ul style="display: none">
            <li data-id="dyp">豆芽铺</li>
            <li data-id="jd">京　东</li>
            <li data-id="tm">天　猫</li>
            <li data-id="tb">淘　宝</li>
            <li data-id="sn">苏　宁</li>
            <li data-id="ym">亚马逊</li>
            <li data-id="mg">蘑菇街</li>
        </ul>
    </div>
    <div class="header-login">
        <b class="header-login-icon"></b>
        <span class="header-login-mark c-6c6c6c">登录</span>
        <div class="header-login-ways" style="display: none">
            <p>
                <a href="https://www.douyapu.com/user/login?type=qq" target="_blank"><b class="qq"></b>QQ</a>
            </p>
            <p>
                <a href="https://www.douyapu.com/user/login?type=sina" target="_blank"><b class="wb"></b>微博</a>
            </p>
            <p>
                <a href="https://www.douyapu.com/user/login?type=weixin" target="_blank"><b class="wx"></b>微信</a>
            </p>
        </div>
    </div>
    <div class="header-setting"><b></b></div>
</div>
<div id="nav">
    <ul class="nav clear">
        <li class="active" data-name="new" id="defaultCoupon" data-douya="1">豆芽推荐<b></b></li>
        <li data-name="active" data-douya="2" id="activeNav">限时活动<b></b></li>
        <li data-name="zhe" data-douya="3">折扣榜<b></b></li>
        <li data-name="hot" data-douya="4">热门榜<b></b></li>
        <li data-name="collect" data-douya="5">收藏<b></b></li>
        <li data-name="down">下载<b></b></li>
    </ul>
</div>
<div id="content">
    <ul class="content-box" id="new" style="display: block" data-switch=1>
    </ul>
    <ul class="content-box" id="active" style="display: none" data-switch=1>
    </ul>
    <ul class="content-box" id="zhe" style="display: none" data-switch=1>
    </ul>
    <ul class="content-box" id="hot" style="display: none" data-switch=1>
    </ul>
    <ul class="content-box" id="collect" style="display: none">
    </ul>
</div>
<div id="footer">
    <div class="footer clear">
        <div class="footer-logo"><b></b></div>
        <div class="footer-border"></div>
        <div class="footer-icon">
        	<div class="All-shop-logo">
        		<a href="https://www.taobao.com/" class="tb shop_logo" target="_blank"></a>
        		<a href="https://www.tmall.com/" class="tm shop_logo" target="_blank"></a>
        		<a href="https://www.jd.com/" class="jd shop_logo" target="_blank"></a>
        		<a href="https://www.suning.com/" class="sn shop_logo" target="_blank"></a>
        		<a href="http://www.gome.com.cn/" class="gm shop_logo" target="_blank"></a>
        		<a href="http://www.yhd.com/" 	  class="yhd shop_logo" target="_blank"></a>
        		<a href="https://www.amazon.cn/" class="ym shop_logo" target="_blank"></a>
        	</div>
        	<div class="All-shop-name">
        		<a href="https://www.taobao.com/" class="shop_title tbTitle" target="_blank">淘宝</a>
        		<a href="https://www.tmall.com/" class="shop_title tmTitle" target="_blank">天猫</a>
        		<a href="https://www.jd.com/" class="shop_title jdTitle" target="_blank">京东</a>
        		<a href="https://www.suning.com/" class="shop_title snTitle" target="_blank">苏宁</a>
        		<a href="http://www.gome.com.cn/" class="shop_title gmTitle shop_last_name" target="_blank">国美</a>
				<a href="http://www.yhd.com/" 	  class="shop_title yhdTitle shop_three_name" target="_blank">一号店</a>
        		<a href="https://www.amazon.cn/" class="shop_title ymTitle shop_last_name" target="_blank">亚马逊</a>
        	</div>
</div>`);
var versionNum = "1.3";
var popUrl;
var dypSwitch;
var newNowpage = 1;
var zheNowpage = 1;
var hotNowpage = 1;
var activeNowpage = 1;
var useTTT;
var domArr = [$("#new"), $("#active"), $("#zhe"), $("#hot")];
chrome.storage.local.get("dypjsonvdata", function (e) {
    popUrl = {
        clickCollect: e.dypjsonvdata.popUrlClickCollect,
        getCollect: e.dypjsonvdata.popUrlGetCollect,
        new: e.dypjsonvdata.popUrlNew,
        search: e.dypjsonvdata.popUrlSearch,
        zhe: e.dypjsonvdata.popUrlZhe,
        hot: e.dypjsonvdata.popUrlHot,
        active: e.dypjsonvdata.popUrlActive,
        website: e.dypjsonvdata.website
    };
    chrome.storage.local.get("dypSwitch", function (e) {
        dypSwitch = e.dypSwitch;
        //活动是否显示开关
        var activeSwitch = JSON.parse(dypSwitch).browserColumn.value;
        if (activeSwitch == "false") {
            $("#active").remove();
            $("#activeNav").remove();
        }
        //获取登录状态和名称图片
        chrome.cookies.get({"url": popUrl.website, "name": "loginScreenName"}, function (e) {
            if (e && e.value) {
                chrome.cookies.get({"url": popUrl.website, "name": "img_url"}, function (e) {
                    $(".header-login-icon").css({
                        "backgroundImage": "url(" + decodeURIComponent(e.value) + ")",
                        "backgroundPosition": '0 0',
                        "backgroundSize": "cover",
                        "borderRadius": "50%"
                    });
                    $(".header-login-mark").html("退出");
                    $(".header-login-ways").hide();
                    $(".header-login-mark").click(function () {
                        chrome.cookies.set({"url": "https://.douyapu.com/", "name": "TTTTT", "value": "", "expirationDate": -1});
                        chrome.cookies.set({"url": "https://.douyapu.com/", "name": "loginScreenName", "value": "", "expirationDate": -1}, function () {
                            history.go(0);
                        });
                    });
                })
            } else {
                var sett;
                $('.header-login').on({
                    mouseenter: function () {
                        clearTimeout(sett);
                        sett = setTimeout(function () {
                            $(".header-login-ways").show();
                        }, 300)
                    },
                    mouseleave: function () {
                        clearTimeout(sett);
                        sett = setTimeout(function () {
                            $(".header-login-ways").hide();
                        }, 300);
                    }
                });
            }
        });
        // 绑定滚动事件
        $.each(domArr, function (v, k) {
            var rowHeight = 119;
            if (k.attr("id") == "active") {
                rowHeight = 115;
            }
            k.on("scroll", function () {
                if (k.data("switch") == 1) {
                    var allHeight = rowHeight * k.children().length;
                    if ((k.scrollTop() + k.height()) == allHeight) {
                        getCoupon();
                    }
                }
            })
        });
        $("#nav").on("click", "li", function () {
            $("#nav li").removeClass("active");
            $(this).addClass("active");
            if ($(this).data("name") == "down") {
                window.open(popUrl.website + "#download");
            } else {
                var dom = $(this).data("name");
                $("#content ul").hide();
                $("#" + dom).show();
                if ($("#" + dom).children("li").length == 0) {
                    if ($(this).data("name") == "collect") {
                        getUseId();
                    } else {
                        getCoupon();
                    }
                }
            }
        });
        $("#defaultCoupon").click();
        //设置页面
        $(".header-setting b").click(function () {
            window.open("options.html");
        });
        //搜索选择不同平台
        $(".header-search").on("click", "span", function () {
            if ($(this).data("type") == 1) {
                $(".header-search ul").show();
                $(this).data("type", 0);
            } else {
                $(".header-search ul").hide();
                $(this).data("type", 1);
            }
            $(document).on("click", function (e) {
                var hos = $(e.target).closest('.header-search span').length;
                var hos1 = $(e.target).closest('.header-search ul').length;
                if (!hos && !hos1) {
                    $(".header-search span").data("type", 1);
                    $(".header-search ul").hide();
                }
            });
        });
        //选择不同平台
        $(".header-search").on("click", "li", function () {
            $(".header-search span").html($(this).html() + "<i></i>");
            $(".header-search span").data("id", $(this).data("id"));
            $(".header-search span").data("type", 1);
            $(".header-search ul").hide();
        });
        //搜索点击
        $(".header-search button").click(function () {
            var q = trim($(".header-search input").val());
            if (q) {
                var url = "";
                var obj = {
                    "dyp": popUrl.website + "coupon/search?val=" + encodeURIComponent(q),
                    "jd": "https://search.jd.com/Search?enc=utf-8&keyword=" + q,
                    "tm": "https://list.tmall.com/search_product.htm?q=" + q,
                    "tb": "https://s.taobao.com/search?q=" + q,
                    "sn": "https://search.suning.com/" + q + "/",
                    "ym": "https://www.amazon.cn/s/field-keywords=" + q,
                    "mg": "http://list.mogujie.com/s?q=" + encodeURIComponent(q)
                };
                $.each(obj, function (v, k) {
                    if ($(".header-search span").data("id") == v) {
                        url = k;
                    }
                });
                window.open(url);
            }
        });
        //搜索回车
        $(".header-search input").on("keyup", function () {
            if (event.keyCode == 13) {
                $(".header-search button").click();
            }
        });
        //获得推荐优惠券的方法
        function getCoupon() {
            var type = $("#nav li.active").data("name");
            var requestData = {};
            var requestUrl = "";
            if (type == "new") {
                requestData = {ownCount: newNowpage, version: versionNum};
                requestUrl = popUrl.new;
                $("#new").data("switch", 0);
            } else if (type == "zhe") {
                requestData = {ownCount: zheNowpage};
                requestUrl = popUrl.zhe;
                $("#zhe").data("switch", 0);
            } else if (type == "hot") {
                requestData = {ownCount: hotNowpage};
                requestUrl = popUrl.hot;
                $("#hot").data("switch", 0);
            } else if (type == "active") {
                requestData = {page: activeNowpage};
                requestUrl = popUrl.active;
                $("#active").data("switch", 0);
            }
            $.ajax({
                url: requestUrl,
                type: "post",
                dataType: "json",
                data: requestData,
                success: function (e) {
                    dataShow(e, type);
                },
                error: function () {

                }
            });
        }

        // 数据拼接
        function dataShow(data, type) {
            if (type == "active") {
                if (data && data.status == 1 && data.results.length > 0) {
                    var oli1 = "";
                    $.each(data.results, function (key, value) {
                        var time1 = value.act_begin.split("T")[0];
                        var time2 = value.act_end.split("T")[0];
                        oli1 += `<li class="clear content-active-li">
                            <div class="fl">
                                <a href="${value.act_link}" target="_blank">
                                    <img src="http://xiaobaiszt.douyapu.com/image/activeImage/${value.act_img}" alt="" class="content-active-img">
                                </a>
                            </div>
                            <div class="fr content-active-box">
                                <a href="${value.act_link}" target="_blank">
                                    <p class="content-active-title" title="${value.act_name}">${value.act_name}</p>
                                </a>
                                <a href="${value.act_link}" target="_blank">
                                    <p class="content-active-text" title="${value.act_desc}">${value.act_desc}</p>
                                </a>
                                <p class="content-active-time">${time1}&nbsp;&nbsp;${time2}</p>
                            </div>
                        </li>`;
                    });
                    $("#active").append(oli1);
                    $("#active").data("switch", 1);
                    activeNowpage += 1;
                }
            } else {
                if (data && data.status == 1 && data.results.length > 0) {
                    var oli = "";
                    $.each(data.results, function (key, value) {
                        value = JSON.parse(value.item);
                        var webWay; //存储来源
                        if (value.item.tmall == "1") {
                            webWay = '天猫';
                        } else if (value.item.tmall == "0") {
                            webWay = '淘宝';
                        }
                        oli += `<li class="clear">
                        <div class="fl">
                            <a href="${popUrl.website}coupon/transfer?type=1&item=${value.item.itemId}" target="_blank">
                                <img src="https://${value.item.picUrl}_80x80.jpg" alt="" class="content-img">
                            </a>
                        </div>
                        <div class="fr">
                            <a href="${popUrl.website}coupon/transfer?type=1&item=${value.item.itemId}" target="_blank">
                                <p class="content-title" title="${value.item.title}">${value.item.title}</p>
                            </a>
                            <p class="content-price">
                                <span class="fw-bold c-ff3e3e fs-14"><span class="fs-12">¥</span>${numSub(value.item.discountPrice, value.amount)}</span>
                                <span class="content-border"></span>
                                <span class="td-through">¥${value.item.discountPrice}</span>
                            </p>
                            <div class="clear">
                                <span class="fl content-type">${webWay}</span>
                                <a href="${popUrl.website}coupon/transfer?item=${value.item.itemId}" class="fr content-btn" target="_blank">去领券</a>
                            </div>
                        </div>
                    </li>`;
                    });
                    if (type == "new") {
                        $("#new").append(oli);
                        $("#new").data("switch", 1);
                        newNowpage += data.results.length;
                    } else if (type == "zhe") {
                        $("#zhe").append(oli);
                        $("#zhe").data("switch", 1);
                        zheNowpage += data.results.length;
                    } else if (type == "hot") {
                        $("#hot").append(oli);
                        $("#hot").data("switch", 1);
                        hotNowpage += data.results.length;
                    }
                }
            }
        }

        //获取用户id
        function getUseId() {
            chrome.cookies.get({
                "url": popUrl.website,
                "name": "TTTTT"
            }, function (e) {
                if (e && e.value) {
                    useTTT = e.value;
                    getClloct(useTTT, 0);
                } else {
                    $("#collect").html('<p style="text-align: center;margin-top:40%;color: #999;">未登录 , 请点击上方登录</p>');
                }
            });
        }

        //获取收藏数据
        function getClloct(data, num) {
            $.ajax({
                url: popUrl.getCollect,
                type: "post",
                timeout: 5000,
                data: {userId: data, ownNo: num},
                dataType: "json",
                success: function (res) {
                    if (res && res.results && res.results.length > 0) {
                        collectShow(res);
                    } else {
                        $("#collect").html('<p style="text-align: center;margin-top:40%;color: #999;">亲爱的客官，您还没有收藏过商品哦～</p>');
                    }
                },
                error: function () {
                    $("#collect").html('<p style="text-align: center;margin-top:40%;color: #999;">请稍后刷新试试...</p>');
                },
                complete: function (status) {
                    if (status == 'timeout') {
                        $("#collect").html('<p style="text-align: center;margin-top:40%;color: #999;">请稍后刷新试试...</p>');
                    }
                }
            });
        }

        //收藏展示
        function collectShow(data) {
            if (data && data.status == 1 && data.results.length > 0) {
                var oli = "";
                $.each(data.results, function (key, value) {
                    value = JSON.parse(value.item);
                    var webWay; //存储来源
                    if (value.item.tmall == "1") {
                        webWay = '天猫';
                    } else if (value.item.tmall == "0") {
                        webWay = '淘宝';
                    }
                    oli += `<li class="clear">
                    <div class="fl">
                        <a href="${popUrl.website}coupon/transfer?type=1&item=${value.item.itemId}" target="_blank">
                            <img src="https://${value.item.picUrl}_80x80.jpg" alt="" class="content-img">
                        </a>
                    </div>
                    <div class="fr">
                        <a href="${popUrl.website}coupon/transfer?type=1&item=${value.item.itemId}" target="_blank">
                            <p class="content-title" title="${value.item.title}">${value.item.title}</p>
                        </a>
                        <p class="content-price">
                            <span class="fw-bold c-ff3e3e fs-14"><span class="fs-12">¥</span>${numSub(value.item.discountPrice, value.amount)}</span>
                            <span class="content-border"></span>
                            <span class="td-through">¥${value.item.discountPrice}</span>
                        </p>
                        <div class="clear">
                            <span class="fl content-type">${webWay}</span>
                            <a href="${popUrl.website}coupon/transfer?item=${value.item.itemId}" class="fr content-btn" target="_blank">去领券</a>
                        </div>
                    </div>
                    <div class="content-close" data-id="${value.item.itemId}"></div>
                </li>`;
                });
                $("#collect").append(oli);
            }
        }

        //收藏商品点击删除方法
        $("#collect").on("click", ".content-close", function () {
            var deleteId = $(this).data("id");
            var that = $(this);
            $.ajax({
                type: "post",
                url: popUrl.clickCollect,
                data: {
                    userId: useTTT,
                    itemId: deleteId,
                    cancel: 1
                },
                dataType: 'json',
                success: function () {
                    that.parent().animate({
                        opacity: 0,
                        left: -450
                    }, 500, function () {
                        that.parent().remove();
                        if ($('#collect>li').length == 0) {
                            $("#collect").html('<p style="text-align: center;margin-top:40%;color: #999;">亲爱的客官，您还没有收藏过商品哦～</p>');
                        }
                    })
                }
            });
        });
    });
});
chrome.browserAction.setBadgeText({
    "text": ""
});
//公共方法
//去掉浮点数的相减方法
function numSub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    e = Math.pow(10, Math.max(c, d));
    return (mul(a, e) - mul(b, e)) / e;
}
function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {
    }
    try {
        c += e.split(".")[1].length;
    } catch (f) {
    }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
// 去掉字符串前后空格
function trim(str) {
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
}