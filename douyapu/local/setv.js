var cssStyle = '*{margin:0;padding:0}a,body{font:400 12px "微软雅黑","黑体","宋体",verdana;color:#666}img{display:block;border:0}a{text-decoration:none;cursor:pointer;color:#666}a:hover{text-decoration:none!important}li,ul{list-style-type:none}.clear:after{content:"";display:block;clear:both}.fl{float:left}.fr{float:right}.block{display:block}.hide{display:none}input{outline:0}body,html{width:100%;height:100%}#dy_set{width:100%;height:100%;color:#666}#conent_wrap,#footer_wrap,#header_wrap{width:100%;box-sizing:border-box}#content,#footer,#header{width:1400px;margin:0 auto;box-sizing:border-box}#header_wrap{border-bottom:1px solid #e51d32}#header{height:139px;box-sizing:border-box;padding:30px 0}#header .logo img{width:211px;height:60px}#header .middle_box{width:660px;height:50px;position:relative;margin-left:100px}#header .search_box{width:100%;height:100%}#searchText{font-size:18px;color:#666;text-indent:5px;float:left;width:590px;height:50px;box-sizing:border-box;border:1px solid #e51d32}#header .searchBtn{float:left;width:70px;height:50px;box-sizing:border-box;border:none}#header .host_box{position:absolute;left:0;top:50px;color:#000;line-height:44px}#header .hot_list li{float:left}#header .other_box{height:50px}#header .other_box ul{height:100%}#header .other_box li{float:left;margin-left:32px}#header .other_box li a:before{content:"";display:inline-block;height:100%;width:0;vertical-align:middle}#header .other_box li a{display:block;height:100%;vertical-align:middle}#header .other_box .icon{display:inline-block;vertical-align:middle}#header .other_box .title{font-size:26px;color:#e51d32;vertical-align:middle}#header .bigTitle{float:right;margin-top:20px}#header .bigTitle a{font-size:26px}#content_wrap{min-height:calc(100% - 290px)}#content{padding-top:14px}#content .set_title{color:#e61c32;border-bottom:1px solid #cfcfcf}#content .set_title h3{display:inline-block;line-height:45px;border-bottom:1px solid #e61c32;font-size:24px;font-family:inherit;color:inherit;margin-top:20px;margin-bottom:10px;font-weight:500}#content .viewBox{margin-left:500px}#content .misstext{transition:all .3s;opacity:0;filter:alpha(opacity=0)}#content .misstext p{height:30px;font-size:20px;line-height:30px;text-align:center}#content .misstext p span{margin-right:10px;line-height:1em;font-weight:700;border-radius:3px;padding:5px 10px 5px 16px;display:inline-block;color:#fff;background-color:#1fa970}#content .setBox{width:100%;box-sizing:border-box}#content .setList{padding:25px 0;border-top:1px solid #cfcfcf}#content .setList:hover{background-color:#FBFBFB}#content .setList:nth-child(1){border-top:1px solid transparent}#content .toolset{width:100%}#content .setBox .title{min-width:180px;line-height:36px;font-size:18px;font-weight:700}#content .setBox .set_ct{line-height:36px}#content .setBox .set_ct label{height:28px;line-height:28px}#content .setBox .set_ct label input{top:4px;vertical-align:-2px}#content .marginLeft{margin-left:70px}#footer_wrap{background-color:#7c797a}#footer{color:#c3c2c2;padding:20px 0;height:150px}#footer .moreLink{width:100%}#footer .link_list{width:100%;text-align:center}#footer .link_list li{display:inline-block;font-size:26px;height:64px;width:230px;text-align:center}#footer .link_list li a{color:#c3c2c2;font-size:26px;line-height:64px}#footer .copyright{margin-top:10px}#footer .cp{width:100%;font-size:14px;text-align:center;line-height:36px}';
var oHead = document.getElementsByTagName('HEAD').item(0);
var oStyle = document.createElement("style");
oStyle.appendChild(document.createTextNode(cssStyle));
oHead.appendChild(oStyle);
$("body").append(`<div id="dy_set">
    <!--头部豆芽铺logo-->
    <div id="header_wrap">
        <div id="header">
            <div class="logo fl">
                <a href="https://www.douyapu.com/" title="">
                    <img src="data:image/png;base64,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" alt="豆芽">
                </a>
            </div>
            <div class="bigTitle">
                <a href="https://www.douyapu.com/">前往铺子</a>
            </div>
        </div>
    </div>
    <!--内容-->
    <div id="content_wrap">
        <div id="content" class="clear">
            <div class="set_title clear">
                <h3 class="fl">购物助手设置</h3>
                <div class="viewBox fl">
                    <div class="misstext">
                        <p><span>修改成功！</span>您所做的选择在下个页面生效！</p>
                    </div>
                </div>
            </div>
            <div class="setBox fl">
                <!--工具栏设置-->
                <div class="toolset setList clear">
                    <p class="title fl">顶部工具栏显示</p>
                    <div class="set_ct fl">
                        <label class="radio-inline">
                            <input type="radio" name="dypTop" id="dypTop1" value="show" data-douyababapaopao="open1">开启
                        </label>
                        <label class="radio-inline marginLeft">
                            <input type="radio" name="dypTop" id="dypTop2" value="hidden" data-douyababapaopao="close1">关闭
                        </label>
                    </div>
                </div>
                <!--单品优惠券推送设置-->
                <div class="tsyhq setList clear">
                    <p class="title fl">相关优惠券显示</p>
                    <div class="set_ct fl">
                        <label class="radio-inline">
                            <input type="radio" name="dypMid" id="dypMid1" value="show" data-douyababapaopao="open2">开启
                        </label>
                        <label class="radio-inline marginLeft">
                            <input type="radio" name="dypMid" id="dypMid2" value="hidden" data-douyababapaopao="close2">关闭
                        </label>
                    </div>
                </div>
                <!--推荐优惠券弹窗推送设置-->
                <div class="tstc setList clear hide">
                    <p class="title fl">优惠券推送弹窗</p>
                    <div class="set_ct fl">
                        <label class="radio-inline">
                            <input type="radio" name="tstc" id="tstc1" value="show" data-douyababapaopao="open3">开启
                        </label>
                        <label class="radio-inline marginLeft">
                            <input type="radio" name="tstc" id="tstc2" value="hidden" data-douyababapaopao="close3">7日内不再推送
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);
var loginApiUrl = {loginTypeUrl: "https://www.douyapu.com"};
var setting;
chrome.storage.local.get("dypSetNew", function (e) {
    setting = !$.isEmptyObject(e) ? e.dypSetNew : {dypTop: 'show', dypMid: 'show'};
    showNowSet(setting);
});

//打开选项页面显示当前的设置方法
function showNowSet(s) {
    var tl;
    $.each(s, function (key, item) {
        tl = document.getElementsByName(key);
        $.each(tl, function (index, val) {
            if (val.value == item) {
                $(val).attr("checked", "ture");
            }
        });
    });
}

//将用户设置的值存储到local  方法
function setStorage() {
    var tool;
    $.each(setting, function (key) {
        tool = document.getElementsByName(key);
        $.each(tool, function (index, val) {
            if (val.checked == true) {
                setting[val.name] = val.value;
            }
        });
    });
    chrome.storage.local.set({"dypSetNew": setting});
}

var setBoxTimer; //延时器
//选择框点击绑定事件    点击之后弹出提示保存成功区域, 并执行存储local 方法
$(".setBox input").click(function () {
    clearTimeout(setBoxTimer);
    $('.misstext').css({
        'opacity': '1',
        'filter': 'alpha(opacity= 100)'
    });
    setBoxTimer = setTimeout(function () {
        $('.misstext').css({
            'opacity': '0',
            'filter': 'alpha(opacity= 0)'
        });
    }, 3000);
    setStorage();
});