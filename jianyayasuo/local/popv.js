function md5(t) {
    function e(t,e) {
        return t << e | t >>> 32 - e
    }

    function n(t,e) {
        var n,i,r,o,a;
        return r = 2147483648 & t, o = 2147483648 & e, n = 1073741824 & t, i = 1073741824 & e, a = (1073741823 & t) + (1073741823 & e), n & i ? 2147483648 ^ a ^ r ^ o : n | i ? 1073741824 & a ? 3221225472 ^ a ^ r ^ o : 1073741824 ^ a ^ r ^ o : a ^ r ^ o
    }

    function i(t,e,n) {
        return t & e | ~t & n
    }

    function r(t,e,n) {
        return t & n | e & ~n
    }

    function o(t,e,n) {
        return t ^ e ^ n
    }

    function a(t,e,n) {
        return e ^ (t | ~n)
    }

    function s(t,r,o,a,s,u,l) {
        return t = n(t,n(n(i(r,o,a),s),l)), n(e(t,u),r)
    }

    function u(t,i,o,a,s,u,l) {
        return t = n(t,n(n(r(i,o,a),s),l)), n(e(t,u),i)
    }

    function l(t,i,r,a,s,u,l) {
        return t = n(t,n(n(o(i,r,a),s),l)), n(e(t,u),i)
    }

    function c(t,i,r,o,s,u,l) {
        return t = n(t,n(n(a(i,r,o),s),l)), n(e(t,u),i)
    }

    function p(t) {
        var e,n,i = "",r = "";
        for (n = 0; 3 >= n; n++) e = t >>> 8 * n & 255, r = "0" + e.toString(16), i += r.substr(r.length - 2,2);
        return i
    }

    var f,d,h,g,m,v,y,b,k,x = [];
    for (t = function (t) {
        t = t.replace(/\r\n/g,"\n");
        for (var e = "",n = 0; n < t.length; n++) {
            var i = t.charCodeAt(n);
            128 > i ? e += String.fromCharCode(i) : i > 127 && 2048 > i ? (e += String.fromCharCode(i >> 6 | 192), e += String.fromCharCode(63 & i | 128)) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128), e += String.fromCharCode(63 & i | 128))
        }
        return e
    }(t), x = function (t) {
        for (var e,n = t.length,i = n + 8,r = (i - i % 64) / 64,o = 16 * (r + 1),a = new Array(o - 1),s = 0,u = 0; n > u;) e = (u - u % 4) / 4, s = u % 4 * 8, a[e] = a[e] | t.charCodeAt(u) << s, u++;
        return e = (u - u % 4) / 4, s = u % 4 * 8, a[e] = a[e] | 128 << s, a[o - 2] = n << 3, a[o - 1] = n >>> 29, a
    }(t), v = 1732584193, y = 4023233417, b = 2562383102, k = 271733878, f = 0; f < x.length; f += 16) d = v, h = y, g = b, m = k, v = s(v,y,b,k,x[f + 0],7,3614090360), k = s(k,v,y,b,x[f + 1],12,3905402710), b = s(b,k,v,y,x[f + 2],17,606105819), y = s(y,b,k,v,x[f + 3],22,3250441966), v = s(v,y,b,k,x[f + 4],7,4118548399), k = s(k,v,y,b,x[f + 5],12,1200080426), b = s(b,k,v,y,x[f + 6],17,2821735955), y = s(y,b,k,v,x[f + 7],22,4249261313), v = s(v,y,b,k,x[f + 8],7,1770035416), k = s(k,v,y,b,x[f + 9],12,2336552879), b = s(b,k,v,y,x[f + 10],17,4294925233), y = s(y,b,k,v,x[f + 11],22,2304563134), v = s(v,y,b,k,x[f + 12],7,1804603682), k = s(k,v,y,b,x[f + 13],12,4254626195), b = s(b,k,v,y,x[f + 14],17,2792965006), y = s(y,b,k,v,x[f + 15],22,1236535329), v = u(v,y,b,k,x[f + 1],5,4129170786), k = u(k,v,y,b,x[f + 6],9,3225465664), b = u(b,k,v,y,x[f + 11],14,643717713), y = u(y,b,k,v,x[f + 0],20,3921069994), v = u(v,y,b,k,x[f + 5],5,3593408605), k = u(k,v,y,b,x[f + 10],9,38016083), b = u(b,k,v,y,x[f + 15],14,3634488961), y = u(y,b,k,v,x[f + 4],20,3889429448), v = u(v,y,b,k,x[f + 9],5,568446438), k = u(k,v,y,b,x[f + 14],9,3275163606), b = u(b,k,v,y,x[f + 3],14,4107603335), y = u(y,b,k,v,x[f + 8],20,1163531501), v = u(v,y,b,k,x[f + 13],5,2850285829), k = u(k,v,y,b,x[f + 2],9,4243563512), b = u(b,k,v,y,x[f + 7],14,1735328473), y = u(y,b,k,v,x[f + 12],20,2368359562), v = l(v,y,b,k,x[f + 5],4,4294588738), k = l(k,v,y,b,x[f + 8],11,2272392833), b = l(b,k,v,y,x[f + 11],16,1839030562), y = l(y,b,k,v,x[f + 14],23,4259657740), v = l(v,y,b,k,x[f + 1],4,2763975236), k = l(k,v,y,b,x[f + 4],11,1272893353), b = l(b,k,v,y,x[f + 7],16,4139469664), y = l(y,b,k,v,x[f + 10],23,3200236656), v = l(v,y,b,k,x[f + 13],4,681279174), k = l(k,v,y,b,x[f + 0],11,3936430074), b = l(b,k,v,y,x[f + 3],16,3572445317), y = l(y,b,k,v,x[f + 6],23,76029189), v = l(v,y,b,k,x[f + 9],4,3654602809), k = l(k,v,y,b,x[f + 12],11,3873151461), b = l(b,k,v,y,x[f + 15],16,530742520), y = l(y,b,k,v,x[f + 2],23,3299628645), v = c(v,y,b,k,x[f + 0],6,4096336452), k = c(k,v,y,b,x[f + 7],10,1126891415), b = c(b,k,v,y,x[f + 14],15,2878612391), y = c(y,b,k,v,x[f + 5],21,4237533241), v = c(v,y,b,k,x[f + 12],6,1700485571), k = c(k,v,y,b,x[f + 3],10,2399980690), b = c(b,k,v,y,x[f + 10],15,4293915773), y = c(y,b,k,v,x[f + 1],21,2240044497), v = c(v,y,b,k,x[f + 8],6,1873313359), k = c(k,v,y,b,x[f + 15],10,4264355552), b = c(b,k,v,y,x[f + 6],15,2734768916), y = c(y,b,k,v,x[f + 13],21,1309151649), v = c(v,y,b,k,x[f + 4],6,4149444226), k = c(k,v,y,b,x[f + 11],10,3174756917), b = c(b,k,v,y,x[f + 2],15,718787259), y = c(y,b,k,v,x[f + 9],21,3951481745), v = n(v,d), y = n(y,h), b = n(b,g), k = n(k,m);
    return (p(v) + p(y) + p(b) + p(k)).toLowerCase()
}
// var cssStyle = '';
var cssStyle = '.userInfo,.userInfo .users .color-normal{color:#4c4c4c}.entry,.list{border-top:1px solid #ededed}.app,.item,.item-img,.list,.list-container,.list-tao,sub,sup{position:relative}.btn,.item-img,.item-title,.list-nav-item{cursor:pointer}*{margin:0;padding:0}html{font-family:"Microsoft YaHei",sans-serif}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}.app{width:380px;height:502px;padding:0 20px}.userInfo{zoom:1;font-size:14px;line-height:14px}.userInfo .users{margin:12px 0}.entry{text-align:center;height:144px;transition:height linear .3s}.entry,.list{overflow:hidden}.entry,.list-more,.more-market{text-decoration:none}.partner-banner{padding:0;margin:18px 0 0;display:flex;flex-decoration:column;justify-content:space-between}.partner-banner .banner-itm{list-style:none}.partner-banner .banner-itm:nth-child(1) a{box-shadow:0 3px 5px rgba(225,26,45,.4)}.partner-banner .banner-itm:nth-child(2) a{box-shadow:0 3px 5px rgba(253,120,7,.4)}.partner-banner .banner-itm:nth-child(3) a{box-shadow:0 3px 5px rgba(252,79,6,.4)}.partner-banner .entry-market{display:block;height:38px;width:120px}.partner-banner .banner-title{padding:0;margin:8px 0 0;color:#f40;font-size:12px;line-height:12px}.more-market{display:block;color:#4c4c4c;border-radius:2px;background:#f7f8f9;margin:14px 0 22px;letter-spacing:1px;font-size:14px;line-height:30px}.list{line-height:1;height:330px}.list-nav{display:flex;justify-content:flex-end;font-size:14px;color:#2c91ff}.list-nav-item{margin:10px 20px 10px 0;text-align:right;font-weight:700}.list-tao{height:264px;overflow-y:scroll;overflow-x:hidden;transition:all linear .3s}.list-tao::-webkit-scrollbar{width:8px}.list-tao::-webkit-scrollbar-thumb{border-radius:8px;background:#e1e1e1}.item-img,.item-img:before{background-repeat:no-repeat}.item{display:flex;margin-bottom:20px}.item-img,.list-cover{background-color:#fff}.item-img{flex:0 0 auto;width:80px;height:80px;background-size:100% auto;background-position:center}.item-img:after,.item-img:before{content:"";width:100%;height:100%;position:absolute}.item-img:before{background-position:left bottom}.item-img:hover:after{background:rgba(255,255,255,.15)}.item-info{flex:1 1 auto;padding-left:12px}.item-title-wrap{margin:8px 0;font-size:14px}.item-title{display:inline-block;width:270px;font-weight:400;color:#4c4c4c;overflow:hidden}.item-amount,.item-title:hover{color:#a0a0a0}.item-log,.item-title{text-overflow:ellipsis;white-space:nowrap}.item-money{margin:12px 0;font-size:12px;color:#a3a3a3}.item-relMoney{font-size:12px;color:#444}.btn{position:absolute;right:10px;bottom:10px;height:35px;border-radius:3px;background:#F63;color:#fff;padding:0 10px;line-height:35px}.list-cover{position:absolute;width:100%;height:100%;top:0;left:0}.list-main-snake{position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;width:28px;height:28px}.spin-snake{border:4px solid transparent;border-top-color:#e1e1e1;border-left-color:#e1e1e1;border-right-color:#e1e1e1;border-radius:50%;animation:rot .8s infinite linear}.noList{width:100%;height:100%;text-align:center;font-size:14px;color:#4c4c4c;line-height:250px}@keyframes rot{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}';
$("<style></style>").html(cssStyle).appendTo("head");
// var cssStyle1212 = '';
var cssStyle1212 = '';
$("<style></style>").html(cssStyle1212).appendTo("head");
$("body").append(`<div class="app">
    <div class="userInfo">
        <section>
            <div class="users"><span class="color-normal">购物单</span></div>
        </section>
    </div>
    <div class="entry">
        <ul class="partner-banner"></ul>
        <a target="_blank" href="" class="more-market">淘抢购</a>
    </div>
    <div class="list">
        <div class="list-nav"><span class="list-nav-item">换一批</span></div>
        <article class="list-tao"></article>
        <div class="list-cover">
            <div class="spin-snake list-main-snake"></div>
        </div>
    </div>
</div>`);
var dataTop = [
    {
        url:"https://www.tmall.com/",
        img:"https://img.alicdn.com/tps/TB15cDeLVXXXXchXXXXXXXXXXXX-120-40.png",
        title:"天猫"
    },
    {
        url:"https://uland.taobao.com/coupon/list",
        img:"https://img.alicdn.com/tfs/TB1BswrQpXXXXXMXXXXXXXXXXXX-120-40.png",
        title:"先领券，再下单"
    },
    {
        url:"https://ai.taobao.com/",
        img:"https://img.alicdn.com/tps/TB1Km0fLpXXXXXhapXXXXXXXXXX-120-40.png",
        title:"爱淘宝"
    },
];
var dataMid = {
    url:"https://qiang.taobao.com/?sellerType=3",
    title:"淘抢购"
};
var htmlTop = '';
$.each(dataTop,function (v,k) {
    htmlTop += `<li class="banner-itm">
        <a target="_blank" href="${k.url}" class="entry-market" style="background: url(${k.img});"> </a>
        <p class="banner-title">${k.title}</p>
    </li>`
});
$(".partner-banner").html(htmlTop);
$(".more-market").attr("href",dataMid.url).html(dataMid.title);
var tbCookie = "";
var page = 0;
var num = 0;
var floorId = 0;
function getTbCookie(callBack) {
    chrome.cookies.get({
        url:"https://www.taobao.com/",
        name:"_m_h5_tk"
    },function (d) {
        if (d && d.value) {
            tbCookie = d.value;
            if (callBack) {
                callBack();
            }
        } else {
            $("body").append(`<iframe src="https://h5.m.taobao.com/" id="yangxue9527" style="display:none"></iframe>`);
            setTimeout(function () {
                $("#yangxue9527").remove();
                getTbCookie(callBack)
            },2000);
        }
    });
}
function getCoupon() {
    var time = Date.now();
    var s = `{"pNum":${page},"pSize":10,"floorId":${floorId},"refpid":"","couponSrc":"default"}`;
    $.ajax({
        url:"https://h5api.m.taobao.com/h5/mtop.alimama.union.xt.en.api.entry/1.0/",
        dataType:"json",
        data:{
            jsv:"2.4.0",
            appKey:"12574478",
            t:time,
            api:"mtop.alimama.union.xt.en.api.entry",
            v:"1.0",
            AntiCreep:true,
            sign:md5(tbCookie.split("_")[0] + "&" + time + "&12574478&" + s),
            data:s
        },
        success:function (d) {
            if (d && d.ret && d.ret[0] && d.ret[0].match("调用成功")) {
                var data = "";
                try {
                    data = d.data.recommend.resultList;
                } catch (err) {}
                appendHtml(data)    //调用成功
            } else if (d && d.ret && d.ret[0] && d.ret[0].match("FAIL_BIZ_EMPTY_RESULT::FAIL_BIZ_EMPTY_RESULT")) {
                page = 0;
                getCoupon();
            } else {
                num++;
                if (num == 3) {
                    appendHtml(0);  //调用参数错或者cookie失效
                    return false
                } else {
                    getTbCookie(getCoupon)
                }
            }
        },
        error:function () {
            num++;
            if (num == 3) {
                appendHtml(0);  //调用失败
                return false
            } else {
                getCoupon()
            }
        }
    });
}
function appendHtml(e) {
    $(".list-cover").hide();
    if (e) {
        if (e.length) {
            var htmlBottom = "";
            $.each(e,function (v,k) {
                htmlBottom += `<div class="item">
                    <a href="" target="_blank" class="item-img" style="background-image: url(http:${k.pic}_80x80.jpg);">
                    </a>
                    <div class="item-info">
                        <p class="item-title-wrap">
                            <a href="" target="_blank" title="${k.itemName}" class="item-title">
                                ${k.itemName}
                            </a>
                        </p>
                        <p class="item-money">￥${k.promotionPrice}</p>
                        <p class="item-relMoney">券后价￥${k.priceAfterCoupon}</p>
                        <a href="" target="_blank"><div class="btn">领 ${k.couponAmount} 元券</div></a>
                    </div>
                </div>`
            });
            $(".list-tao").html(htmlBottom);
        } else {
            $(".list-tao").html("<div class='noList'>这次是真的没有啦 , 请稍后再来吧</div>");
        }
    } else {
        $(".list-tao").html("<div class='noList'>网络有点开小差了 , 请稍后再试吧~</div>");
    }
}
chrome.storage.local.get(null,function (e) {
    var pid = e.productId1013;
    //4904 品牌券女人
    //4905 品牌券母婴
    //4906 品牌券男人
    //4906 品牌券男人
    //4907 品牌券运动
    //4908 品牌券家居
    //4909 品牌券美食
    //4912 品牌券鞋包
    //4864 白菜价精选
    //4896 白菜价内衣
    //4868 白菜价女装
    //4870 白菜价家居
    //4871 白菜价数码
    //4873 白菜价母婴
    //4878 白菜价男装
    //4880 白菜价美妆
    //4882 白菜价运动
    //4883 白菜价鞋包
    //4886 白菜价食物
    switch (pid) {
        case 1:
            floorId = 4867;     //日团快消
            break;
        case 2:
            floorId = 4862;     //网红爆款
            break;
        case 3:
            floorId = 4903;     //品牌券精选
            break;
        case 4:
            floorId = 4251;
            break;
        case 5:
            floorId = 4865;
            break;
        default:
            floorId = 4866;
    }
    getTbCookie(getCoupon);
});
$(".list-nav-item").click(function () {
    $(".list-cover").show();
    page++;
    getCoupon()
});