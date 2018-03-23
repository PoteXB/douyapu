<?php if (!defined('THINK_PATH')) exit(); /*a:5:{s:77:"E:\douyapu\browser_web_douyapu\application/../template/index\index\index.html";i:1517914302;s:82:"E:\douyapu\browser_web_douyapu\application/../template/index\..\common\header.html";i:1519366561;s:79:"E:\douyapu\browser_web_douyapu\application/../template/index\..\common\nav.html";i:1518155652;s:82:"E:\douyapu\browser_web_douyapu\application/../template/index\..\common\banner.html";i:1518317920;s:82:"E:\douyapu\browser_web_douyapu\application/../template/index\..\common\footer.html";i:1516759923;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1"/>
    <title>豆芽购物助手</title>
    <meta name="description" content="豆芽铺是一家为了使得用户有更平等购物体验的电商导购网站，提供给用户全全面的实时优惠券信息！">
    <meta name="keywords" content="折扣,优惠,51返利,什么值得买,淘宝,天猫,京东,值得买,购物党,购物助手,返利,返现,优惠券工具,惠惠">
    <link rel="SHORTCUT ICON" href="/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/public/static/css/common.css"/>
    <!-- 轮播图插件 -->
    <script type="text/javascript" src="/public/static/js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/public/static/js/angular.min.js"></script>
</head>
<body>
<div class="fixedtool">
    <div>
        <a href="/#download">
            <b class="icon2"></b>
            <div class="t">下载购物助手</div>
            <div class="x"></div>
        </a>
        <a>
            <b class="icon3"></b>
            <div class="t">下载APP</div>
            <div class="x"></div>
            <div class="appTc">
                <img src="/public/static/img/index/apptan.png" alt="">
            </div>
        </a>
        <a href="//shang.qq.com/wpa/qunwpa?idkey=07df4060e4b8ca7215881d58e29bdaad66177f17a11a82484c3dfa9168ebc2d2" target="_blank">
            <b class="icon5"></b>
            <div class="t">在线客服</div>
            <div class="x"></div>
        </a>
        <div>
            <b class="icon4" style="display: none"></b>
        </div>
    </div>
</div>
<script>
    $(".fixedtool .icon3").parent().hover(function () {
        $(this).find(".appTc").show();
    }, function () {
        $(this).find(".appTc").hide();
    })
</script>
<!--底部广告栏-->
<div class="bottom-ad dypslideInLeft dypanimated">
    <div></div>
    <i></i>
</div>
<div class="new-add">
    <img src="/public/static/img/newAdd.png" alt="">
    <div class="new-add-X"><img src="/public/static/img/index/cancel.png" alt=""></div>
</div>
<script>
    $(document).ready(function () {
        setTimeout(function () {
            if (document.cookie.indexOf("add=1") == -1) {
                function douyaCreateScript(t, m) {
                    var myScript = document.createElement("script");
                    myScript.type = "text/javascript";
                    myScript.async = false;
                    myScript.appendChild(document.createTextNode(`
                                var _czc = _czc || [];
                                _czc.push(["_setAccount", "1264352198"]);
                                _czc.push(["_trackEvent", '${m}', "弹出"]);
                            `));
                    document[t].appendChild(myScript);
                }   //打点统计代码向页面插入点击script
                !function () {
                    douyaCreateScript("body", "支付宝红包");
                    var cnzzCreateScript = document.createElement("script");
                    cnzzCreateScript.type = 'text/javascript';
                    cnzzCreateScript.async = false;
                    cnzzCreateScript.src = "https://s13.cnzz.com/z_stat.php?id=1264352198&web_id=1264352198";
                    document.body.appendChild(cnzzCreateScript);
                }();    //打点统计代码
                var curDate = new Date();
                var curTamp = curDate.getTime();
                var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
                var passedTamp = curTamp - curWeeHours;
                var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
                var leftTime = new Date();
                leftTime.setTime(leftTamp + curTamp);
                document.cookie = "add=1;expires=" + leftTime;
                $(".new-add").show();
                $(".new-add-X").click(function () {
                    $(".new-add").hide()
                });
                $(".bottom-ad").show();
                $(".bottom-ad div").click(function () {
                    $(".bottom-ad").fadeOut()
                });
            }
        }, 2000)
    });
</script>
<!--靠右大黑边-->
<div class="body-right-border"></div>
<!--快捷顶部-->
<div id="headertop" class="fs12 c-6c6c6c">
    <div class="clear headertop-box">
        <div class="fl headertop-welcome fs12">你好 , 欢迎来到豆芽铺</div>
        <ul class="fr clear">
            <li id="login">
                <b class="login-icon"></b>
                <span class="login-usename"></span>
                <a class="login-mark c-6c6c6c" href="/user/logout">请登录</a>
                <div class="login-ways" style="display: none">
                    <p>
                        <a href="/user/login?type=qq"><b class="qqlogin"></b>QQ登录</a>
                    </p>
                    <p>
                        <a href="/user/login?type=sina"><b class="wblogin"></b>微博登录</a>
                    </p>
                    <p>
                        <a href="/user/login?type=weixin"><b class="wxlogin"></b>微信登录</a>
                    </p>
                    <p>
                        <a href="/user/login?type=tao"><b class="tblogin"></b>淘宝登录</a>
                    </p>
                </div>
            </li>
            <li class="headertop-vl"></li>
            <li id="collectWeb">收藏本站<i></i></li>
            <li class="headertop-vl"></li>
            <li><a href="/index/chromeplug/" class="c-6c6c6c" target="_blank">帮助</a></li>
        </ul>
    </div>
</div>
<!--头部-->
<div id="header" class="clear">
    <div class="fl">
        <a href="/" title="" class="header-logo">
            豆芽购物助手
        </a>
    </div>
    <div class="fl header-feature">
        <div><b class="icon1"></b>全网好货</div>
        <div><i class="icon"></i></div>
        <div><b class="icon2"></b>实时更新</div>
        <div><i class="icon"></i></div>
        <div><b class="icon3"></b>智能筛选</div>
        <div><i class="icon"></i></div>
        <div><b class="icon4"></b>精选优惠</div>
    </div>
    <div class="fr search-box">
        <label class="fl"><input type="text" name="" value="" id="searchText" maxlength="50" placeholder="请输入想买的宝贝"></label>
        <button type="button" id="searchBtn" class="fr"></button>
        <div id="search-history" style="display: none;">
            <ul>
            </ul>
            <div class="clear">
                <span id="his-dele" class="fr">清除历史记录</span>
            </div>
        </div>
    </div>
</div>
<div id="nav">
    <ul class="nav-box clear">
        <li class="nav-first">
            <a href="/"><span>下载豆芽购物助手</span></a>
            <div class="nav-dropdown" style="display: none">
                <a href="/#download" target="_blank"><p>PC版下载</p></a>
                <a href="/#download" target="_blank"><p>浏览器版下载</p></a>
                <a href="/#app" target="_blank"><p>APP版下载</p></a>
            </div>
        </li>
        <li><a href="/coupon/lists/?cid=1&sort=1"><span>优惠大全</span></a></li>
        <li><a href="/coupon/discount/"><span>超高折扣券</span></a></li>
        <li><a href="/coupon/hots/"><span>豆芽热门券</span></a></li>
        <li><a href="/user/collist/"><span>我的收藏</span></a></li>
        <li><a href="/index/feedback/"><span>意见反馈</span></a></li>
    </ul>
</div>
<link href='/public/static/css/idangerous.swiper2.7.6.css' rel='stylesheet' type='text/css'/>
<div id="banner" class="clear">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <a>
                    <div class="ac-bg-4">
                    </div>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe" target="_blank">
                    <div class="ac-bg-1">
                    </div>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe" target="_blank">
                    <div class="ac-bg-2">
                    </div>
                </a>
            </div>
            <div class="swiper-slide">
                <a href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe" target="_blank">
                    <div class="ac-bg-3">
                    </div>
                </a>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev swiper-button-hover"></div>
        <div class="swiper-button-next swiper-button-hover"></div>
    </div>
</div>
<script type="text/javascript" charset="utf-8" src="/public/static/js/idangerous.swiper2.7.6.min.js"></script>
<script type="text/javascript">
    //轮播图插件配置
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        //如果需要分页器
        pagination: '.pagination',
        //自动轮播
        autoplay: 3000,
        loop: true,
        // grabCursor: true,
        paginationClickable: true,
        //用户操作后是否停止自动轮播
        autoplayDisableOnInteraction: false
    });
    //如果需要前进后退按钮
    $('.swiper-button-prev').on('click', function (e) {
        e.preventDefault();
        mySwiper.swipePrev()
    });
    $('.swiper-button-next').on('click', function (e) {
        e.preventDefault();
        mySwiper.swipeNext()
    });
    //    var time = new Date(),
    //        startTime = coutDownFormat(time);
    //    newCoutDown($('.count-down'), startTime, '2017/06/18 00:00:00');
    //    //当前时间减去开始时间为开始计时时间
    //    //结束时间为最终结束时间
    //    //倒计时器插件配置
    //    function newCoutDown(ele, start, end) {
    //        $(ele).countDown({
    //            startTimeStr: start, //开始时间
    //            endTimeStr: end, //结束时间
    //            daySelector: ".day-num",
    //            hourSelector: ".hour-num",
    //            minSelector: ".min-num",
    //            secSelector: ".sec-num"
    //        });
    //    }
    //
    //    //转换日期格式（2017/01/11 00:00:00）兼容ie8+
    //    function coutDownFormat(time) {
    //        //获取年月日
    //        var yearMonthDay = time.toLocaleDateString() + " ";
    //        yearMonthDay = yearMonthDay.replace(/["年"]/, '/');
    //        yearMonthDay = yearMonthDay.replace(/["月"]/, '/');
    //        yearMonthDay = yearMonthDay.replace(/["日"]/, '');
    //        //抓取时分秒
    //        var hourMinuteSecond = time.toString().split(" ");
    //        for (var i = 0; i < hourMinuteSecond.length; i++) {
    //            if (hourMinuteSecond[i].indexOf(':') != -1) {
    //                hourMinuteSecond = hourMinuteSecond[i];
    //                break;
    //            }
    //        }
    //        formatTime = yearMonthDay.concat(hourMinuteSecond);
    //        return formatTime;
    //    }
</script>
<div id="howcall">
    <div class="howcall-top-title"><img src="/public/static/img/howcall1.png" alt=""></div>
    <ul class="clear howcall-box">
        <li>
            <h2 class="howcall-title">步骤一 : 安装豆芽
                <a class="howcall-bgicon-install" href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe">立即安装</a>
            </h2>
            <p class="howcall-Subtitle">安装完成后即可打开使用</p>
            <img src="/public/static/img/howcall3.png" alt="">
        </li>
        <li class="noMargin">
            <h2 class="howcall-title">步骤二 : 打开浏览器
                <a class="howcall-bgicon-try" href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe">立即试试</a>
            </h2>
            <p class="howcall-Subtitle">已经开启浏览器的用户重启浏览器后生效</p>
            <img src="/public/static/img/howcall4.png" alt="">
        </li>
        <li>
            <h2 class="howcall-title">步骤三 : 用浏览器打开商品页
                <a class="howcall-bgicon-try" href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe">立即试试</a>
            </h2>
            <p class="howcall-Subtitle">打开商品详情页便捷使用小助手</p>
            <img src="/public/static/img/howcall5.png" alt="">
        </li>
        <li class="howcall-tips c-484848 noMargin">
            <h3><b class="howcall-tips-bgicon"></b>Q : 豆芽小贴士</h3>
            <h4>1. 无法自动安装解决办法 , <a href="/index/chromeplug/#hui" target="_blank">点击查看教程>></a></h4>
            <h4>2. 无法正常使用工具 , <a href="/index/chromeplug/#huu" target="_blank">点击查看教程>></a></h4>
            <h4>3. 如何停用和卸载 , <a href="/index/chromeplug/#hu" target="_blank">点击查看教程>></a></h4>
            <h4>4. 请确认您访问的商品页是淘宝 、天猫平台（暂时支持上述平台）</h4>
            <p class="howcall-contactus">联系客服让我们帮您解决（加入QQ反馈群：596285426）</p>
        </li>
    </ul>
</div>
<div id="pkother">
    <div class="pkother-top-title"><img src="/public/static/img/howcall2.png" alt=""></div>
    <div class="pkother-box">
        <ul>
            <li class="clear">
                <div class="fl pkother-box-crown">
                    <h2>点击小助手 , 一键领券</h2>
                    <p>购物时直接领券 , 享受超高优惠</p>
                    <img class="pkother-img" src="/public/static/img/pkother1.png" alt="">
                    <b></b>
                </div>
                <img class="pkother-bgvsicon" src="/public/static/img/VS.png" alt="">
                <div class="fr">
                    <h2>领券步骤繁琐</h2>
                    <p>QQ群中找链接 , 再到商品页领券 , 步骤太多</p>
                    <img class="pkother-img" src="/public/static/img/pkother2.png" alt="">
                </div>
            </li>
            <li class="clear">
                <div class="fl pkother-box-crown">
                    <h2>智能搜索 、分类筛选 , 为你找到最省钱的商品</h2>
                    <p>提供多种分类方式与筛选条件 , 快速高效查找最省钱的商品</p>
                    <img class="pkother-img" src="/public/static/img/pkother3.png" alt="">
                    <b></b>
                </div>
                <img class="pkother-bgvsicon" src="/public/static/img/VS.png" alt="">
                <div class="fr">
                    <h2>只能被动接受优惠信息 , 无法搜索和筛选</h2>
                    <p>打开聊天纪录翻看优惠券 , 效率不高</p>
                    <img class="pkother-img" src="/public/static/img/pkother4.png" alt="">
                </div>
            </li>
            <li class="clear">
                <div class="fl pkother-box-crown">
                    <h2>优惠信息上新提醒 , 价格走势一手掌握</h2>
                    <p>优惠券商品快捷入库 , 实时更新优惠券数据</p>
                    <img class="pkother-img" src="/public/static/img/pkother5.png" alt="">
                    <b></b>
                </div>
                <img class="pkother-bgvsicon" src="/public/static/img/VS.png" alt="">
                <div class="fr">
                    <h2>单一群接收推送 , 可能错过优惠信息</h2>
                    <p>优惠笔数有限 , 还可能出现商家假意促销的优惠</p>
                    <img class="pkother-img" src="/public/static/img/pkother6.png" alt="">
                </div>
            </li>
            <li class="clear">
                <div class="fl pkother-box-crown">
                    <h2>小巧便捷客户端 , 轻松购物</h2>
                    <p>无需加群 , 不再有不停闪的提示消息</p>
                    <img class="pkother-img" src="/public/static/img/pkother7.png" alt="">
                    <b></b>
                </div>
                <img class="pkother-bgvsicon" src="/public/static/img/VS.png" alt="">
                <div class="fr">
                    <h2>加群后 , 容易被骚扰</h2>
                    <p>提示信息频繁闪烁 , 影响工作与生活</p>
                    <img class="pkother-img" src="/public/static/img/pkother8.png" alt="">
                </div>
            </li>
        </ul>
    </div>
</div>
<div id="app">
    <h1>移动端APP下载</h1>
    <img src="/public/static/img/index/appp.png" alt="">
</div>
<div id="download">
    <h1>PC版下载</h1>
    <div class="pc-download clear">
        <a href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe"><img src="/public/static/img/win7_bth_hover.png" alt=""></a>
        <a href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe"><img src="/public/static/img/winPX_bth_hover.png" alt=""></a>
        <a href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe"><img src="/public/static/img/win8_bth_hover.png" alt=""></a>
        <a href="http://file.douyapu.com/upload/DouYaPu_setup_20180123v3105.exe" class="noMargin"><img src="/public/static/img/vipwin10_bth_hover.png" alt=""></a>
    </div>
    <h1>浏览器版本下载</h1>
    <ul class="br-download clear">
        <li><a target="_blank" href="https://ext.se.360.cn/webstore/detail/kmkccbmhhhfojnpbdfjgjpfgoedikahb"><b class="dd-360a"></b></a></li>
        <li><a href="/index/location?type=2"><b class="dd-gg"></b></a></li>
        <li><a target="_blank" href="https://ext.chrome.360.cn/webstore/detail/kmkccbmhhhfojnpbdfjgjpfgoedikahb"><b class="dd-360j"></b></a></li>
        <li><a href="/index/location?type=1"><b class="dd-bd"></b></a></li>
        <li class="noMargin"><a href="/index/location?type=2"><b class="dd-qq"></b></a></li>
        <li><a href="/index/location?type=3"><b class="dd-sg"></b></a></li>
        <li><a href="/index/location?type=1"><b class="dd-lb"></b></a></li>
        <li><a href="/index/location?type=1"><b class="dd-uc"></b></a></li>
        <li><a href="/index/location?type=1"><b class="dd-hh"></b></a></li>
        <li class="noMargin"><a href="/index/location?type=1"><b class="dd-2345"></b></a></li>
    </ul>
</div>
<div id="footer">
    <ul class="modhelp clear c-000000">
        <li>
            <b class="modhelp-bgicon1"></b>
            <div>
                <h5>豆芽铺</h5>
                <p>
                    <a href="/index/chromeplug/#ha" target="_blank">关于我们</a>
                </p>
                <p>
                    <a href="/index/chromeplug/#hc" target="_blank">联系我们</a>
                </p>
                <p>
                    <a href="/index/sitemap/" target="_blank">全站地图</a>
                </p>
            </div>
        </li>
        <li>
            <b class="modhelp-bgicon2"></b>
            <div>
                <h5>快速导航</h5>
                <p>
                    <a href="/user/collist/" target="_blank">我的收藏</a>
                </p>
            </div>

        </li>
        <li>
            <b class="modhelp-bgicon3"></b>
            <div>
                <h5>工具下载</h5>
                <p>
                    <a href="/#download" target="_blank">豆芽优惠工具</a>
                </p>
            </div>
        </li>
    </ul>
</div>
<div id="copyright">
    <p class="copyright-info">
        <a href="http://www.miitbeian.gov.cn" class="c-919191" target="_blank">
            粤ICP备17087710号-1
        </a>
        Powerde by 豆芽铺 2017 All rights reserver 深圳市黄豆泡泡科技有限公司
    </p>
</div>

<script>
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();

    (function(){
        var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?fcc8a60ce9ce079ae553d817aa4f0418":"https://jspassport.ssl.qhimg.com/11.0.1.js?fcc8a60ce9ce079ae553d817aa4f0418";
        document.write('<script src="' + src + '" id="sozz"><\/script>');
    })();

    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c088ddcd15c3ccae0a4bb54855cf2bc2";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

</script>

<script type="text/javascript" src="/public/static/js/common.js"></script>
<div style="display: none;">
    <script src="https://s22.cnzz.com/z_stat.php?id=1263210696&web_id=1263210696" language="JavaScript"></script>
</div>
</body>
</html>