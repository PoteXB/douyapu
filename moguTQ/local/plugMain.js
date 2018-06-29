setTimeout(function () {
    if ($("body").attr("mainSign2018625") == 1) {
        return;
    }
    $("body").attr("mainSign2018625","1");
    if ($("body").attr("dypSign159357") != 1) {
        var hit = 0;
        var matchUrl = [
            'detail.tmall.com',
            'item.taobao.com'
        ];
        $.each(matchUrl,function (k,v) {
            if (v == location.host) {
                hit = 1;
                return false
            }
        });
        if (hit) {
            start();
        }
    }
},1000);
function start() {
    // var cssStyle='';
    var cssStyle = '';
    $.ajax({
        url:chrome.extension.getURL("local/style.css"),
        type:"get",
        async:false,
        dataType:"html",
        data:{},
        success:function (d) {
            cssStyle = d;
        },
        error:function () {
        }
    });
    $("<style></style>").html(cssStyle).appendTo("head");
    var middleTemplateHtml1 = `<div id="plugMid627">
    <div class="plugMid627-tool">
        <div class="plugMid627-logo">券</div>
        <div class="plugMid627-AD">
            <div>广告1</div>
            <div class="plugMid627-drop">
                <div class="plugMid627-ADImg" id="plugMid627-ADImg1">
                </div>
            </div>
        </div>
        <div class="plugMid627-AD">
            <div>广告2</div>
            <div class="plugMid627-drop">
                <div class="plugMid627-ADImg" id="plugMid627-ADImg2">
                </div>
            </div>
        </div>
        <div class="plugMid627-QQ"><a href="" target="_blank"></a></div>
        <div class="plugMid627-set">
            <div class="plugMid627-drop">
                <ul>
                    <li class="plugMid627-close">本次关闭</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="plugMid627-coupon">
        <div class="plugMid627-hasCoupon"></div>
        <div class="plugMid627-noCoupon"></div>
    </div>
    <div class="plugMid627-rollAd">
        <ul></ul>
    </div>
</div>`;
    var middleTemplateDom = {
        ".tm-fcs-panel":2,
        ".tb-promo-meta":2,
        ".tb-meta":2
    };  //天猫 淘宝 淘宝 京东 苏宁 国美 当当 聚划算
    $.each(middleTemplateDom,function (v) {
        if ($(v).length) {
            $(v).after(middleTemplateHtml1);
            if (v == ".tm-fcs-panel") {
                $("#plugMid627").css("margin-right","20px");
            }
            return false;
        }
    }); //中间区域插入代码块
    var sj_id = getUrlParam("id"),//获取当前商品id
        consult = [//500人的群占数组一份值，1000人的群占两份，以此类推
            // "//shang.qq.com/wpa/qunwpa?idkey=ba86913a1b9b1573c7064d9c936ff46adfe324d257f2a0400c42988328a7b3d2",//1群已满暂时下线
            // "//shang.qq.com/wpa/qunwpa?idkey=e153b0b08d183927d691402e22ee8a42d0ffa6a022e35b4ec61da5bb4ffccd61",
            "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",//2000容量群占比4
            "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",
            "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",
            "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",
            "//shang.qq.com/wpa/qunwpa?idkey=7dd26f8d1e24b774dcc810bca77b0858847a330fc97ca713749df584ac8d3a63",//1000容量群占比2
            "//shang.qq.com/wpa/qunwpa?idkey=7dd26f8d1e24b774dcc810bca77b0858847a330fc97ca713749df584ac8d3a63",
            "//shang.qq.com/wpa/qunwpa?idkey=f39f47defe3af4c5f8d51097757a4a8a2117cde3122d24d209edd1247a50b7fd",
            "//shang.qq.com/wpa/qunwpa?idkey=7fd3b630aefe61709b871b882eeaa589e27e7602981384d1d90abf5e2bca2eab",
            "//shang.qq.com/wpa/qunwpa?idkey=2a33f551c1c50c803ab643f76a7bdb109f4f7f781ed407ec87ba5479247e4816",
            "//shang.qq.com/wpa/qunwpa?idkey=7a7d503e5a1a5cac589fa293034513c7d6f09da5873072b2161bb3096246ade9",
            "//shang.qq.com/wpa/qunwpa?idkey=7b0d150758f197630ae19f9ee6e7f7463c24caae7ae1ca7bdf8f17513792ce1a"
        ],//咨询群
        myMmId = [
            "mm_131503013_42952277_448750515",
            "mm_131503013_42952277_448756445",
            "mm_122477123_43338440_415426612",
            "mm_122477123_43338440_415420827",
            "mm_129907730_43334579_415456071",
            "mm_129907730_43334579_415414587",
            "mm_115715849_43314897_420512271",
            "mm_115715849_43314897_420470676",
            "mm_122404297_43348252_420516085",
            "mm_122404297_43348252_420504412",
            "mm_113961634_43408644_420518289",
            "mm_113961634_43408644_420510557",
            "mm_131763748_43444216_420502443",
            "mm_131763748_43444216_420512599",
            "mm_131811304_43452028_420498850",
            "mm_131811304_43452028_420526115",
            "mm_131781829_43408642_420488567",
            "mm_131781829_43408642_420504487",
            "mm_130960083_43440201_428120405",
            "mm_130960083_43440201_428130165",
            "mm_130892436_43330696_428070590",
            "mm_130892436_43330696_428078527",
            "mm_131743442_43348225_428074935",
            "mm_131743442_43348225_428104101",
            "mm_130966082_43414361_428068860",
            "mm_130966082_43414361_428090937",
            "mm_130932756_43408640_428096897",
            "mm_130932756_43408640_428106546",
            "mm_130632649_42952224_428112380",
            "mm_130632649_42952224_428118449",
            "mm_128520337_42952245_428146658",
            "mm_128520337_42952245_428144688",
            "mm_47538923_43406271_528264212",
            "mm_47538923_43406271_528258568",
            "mm_131487143_43440589_528244158",
            "mm_131487143_43440589_528246100",
            "mm_130658360_42968281_555506299",
            "mm_130658360_42968281_555514325",
            "mm_130658720_42962885_555694211",
            "mm_130658720_42962885_555672818",
            "mm_32786764_43372908_555574259",
            "mm_32786764_43372908_555584852",
            "mm_46070316_43424573_555786241",
            "mm_46070316_43424573_555768877",
            "mm_131499443_43440540_555614903",
            "mm_131499443_43440540_555646291",
            "mm_130624726_43430634_555744413",
            "mm_130624726_43430634_555776051",
            "mm_130748499_43426580_555724648",
            "mm_130748499_43426580_555736425",
            "mm_131309050_42954687_558506664",
            "mm_131309050_42954687_558492881",
            "mm_131323056_42966252_558524251",
            "mm_131323056_42966252_558508799",
            "mm_131333059_42974030_558548164",
            "mm_131333059_42974030_558562040",
            "mm_76361007_42968104_558544620",
            "mm_76361007_42968104_558552382",
            "mm_131499461_42956754_558782323",
            "mm_131499461_42956754_558782380"
        ],//推广mmid
        myQrMmId = [
            "mm_131487042_42936790_469416271",
            "mm_131487042_42936790_469418146",
            "mm_131473982_42930969_469390839",
            "mm_131473982_42930969_469408615",
            "mm_63658289_42938845_500780731",
            "mm_63658289_42938845_500792726",
            "mm_130652011_42936815_500820201",
            "mm_130652011_42936815_500810666"
        ],//扫码推广mmid
        sj_title = $("head>title")[0].innerHTML.replace(/-淘宝网|-tmall.com天猫$/,""),//详情页标题
        tblmUrl = "http://pub.alimama.com/items/search.json";//淘宝联盟搜索接口
    myMmId = myMmId[Math.floor(Math.random() * myMmId.length)];//获取随机id
    myQrMmId = myQrMmId[Math.floor(Math.random() * myQrMmId.length)];//获取扫码随机id
    function sub(a,b) {
        var c,d,e;
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
        return e = Math.pow(10,Math.max(c,d)), (mul(a,e) - mul(b,e)) / e;
    }                                     //消除浮点数减法
    function mul(a,b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".","")) * Number(e.replace(".","")) / Math.pow(10,c);
    }                                     //消除浮点数减法
    function cnzzAppend(callBack) {
        if (!$('html').html().match(`1273525106`)) {
            $.getScript("https://s19.cnzz.com/z_stat.php?id=1273525106&web_id=1273525106",function () {
                $(document).on("click","[data-mgClick]",function () {
                    $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1273525106"]);`).prependTo($("head"));
                    var name = $(this).attr("data-mgClick");
                    var myScript = document.createElement("script");
                    myScript.appendChild(document.createTextNode(`_czc.push(["_trackEvent","${name}","点击"]);`));
                    document.head.appendChild(myScript);
                });
                var clock;
                $(document).on("mouseenter","[data-mgMove]",function () {
                    var that = $(this);
                    clock = setTimeout(function () {
                        $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1273525106"]);`).prependTo($("head"));
                        var name = that.attr("data-mgMove");
                        var myScript = document.createElement("script");
                        myScript.appendChild(document.createTextNode(`_czc.push(["_trackEvent","${name}","移入"]);`));
                        document.head.appendChild(myScript);
                    },500);
                });
                $(document).on("mouseleave","[data-mgMove]",function () {
                    clearInterval(clock);
                });
                callBack();
            });
        } else {
            callBack();
        }
    }                         //CNZZ统计
    function cnzzEvent(n,e) {
        $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1273525106"]);`).prependTo($("head"));
        var myScript = document.createElement("script");
        myScript.appendChild(document.createTextNode(`_czc.push(["_trackEvent","${n}","${e}"]);`));
        document.head.appendChild(myScript);
    }                               //CNZZ统计
    function openWindow(full_link) {
        window.open('javascript:window.name;','<script>location.replace("' + full_link + '")<\/script>');
    }                        //不带refer跳转
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }                            //当前地址取参
    function getParam(url,name) {
        url = url.split("?")[1];
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = url.substr(0).match(reg);
        if (r != null) return r[2];
        return null;
    }                           //指定url提参方法
    function opTimer(eve) {
        var timeArea = $(eve);
        var endTime = $(eve).data("endtime") + 86400;
        if (endTime) {
            dateCountDown();
            setInterval(dateCountDown,1000);
            function dateCountDown() {
                var now = Math.floor(new Date().getTime() / 1000);
                if (now > endTime) {
                    timeArea.html("优惠券已失效");
                } else {
                    var gap = endTime - now;
                    var dd = Math.floor(gap / (60 * 60 * 24));
                    var hh = Math.floor((gap - dd * 60 * 60 * 24) / (60 * 60));
                    // var mm = Math.floor((gap - dd * 60 * 60 * 24 - hh * 60 * 60) / 60);
                    // var ss = gap - dd * 60 * 60 * 24 - hh * 60 * 60 - mm * 60;
                    var timeStr = '还剩 '
                        + (dd > 0 ? '<em>' + dd + '</em>天' : '')
                        + (hh > 0 ? '<em>' + hh + '</em>时' : '');
                    // + (mm > 0 ? '<em>' + mm + '</em>分' : '')
                    // + (ss >= 0 ? '<em>' + ss + '</em>秒' : '');
                    timeArea.html(timeStr);
                }
            }
        } else {
            timeArea.html("即将过期");
        }
    }                                 //倒计时器
    cnzzAppend(function () {cnzzEvent("MID展示","展示");});
    !function () {
        var qqUrl = Math.floor(Math.random() * consult.length);
        qqUrl = consult[qqUrl];
        $(".plugMid627-QQ a").attr("href",qqUrl);
    }();                                       //随机咨询群链接
    !function () {
        var times = null;
        $(".plugMid627-AD .plugMid627-drop").width($("#plugMid627").width());
        $(window).on("resize",function () {
            $(".plugMid627-AD .plugMid627-drop").width($("#plugMid627").width())
        });
        $("#plugMid627").on("mouseenter",".plugMid627-AD,.plugMid627-set",function () {
            var that = $(this);
            times = setTimeout(function () {
                that.children(".plugMid627-drop").show();
                that.css("border-bottom","1px solid transparent");
            },300)
        });
        $("#plugMid627").on("mouseleave",".plugMid627-AD,.plugMid627-set",function () {
            clearInterval(times);
            $(this).children(".plugMid627-drop").hide();
            $(this).css("border-bottom","1px solid #ECECEC");
        });
        $("#plugMid627").on("click",".plugMid627-close",function () {
            $("#plugMid627").remove();
        });
    }();                                       //中间移入展示,点击关闭事件绑定
    /*new Typed("#midTq-qiPao",{
     strings:['6.18买买买'],
     typeSpeed:100,
     backSpeed:0,
     backDelay:500,
     startDelay:1000,
     loop:true,
     });     */                                    //打字机
    !function () {
        var pic1 = 'data:image/png;base64,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';
        var pic2 = pic1;
        var url1 = 'https://s.click.taobao.com/xqnKSPw';
        var url2 = 'https://s.click.taobao.com/xqnKSPw';
        $("#plugMid627-ADImg1").html(`<img src=${pic1}>`);
        $("#plugMid627-ADImg2").html(`<img src=${pic2}>`);
        $("#plugMid627-ADImg1").click(function () {
            openWindow(url1);
        });
        $("#plugMid627-ADImg2").click(function () {
            openWindow(url2);
        });
    }();                                       //上面两个广告位模块
    !function () {
        var tbCookie = '';                   //淘宝cookie
        // var adPic = '';
        var adPic = 'data:image/jpeg;base64,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';
        var toUrl = 'https://s.click.taobao.com/OefKSPw';
        //没有优惠券时中间的广告图和跳转地址
        function getTbCookie(call,pid,page,num,callBack) {
            chrome.extension.sendMessage({
                name:"getCook",url:"https://www.taobao.com/",key:"_m_h5_tk"
            },function (d) {
                if (d && d[0] && d[0].value) {
                    tbCookie = d[0].value;
                    call(pid,page,num,callBack);
                } else {
                    $("body").append(`<iframe src="//h5.m.taobao.com/" id="douya-yangxue9527" style="display:none"></iframe>`);
                    setTimeout(function () {
                        $("#douya-yangxue9527").remove();
                        getTbCookie(call,pid,page,num,callBack)
                    },2000);
                }
            });
        }     // 获取淘宝cookie
        getTbCookie(startCou);
        function startCou() {
            var page = 1;           //接口参数页码数
            var getH5CouNum = 0;    //接口轮询调用次数
            var page1 = 1;
            var getH5CouNum1 = 0;//
            function getDan(pid,page,num,callBack) {
                var time = Date.now();
                var s = `{"q":"${sj_title}","pid":"${pid}","page":${page},"useItemCouponPage":"1","lunaUrlParam": "{'algo_sort':'mixcoupon','rank':'rank_profile:FirstRankScorer_atbh5','PS':'tk_item_score_atbh5','appBucket':'h'}"}`;
                chrome.extension.sendMessage({
                    url:"https://acs.m.taobao.com/h5/mtop.aitaobao.item.search/7.0/",
                    data:{
                        v:"7.0",api:"mtop.aitaobao.item.search",appKey:"12574478",t:time,sign:md5(tbCookie.split("_")[0] + "&" + time + "&12574478&" + s),data:s
                    },
                    type:"get",dataType:"json",name:"universal"
                },function (r) {
                    if (r && r.ret && r.ret[0] && r.ret[0].match("调用成功")) {
                        if (r && r.data && r.data.items && r.data.items.length) {
                            var data = r.data.items;
                            var hasSwi = 1;
                            $.each(data,function (v,k) {
                                if (k.nid == sj_id) {
                                    if (k.couponAmount) {
                                        callBack(k);
                                    } else {
                                        callBack(0);   //有对应数据但无优惠券的
                                    }
                                    hasSwi = 0;
                                    return false;
                                }
                            });
                            if (hasSwi) {
                                if (page == 3) {
                                    callBack(0);    //数据没对应ID
                                    return false
                                } else {
                                    page++;
                                    getDan();
                                }
                            }
                        } else {
                            callBack(0);    //搜索无任何数据
                        }
                    } else {
                        num++;
                        if (num == 3) {
                            callBack(0);    //请求不成功的
                            return false
                        } else {
                            getTbCookie(getDan,pid,page,num,callBack);
                        }
                    }
                });
            }   //
            function setCoupon(list) {
                var qrcodeText = "https://item.taobao.com/item.htm?id=" + sj_id;
                if (list) {
                    chrome.extension.sendMessage({
                        name:"universal",
                        url:tblmUrl + "?q=https://item.taobao.com/item.htm?id=" + sj_id,
                        type:"get",
                    },function (res) {
                        if (res["data"] && res["data"]["pageList"]) {
                            var ntime = new Date(res["data"]["pageList"][0]["couponEffectiveEndTime"]);
                            list['endtime'] = Math.floor(ntime.getTime() / 1000);
                            list['couponInfo'] = res["data"]["pageList"][0]["couponInfo"];
                        } else {
                            list['endtime'] = false;
                            list['couponInfo'] = "无门槛";
                        }
                        qrcodeText = "https://uland.taobao.com/coupon/edetail" + "?e=" + getParam(list["clickUrl"],"e");
                        var html = `<div class="plugMid627-couBox">
                            <div>
                                <div class="plugMid627-couPrice">券后价 : <span>¥${sub(list.discountPrice,list.couponAmount / 100)}</span></div>
                                <div class="plugMid627-couTime" data-endtime="1535673600">有效期</div>
                            </div>
                            <div class="plugMid627-couBack">
                                <div class="plugMid627-couAmount">${list.couponAmount / 100}元券</div>
                                <div class="plugMid627-couNeed">${list.couponInfo}</div>
                            </div>
                            <div class="plugMid627-couEmpty"></div>
                            <div class="plugMid627-couQr">
                                <div class="plugMid627-couQr-icon"></div>
                                <div class="plugMid627-couQr-title">手淘领券</div>
                                <div class="plugMid627-couQr-box">
                                    <div class="plugMid627-couQr-drop">
                                        <div id="plugMid627-couQr"></div>
                                        <div class="">手淘扫码领券<br>商品<span>立减${list.couponAmount / 100}元</span></div>
                                    </div>  
                                </div>
                            </div>
                        </div>`;
                        $(".plugMid627-hasCoupon").html(html);
                        $(".plugMid627-hasCoupon").show();
                        $(".plugMid627-couBack").click(function () {
                            openWindow(qrcodeText);
                        });
                        opTimer(".plugMid627-couTime");
                        getDan(myQrMmId,page1,getH5CouNum1,setQrCoupon);
                    });
                } else {
                    $(".plugMid627-noCoupon").html(`<img src="${adPic}">`);
                    $(".plugMid627-noCoupon").show();
                    $(".plugMid627-noCoupon").click(function () {
                        openWindow(toUrl);
                    })
                }
            }       //生成优惠券
            function setQrCoupon(list) {
                var qrcodeText = "https://item.taobao.com/item.htm?id=" + sj_id;
                if (list) {
                    if (list.couponAmount) {
                        qrcodeText = "https://uland.taobao.com/coupon/edetail?e=" + getParam(list["clickUrl"],"e");
                    } else {
                        qrcodeText = "https://s.click.taobao.com/t?e=" + getParam(list["clickUrl"],"e");
                    }
                }
                //生成二维码
                new QRCode($("#plugMid627-couQr")[0],{
                    text:qrcodeText,
                    width:120,
                    height:120,
                    colorDark:"#000000",
                    colorLight:"#ffffff",
                    correctLevel:QRCode.CorrectLevel.L
                });
                // var staus = 1;
                $("#plugMid627-couQr").attr("title","");
                $(".plugMid627-couQr").hover(
                    function () {
                        $(".plugMid627-couQr-box").show(0,function () {
                            $(".plugMid627-couQr-drop").addClass("show");
                        });
                    },
                    function () {
                        $(".plugMid627-couQr-drop").removeClass("show");
                    }
                );
                $(".plugMid627-couQr-drop")[0].addEventListener('transitionend',function () {
                    var left = $(".plugMid627-couQr-drop").css("transform").replace(/[^0-9\-,]/g,'').split(',')[4];
                    if (left == "-158") {
                        $(".plugMid627-couQr-box").hide();
                    }
                },false)
            }     //生成优惠券二维码
            getDan(myMmId,page,getH5CouNum,setCoupon);
        }
    }();                                       //中间优惠券模块
    !function () {
        var data = [
            {name:'618活动',title:'618狂欢：品牌尖货直降1000元',pic:'http://file.douyapu.com/douyapu/dai360/2018618.png'}
        ];
        var html = '';
        $.each(data,function (v,k) {
            html += `<li class="plugMid627-rollAd-item${v}">
            <span>${k.title}</span>
        </li>`;
            $(".plugMid627-rollAd").on('click',`.plugMid627-rollAd-item${v} span`,function () {
                // $(".plugFix627-close").attr("data-mgClick",`${k.name}关闭`);
                $(".plugFix627-box img").attr("src",k.pic);
                $("#plugFix627").css("display","block");
            })
        });
        $(".plugMid627-rollAd ul").html(html);
        $(".plugMid627-rollAd li:eq(0)").clone(true).appendTo($(".plugMid627-rollAd ul"));
        var liHeight = $(".plugMid627-rollAd").height();
        var totalHeight = ($(".plugMid627-rollAd li").length * $(".plugMid627-rollAd li").eq(0).height()) - liHeight;
        $(".plugMid627-rollAd ul").height(totalHeight);
        var index = 0;
        var autoTimer = 0;
        var clickEndFlag = true;    //
        function tab() {
            $(".plugMid627-rollAd ul").stop().animate({
                top:-index * liHeight
            },400,function () {
                clickEndFlag = true;
                if (index == $(".plugMid627-rollAd li").length - 1) {
                    $(".plugMid627-rollAd ul").css({top:0});
                    index = 0;
                }
            })
        }        //
        function next() {
            index++;
            if (index > $(".plugMid627-rollAd li").length - 1) {
                index = 0;
            }
            tab();
        }       //
        autoTimer = setInterval(next,2000); //
        $(".plugMid627-rollAd ul li").hover(function () {
            clearInterval(autoTimer);
        },function () {
            autoTimer = setInterval(next,2000);
        }); //轮播逻辑代码
        var fixHtml = `<div id="plugFix627">
        <div class="plugFix627-shadow"></div>
        <div class="plugFix627-box">
            <img src="http://file.douyapu.com/douyapu/dai360/dati423.png">
            <div class="plugFix627-close"></div>
        </div>
    </div>`;
        $('body').append(fixHtml);
        // $("body").on("click","#dai360_link",function () {
        //     openWindow("https://temai.taobao.com/event2549927.htm?q=zIZJi72DTCHzX1yJ4zwwtqtujjtJViRVKKPwiwsBZjTrHEPWRherKw35rLQv0%2BddsBnxIH1nzuATT7r2KojiYg%3D%3D")
        // });
        $("#plugFix627").on("click",".plugFix627-shadow",function () {
            $("#plugFix627").css("display","none");
        });
        $("#plugFix627").on("click",".plugFix627-close",function () {
            $("#plugFix627").css("display","none");
        });
    }();                                       //下面轮播活动模块
    !function () {
        var total;
        var locHost = location.host;
        chrome.storage.local.get(null,function () {
            var n = 0;
            var dypAlert = [
                {
                    "id":5,
                    "name":"618活动",
                    "desc":"618活动",
                    "link":"",
                    "img_src":"http://file.douyapu.com/douyapu/dai360/2018618MgAlert.png",
                    "frequency":5,
                    "position":"2",
                    "begin_time":"2018-04-19T16:04:09.000Z",
                    "end_time":"2018-06-20T15:06:00.000Z",
                    "plant":"www.taobao.com|s.taobao.com|item.taobao.com|www.jd.com|item.jd.com|www.tmall.com|detail.tmall.com|www.suning.com|product.suning.com",
                    "unqiue":"e76ff4375159de551eedbf1c8454400e",
                    "status":1,
                    "sort":20
                }
            ];
            total = dypAlert.length;
            $.each(dypAlert,function (v,k) {
                n++;
                if (k.position.match('2')) {
                    start1(k,n);
                }
            });
        });
        function start1(k,n) {
            var urlOk = 0;
            var urlArr = k.plant.split('|');
            $.each(urlArr,function (v,k) {
                if (locHost == k) {
                    urlOk = 1;
                    return false;
                }
            });
            if (urlOk) {
                cnzzAppend(function () {});
                if (document.cookie.indexOf(`mgTqAlert${n}=1`) == -1) {
                    var curDate = new Date();
                    var curTamp = curDate.getTime();
                    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
                    var passedTamp = curTamp - curWeeHours;
                    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
                    var leftTime = new Date();
                    leftTime.setTime(leftTamp + curTamp);
                    document.cookie = `mgTqAlert${n}=1;expires=` + leftTime;
                    var typeimg = '',toUrl = '';
                    $("<style></style>").html(`#plug625-alert${n}{z-index:999999999999;position:fixed;bottom:20px;right:40px;display:none}#plug625-alert${n} img{display:block;max-width:300px;max-height:400px}#plug625-alert${n}-close{width:30px;height:30px;position:absolute;right:0;top:0;cursor:pointer;opacity:1;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEUAAAAAAABlZWUAAAD19fWioqIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9IKCr6AAAAEHRSTlOAAJ919bt9Y0AsJghKSVdLz5TIOAAAAKNJREFUKM+F01kOwyAMBNBJpuyQ9P6nLVULiRUw8xXxZIXFxtYTi6O1dCVea42TJ3rok+RAiDDc+cQj58UHBjkaZwyTfxwwSfhy4oyZKntM4yu3YrOjZTf/8g2xr732x1dEgXChyHAQLrQiIVxoRQvh5q6wkmHeBoKpVRNO+7dD0XaeEbVzR2yc3xrbk4zv3K8fVG8HvZn0VtQbWR+D9RAtRvAD7KoEY4+OgCAAAAAASUVORK5CYII=)}#plug625-alert${n}-close:hover{opacity:.5}@keyframes mgslideInLeft{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}.mgslideInLeft{animation-name:mgslideInLeft}.mganimated{animation-duration:1s;animation-fill-mode:both}`).appendTo("head");
                    typeimg = k.img_src;
                    toUrl = k.link ? k.link : 'javascript:void(0);';
                    $(document).ready(function () {
                        $("body").after(`<div id="plug625-alert${n}" class="mganimated mgslideInLeft" data-name="${k.name}">
                            <a href="${toUrl}" target="_blank" rel="noreferrer"><img src='${typeimg}'></a>
                            <div id="plug625-alert${n}-close"></div>
                        </div>`);
                        setTimeout(function () {
                            var swi = 0;
                            for (var i = 1; i < n; i++) {
                                if ($(`#plug625-alert${i}`).length) {
                                    swi = 1;
                                    break;
                                }
                            }
                            if (!swi) {
                                $(`#plug625-alert${n}`).show();
                                cnzzEvent(`${k.name}`,"弹出");
                            }
                            $(`#plug625-alert${n}-close`).click(function () {
                                cnzzEvent(`${k.name}关闭`,"点击");
                                var that = $(this);
                                that.parent().fadeOut(1000,function () {
                                    that.parent().remove();
                                });
                            });
                            var swi1 = 0;
                            var nextNum = "";
                            for (var j = n + 1; j < total + 1; j++) {
                                if ($(`#plug625-alert${j}`).length) {
                                    swi1 = 1;
                                    nextNum = j;
                                    break;
                                }
                            }
                            if (swi1) {
                                $(`#plug625-alert${n}-close`).click(function () {
                                    setTimeout(function () {
                                        $(`#plug625-alert${nextNum}`).show();
                                        cnzzEvent(`${$(`#plug625-alert${nextNum}`).data("name")}`,"弹出");
                                    },2500);
                                });
                            }
                        },1000 * n);
                    });
                }
            }
        } //右下角弹窗
    }();                                       //右下角弹窗模块
}