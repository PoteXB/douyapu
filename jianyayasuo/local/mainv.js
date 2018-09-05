!function () {
    if ($("body").attr("JYSign2018625") == 1) {
        return;
    }
    $("body").attr("JYSign2018625","1");
    function cnzzAppend(callBack) {
        if (!$('html').html().match(`1274396512`)) {
            $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1274396512"]);`).prependTo($("head"));
            $.getScript("https://s19.cnzz.com/z_stat.php?id=1274396512&web_id=1274396512",function () {
                $(document).on("click","[data-JYClick]",function () {
                    var name = $(this).attr("data-JYClick");
                    cnzzEvent(name,"点击");
                });
                var clock;
                $(document).on("mouseenter","[data-JYMove]",function () {
                    var that = $(this);
                    clock = setTimeout(function () {
                        var name = that.attr("data-JYMove");
                        cnzzEvent(name,"移入");
                    },500);
                });
                $(document).on("mouseleave","[data-JYMove]",function () {
                    clearInterval(clock);
                });
                callBack();
            });
        } else {
            callBack();
        }
    }                         //CNZZ统计
    function cnzzEvent(n,e) {
        $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1274396512"]);`).prependTo($("head"));
        var myScript = document.createElement("script");
        myScript.appendChild(document.createTextNode(`_czc.push(["_trackEvent","${n}","${e}"]);`));
        document.head.appendChild(myScript);
    }                               //CNZZ统计
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
    }                                       //md5
    var consult = [];       //QQ群
    var myMmId = [];        //点击ID
    var myQrMmId = [];      //二维码ID
    var myPostMmId = [];    //上报ID
    var topAD = {};         //上面两个广告数据
    var lunAD = [];         //上面两个广告数据
    var alertAD = [];       //全网弹广告
    chrome.storage.local.get(null,function (e) {
        var json = typeof e.jsonvdata == 'string' ? JSON.parse(e.jsonvdata) : e.jsonvdata;
        consult = json.qqUrl;
        myMmId = json.myMmId;
        myQrMmId = json.phoneId;
        myPostMmId = json.postId;
        topAD = json.topAD;
        lunAD = json.lunAD;
        alertAD = json.alertAD;
        var hitTb = 0;
        var matchTbUrl = [
            'detail.tmall.com',
            'item.taobao.com'
        ];
        $.each(matchTbUrl,function (k,v) {
            if (v == location.host) {
                hitTb = 1;
                return false
            }
        });
        if (hitTb) {
            startTbk();
        }
        startAllUrl();
    });
    function startTbk() {
        // var cssStyle='';
        var cssStyle = '#JYPlugMid627,.JYPlugMid627-tool{position:relative;background:#fff}#JYPlugMid627{font-size:14px;font-family:"Microsoft YaHei",sans-serif;margin:5px 0;z-index:9;max-width:429px}#JYPlugMid627.JYPlugTM{margin-right:20px}.JYPlugMid627-tool{display:flex;z-index:10}.JYPlugMid627-tool>div{height:30px;display:flex;align-items:center;justify-content:center;border:1px solid #ECECEC;box-sizing:border-box;border-left:none}.JYPlugMid627-drop{position:absolute;top:29px;display:none;padding-top:1px}.JYPlugMid627-QQ,.JYPlugMid627-set{width:40px}.JYPlugMid627-flex{display:flex;align-items:center}.JYPlugMid627-logo{width:30px;cursor:default;border-left:1px solid #EEE!important;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAACH1BMVEUAAAAAofMAofMAofMAofMAofMAofMAofMGp/QAofMAofMAofMRs/UKrPUBpPMkzvcAovMkzvcBovMAofMAofMDpPQAovQAofMAofMAofMAofMJsPQCpfMQtfUNsvUBo/MBo/MCpPQIq/QgyfcFp/QCpPQAofMWvPYAofMkzvcbwvYAofMMrvQkzvckzvcKrvQjy/cexfYIqvQlz/cQtPUkzPcNs/UCpPMFp/QXvPUBpPMSuPUhyfYHqfQGqfMNsPQWu/UBovMYvvYlzfcawfYlz/cMsPQkzvcjzPckzvciy/clz/cAofMkzvcAofMjzPcQtfUhyfcTufUjzPcdxPYHqvQApPMjy/cgyPYfx/YawfYIrPQGqPQWvPULr/Rl0fkcw/YYv/YOsvQKrvTJ7/3G7f0hyvcRuvUAqPQFp/S96/266fy26fyo5vyP3vslzvcXx/dPxfcTuPYQtfUAq/QCpvTV9P2v6Pyt5/yT5Puh4/uW4fuH3/tXy/hUyfgjzfcdxvYRwvYLu/YItfURsvUasfXQ8v3B7P2q6PyZ5Pue4/uQ4fuN2vp52vpc1/ltz/li1fhByPggy/c7xPdJwvcywPcUxfYxwvY3wPYtvfYZufYDufYfvvUctfULsvUAsPS67fyx6Py05vul5ft92/py2Ppm2fl60/l3zvlIz/hPzfhdyvhJyvgeyfcuyPcxxPZAv/YQvvY3uPYcvfUmtvVwY8vmAAAAVHRSTlMAmomNlJCXhwKLakURCPLWwL+of3hbWD0sGwv+/PbZ1cW5t62koW9sU0gwJyEbBvr29fPx7+zo5+bk49/d0MnGw7SpopGNg4CAe3VpZWFhV1JRNyVmixDFAAACP0lEQVQoz63SVXcTURQFYO5oI3V3oaWFFnd3d8jMxCbu7p40Wnf34u7wA5nJygoUwuKl9/V7OHvfc3Zs39t7s7y0/Mbjf+juUns/pdOdeVhUAPfdPswoJRQJDnYX/6X8q3ZqRkeJHAKBQnGF/+fYy/YZh2MhHmdULFZe6tuie8r7qY8TwVeJtxHx6mqSpi882hKKohwTvgHf1JQv8nL8nV7vOv0gr3eP6oTCheCTT8OBFxrriF87m3K7j3TnIl8/oBOKRIng8PR4IGJb0y9qo5tut6r5WrbAfUrItBEkRoee+p9/XvzwfcUU20yrZDJ1Ncs7GY0LFF9HrUOm0JptcHrJFPOoVDK1pCPLomyZpM3qt4Tl5uX5gMbpYVBCnGX5lohRpTIZtphCI3LLl0mtxmlQSwhC2pntfFLAKK2Xh8xy+UpYq31tcRokhFRqrGGZ19UiVtK0PmWzzso31t/PZcxOktGSsh6WuSh8nqZdruhAdEkTM3i8PzRzpNR4vAKuYrkGQJyO5tT84NhGemzSY1h/Zs6QZCvAES7LfRAG453HXMsqWaMqTRgyb76RTW0whILa7LfVVWIoBFoaZbJsXi9JllyEYASpya29fhdAIPTcfrar1EiSp7pwFIN5+aNpqEYwDtR+iCCMXrKpFYMQUFn320aLeBwA4xUnGC0pgxnl1uctFwCgONbeVlYBcTCkp+GX5AOgEA7hOAyg2gK3yq8GCAzDKKjqLXjnxTwUIBi4wy+EbMDee1Xc2vzY/7+fntulPgsXUuAAAAAASUVORK5CYII=);background-size:cover}.JYPlugMid627-AD{flex:auto;cursor:pointer}.JYPlugMid627-ADTitle{color:#333;margin-left:10px;height:20px;overflow:hidden}.JYPlugMid627-ADIcon{font-size:12px;color:#FF3A27;border:1px solid #FF3A27;border-radius:3px;padding:0 2px}.JYPlugMid627-AD:hover .JYPlugMid627-ADTitle{color:#F40137}.JYPlugMid627-AD .JYPlugMid627-drop{left:0}.JYPlugMid627-ADImg{background:#fff}.JYPlugMid627-AD .JYPlugMid627-drop.qrCode{left:auto;right:80px;width:153px;border:1px solid #ECECEC;border-top:none}.JYPlugMid627-AD .JYPlugMid627-drop.qrCode>div{background:#FFF}.JYPlugMid627-drop.qrCode .JYPlugMid627-ADImg{width:130px;margin:0 auto;padding:15px 0}.JYPlugMid627-drop.qrCode .JYPlugMid627-drop-title{text-align:center;padding-bottom:15px}.JYPlugMid627-ADImg img{width:100%;vertical-align:middle}.JYPlugMid627-ADItem2{display:flex;width:100%;padding:10px 20px;border:1px solid #ECECEC;border-top:none;border-bottom:2px solid #FD2550;box-sizing:border-box}.JYPlugMid627-ADItem2-img{width:60px;height:60px;margin-right:10px}.JYPlugMid627-ADItem2-box{flex:1;position:relative}.JYPlugMid627-ADItem2-icon{position:absolute;width:14px;height:14px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABEVBMVEX/RQD/VQD/VAD/RQD/RQD/VQD/VQD////+RgD/RQD/QwD/SgD8////UwD/TQD/PQD/MwD/LAD/UQD/LgD90sH+49X92sn9y7P8n3z8eUb/QQH/PwD/OgD/OAD9/Pr9+fb+9vH+7ev+6N780bz9z7b9zLb8xrL+wqv+w6b7r5b8rYv+qYT9nXX9mXL+knH9lmn8j179iVb+hFL+gEv8fkX8ZTn9bin9ZCn+UBL+PgX/TQL+RwD/DAD+/fj+8uj91cT+0cT8yav8vaX9uJr+spH8ooz9m4f9lHn8onD7m2v7kGr8iWj9cFL+d079cjT8WDH9aC/9WS37ayr9WSH/Zx78Yxr+Wg3/Vwz7OgD8LAD/AQBbThY0AAAABnRSTlPn5ublSkmb2EzAAAAA3klEQVQY003BBW4DMRAAwA3dXmzHcIxhZuYyM+P/H1KpUqTMQCah7UlkIKlxovHQ0HL/kmBw/hF8zokpRSypZgCPXOYP2fDqpF4dEJIDI+6UbsrIKv2HHrNCCvxr+l0tuPgav6+aOI9ALFjTH9VqRbt1d44TCTSY5cdTp4v2/dMZjk1YG79tZ3ZhoV33OjhSsFbL/PVxn+DAO+3ixITo5bDwc4BHWHLLFj6aoNqst31uOJfebYsVVwKyxF8Sqcztwqo03iQFSpSgG51QEehK0g2k9J1QEF0HSEN2Tyr9BwwsHAF+24CqAAAAAElFTkSuQmCC);background-size:cover;top:3px}.JYPlugMid627-ADItem2-title{font-size:13px;color:#4A90E2;line-height:20px;height:40px;display:-webkit-box;overflow:hidden;text-indent:18px;-webkit-line-clamp:2;-webkit-box-orient:vertical}.JYPlugMid627-ADItem2-price{position:absolute;font-size:20px;color:#FD2550;line-height:20px;right:0;bottom:0}.JYPlugMid627-QQ{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAg1JREFUOBGVlM1LG0EYxrO7SbNNIM1FEMWrtx6U9tI2wZAvzFFI69GLh4oHD22hUCj9+AtKUdCrCJpWFD+CIRdvgoJ3UbwqUhMJaUtKkv7e4CzJuiHrwPDOvM/zPvvM7MxoHoeWzWYflsvl1WazOQb84JbyT9O0ffqrQqFQtZfp9kQsFpsolUqXIhAIBEaLxaIpnfEIOb3RaFwkk8msvU5rT2Qymce1Wu3A5/NN5vP5rXZMjVOp1DhiP5i/4APHKt/hCJE9lvO+m4gUsaw84Q1d4t2G3al4PH56F3HOwD9Jp9PTCm13NEnypwJ6RZyv0V8qniVEcoC9sdasCN2iYRjH7NWAwi0hEkOVSmVHAb1iKBTahTPYwYtEIn2JROKqI+liQs1FNBodEmrLkd/vlz9QcFFrp+yZprkhSQ1V2bBvnIl+O8vNXFx5vd45cfSFjXvnpsiJw5V5W6/XP3s4D7+cCPfJoXEtjrz3KerCNUTEQHGTOIzNJ04326mYOxfk7B2BnYuG3OZlBiJ4Qm/9AWLPhsg6pDO6gYEVq4AvLPIHBHDV5F6ykiVFbp0jBD7iLM2b80wBvWIwGHyOK7SSn4Tb2mis/WVsVqvVYaI8ah5eyUe8kt8ZZijQ4WyHw+HZXC53I7hwyZlgf2RuPWy4+grwGiBwm68zP8TpjBB1XZ8HeypDmYP9Zr7AQf4g8/+C/7zh5Cz/zQAAAABJRU5ErkJggg==) center no-repeat}.JYPlugMid627-QQ a{display:block;width:100%;height:100%}.JYPlugMid627-QQ:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAAclBMVEUAAAD0ATf1ATf1ATb1ATj1ATf/FDz0ATf2ATb1ATf2ATf1ATf1Ajj3Azj6BTn1Ajb2Azn0Azj/Czn1ATj1ATj1ATf2ATb1ATf0Ajf1Ajf3Ajb4Azr3BDv/B0D/HFX1ATf2Ajj1Ajf2Ajj1Ajf1Ajr/CT4MyKkgAAAAJnRSTlMA7uj4uLMM8fXz3NiaVCyEYVoW4dLNwLujd2tLPSQJ6qWhiYF/HYoZQm0AAACiSURBVBjTXY9ZEoMgEESHTUARFfc1+/2vGCQxTHwf3VWPYgYgsAnJmBYJ/MglXwFWrvPDWDVDYFb2q+h0HE7002UaR2RlKH6PquhDNRVa1IQiaPcm93QXQNCXj/aK1a31tyn8QauwFlOlQOAEAXlWErTI0COSjGswQvRRccGNL4P+mJo9n7WLytUPnyNd/IyBkMHPXOgYfk8YU521nWKMFABvCTIF2an2KvsAAAAASUVORK5CYII=) center no-repeat}.JYPlugMid627-set{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAAhFBMVEUAAABcXFxFRUVISEhERERFRUVERERERERERERERERERERFRUVFRUVERERERERGRkZGRkZKSkpOTk5FRUVFRUVERERFRUVHR0dMTExFRUVFRUVFRUVFRUVFRUVHR0dGRkZJSUlERERERERHR0dFRUVISEhFRUVERERERERERERHR0dEREQ3G3oLAAAAK3RSTlMAB3Ie8I345630plxIm4c3NBgL18vAYCQS+7qTgnwuKw7RuE9OJ97dtGVEEnIQpAAAANhJREFUGNN1kdeywyAMRBcMBlzjJI5berkl+///F8OEiV9yXtDsSGglIZBkbhJAbsYVPlSps7xIy9YwW0e1YNmguNBIrPeUUa55909I67iLcsIckRWLGEqeEBFpicDpkFpfov/0A8Ce2rvRZHYGauW2Ki0AoQdegd+xwcxm06DfGgGgLyngqtA1GLjziJmcCdKFfPvIP9flJz48TxRYtnRPQFQDRwDHt8HK6i4YnGrxdZzvw9e8+bzO1z64Wyy2h1RU82IPlIjoQbW0eRbPEOms8Un/qn0f7QVYDhEZoiy6NwAAAABJRU5ErkJggg==) center no-repeat}.JYPlugMid627-set:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAARVBMVEUAAAD1ATf1ATf4BTn2ATf1ATf2Ajj4BTn2Ajj2Ajj1ATf2Ajf1ATf2Ajj1ATf2Ajf1ATf1ATf1Ajj1Ajj2ATf2ATj1ATf16wIiAAAAF3RSTlMAxtsbiuImElZOlkeyCdBquqp9X3I764IS+eEAAAC/SURBVBjTdZFZssQgCEVldEKj6eTtf6mPdLU9fMQf4RTFhUu4Xjsnsoa4dastrBcZ+8DBhgBSaOGHl8ZkfWykjNvCSZI3IiVvkOWxcJUc3jGmFTKeb3z28vwpsTB5WbFSXX6XkjxlAFaXBZgA3kB3By2gpejJsKp5GHl9nhjD3+405H7NdfRLu21CdxgtO6dh+bvJnSSl8hpwfga8Wed2+WVVVNVl1cdYOkDg19hYBADnMX/PEFo1PGKgXcbraP8E0wjYgd4G6AAAAABJRU5ErkJggg==) center no-repeat}.JYPlugMid627-set .JYPlugMid627-drop{width:81px;right:0}.JYPlugMid627-set ul{border:1px solid #ECECEC;border-top:none;background:#fff}.JYPlugMid627-set li{height:40px;line-height:40px;text-align:center}.JYPlugMid627-set li:hover{color:#F40137}.JYPlugMid627-noCoupon img{width:100%;vertical-align:middle}.JYPlugMid627-coupon{background:#fff}.JYPlugMid627-hasCoupon{display:none;border-left:1px solid #ececec;border-right:1px solid #ececec;border-bottom:1px dashed #ececec;padding-left:20px;height:79px}.JYPlugMid627-couBox{position:relative;display:flex;align-items:center;width:100%;height:100%}.JYPlugMid627-couPrice{color:#444;font-size:14px;width:100px;overflow:hidden;white-space:nowrap}.JYPlugMid627-couPrice span{font-weight:700;font-size:16px;color:#F40137}.JYPlugMid627-couTime{font-size:12px;color:#999;width:100px;overflow:hidden}.JYPlugMid627-couBack{width:155px;height:44px;cursor:pointer;color:#fff;margin-left:15px;background:url(data:image/png;base64,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)}@media (max-width:1179px){#JYPlugMid627.JYPlugTB .JYPlugMid627-couBack{margin-left:-5px}#JYPlugMid627.JYPlugTB .JYPlugMid627-hasCoupon{padding-left:10px}#JYPlugMid627.JYPlugTB .JYPlugMid627-ADTitle{width:62px;overflow:hidden}}.JYPlugMid627-couAmount,.JYPlugMid627-couNeed{width:97px;text-align:center;line-height:16px;height:16px}.JYPlugMid627-couAmount{margin-top:7px;font-size:16px;font-weight:700}.JYPlugMid627-couNeed{font-size:12px;transform:scale(.84);margin-top:3px;overflow:hidden;opacity:.6}.JYPlugMid627-couEmpty{width:60px}.JYPlugMid627-couQr{position:absolute;width:48px;right:12px;top:11px;cursor:pointer}.JYPlugMid627-couQr-icon{width:30px;height:30px;margin:4px auto 6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAYFBMVEUAAABFRUVGRkZFRUVFRUVFRUVFRUVERERGRkZFRUVHR0dFRUVRUVFJSUlFRUVJSUlFRUVFRUVbW1tFRUVISEhERERERET///9ERERFRUVFRUVERERFRUVKSkpVVVVEREQGu0XdAAAAH3RSTlMAXUmnZOL5e0KuK8UTDZgVkVUIkyDZwAHQf3jrthgDjfjCdgAAALZJREFUKM+l0dkOwiAQheHTTZQWKktXF97/LW0E4sRIiul/RfhuYAaOVgC1I532ual8Y+QxXDRvruArI5/hu2RyIaWmLKRUhKVzgnLv3DWftRCgPAmhM582lr4l8hou2o2PDbWgWcAWNByroSlAheMCyGZIPI1M7db6hshz23pOTa3/i5Ux+otnY4b0Qn15LLpuojx1ocS+Yxvfua/+8JPzB2A5hyP9+NgOMxoHOGMWmrESUGx9AbSUL+2LYKH8AAAAAElFTkSuQmCC)}.JYPlugMid627-couQr-title{font-size:12px;height:18px;line-height:18px}.JYPlugMid627-couQr-box{display:none;position:absolute;z-index:100000;top:-12px;right:-170px;text-align:center;width:158px;height:202px;overflow:hidden}.JYPlugMid627-couQr-drop{background:#fff;width:156px;height:200px;border:1px solid #ececec;transform:translate3d(-100%,0,0);transition:transform .5s}.JYPlugMid627-couQr-drop.show{transform:translate3d(0,0,0)}#JYPlugMid627-couQr{margin:18px auto 10px;width:120px}.JYPlugMid627-noCoupon{display:none;cursor:pointer}.JYPlugMid627-rollAd{height:30px;border:1px solid #ECECEC;border-top:none;overflow:hidden;position:relative;background:#fff;z-index:8}.JYPlugMid627-rollAd ul{position:relative;height:100%;padding-left:20px}.JYPlugMid627-rollAd li{height:30px;color:#444;display:flex;align-items:center}.JYPlugMid627-rollAd span{line-height:30px;cursor:pointer}.JYPlugMid627-rollAd span:hover{color:#F40137}#JYPlugFix627{display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index:2147483647}.JYPlugFix627-shadow{position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.75)}.JYPlugFix627-box{text-align:center;border-radius:20px;width:500px;height:500px;box-sizing:border-box;position:absolute;left:50%;top:50%;margin:-250px 0 0 -250px}.JYPlugFix627-close{position:absolute;right:50%;bottom:0;margin-right:-15px;width:30px;height:30px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMAu/oRSx0M8XRZJ+2lBz3Dwm713aqek4h5ajLgxdG2gGKXqD5kAAABfUlEQVRIx52W6XaFIAyEw+JVBLu4Vr3bvP9LttLWIyVaD/NPD58yJCShWMr0orFS2kb0RtG/ykYhsZEUY3YMdH5VoUtVVarUhee7fUgNNWRrVLjLVqIeFE9oC7iM+bUDrOaID0BMxGoSwEf0tnJAQbsqAFf9Ia7INR1I57iGjMNc0qHKGS70kQcEy+RbPxrY3RW/StnYOX8G9jc+AwSdksDwE6oa0zlkQv0d6g6OTsqh8z+BzM4imcSydkRLp9Vi9J5M6PF+oVUv85O2MhBESsows+94u6xEHn7Pr/ZcoMvrF7MS79E5G+pREMfwBBXoSUATx/AEaQhqUBLLsASVaMhCEcfcWIIULElUxDC3nUtaQbKI97H44RELxRLF4ofdGGvfO/dnwNoX0CxBPKMhllCyxMrEoTQQPMEzAiZOy9kTK/OI0jJO/uf28fIoo+RPuGIJFzmhXCQUpYTSl1BgE8p4QrNIaEkJjS+hvaY18fRR4XggSRx70oerhBHuE36YJtNdpHYUAAAAAElFTkSuQmCC);background-size:cover}';
        // $.ajax({
        //     url:chrome.extension.getURL("css/style.css"),
        //     type:"get",
        //     async:false,
        //     dataType:"html",
        //     data:{},
        //     success:function (d) {
        //         cssStyle = d;
        //     },
        //     error:function () {
        //     }
        // });
        $("<style></style>").html(cssStyle).appendTo("head");
        var middleTemplateHtml1 = `<div id="JYPlugMid627">
            <div class="JYPlugMid627-tool">
                <div class="JYPlugMid627-logo"></div>
                <div class="JYPlugMid627-AD" id="JYPlugMid627-ADImg1">
                    <div class="JYPlugMid627-ADIcon"></div>
                    <div class="JYPlugMid627-ADTitle"></div>
                    <div class="JYPlugMid627-drop">
                        <div class="JYPlugMid627-ADImg"></div>
                    </div>
                </div>
                <div class="JYPlugMid627-AD" id="JYPlugMid627-ADImg2">
                    <div class="JYPlugMid627-ADIcon"></div>
                    <div class="JYPlugMid627-ADTitle"></div>
                    <div class="JYPlugMid627-drop qrCode">
                        <div>
                            <div class="JYPlugMid627-ADImg"></div>
                            <div class="JYPlugMid627-drop-title">微信扫码马上体验</div>
                        </div>
                    </div>
                </div>
                <div class="JYPlugMid627-QQ"><a href="" target="_blank"></a></div>
                <div class="JYPlugMid627-set">
                    <div class="JYPlugMid627-drop">
                        <ul>
                            <li class="JYPlugMid627-close">本次关闭</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="JYPlugMid627-coupon">
                <div class="JYPlugMid627-hasCoupon"></div>
                <div class="JYPlugMid627-noCoupon"></div>
            </div>
            <div class="JYPlugMid627-rollAd">
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
                    $("#JYPlugMid627").addClass('JYPlugTM');
                } else {
                    $("#JYPlugMid627").addClass('JYPlugTB');
                }
                return false;
            }
        }); //中间区域插入代码块
        var sj_id = getUrlParam("id"),//获取当前商品id
            sj_title = $("head>title")[0].innerHTML.replace(/-淘宝网|-tmall.com天猫$/,""),//详情页标题
            tblmUrl = "https://pub.alimama.com/items/search.json";//淘宝联盟搜索接口
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
            var endTime = $(eve).data("endtime");
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
            $(".JYPlugMid627-QQ a").attr("href",qqUrl);
        }();                                       //随机咨询群链接
        !function () {
            var times = null;
            $(".JYPlugMid627-AD .JYPlugMid627-drop").not($(".qrCode")[0]).width($("#JYPlugMid627").width());
            $(window).on("resize",function () {
                $(".JYPlugMid627-AD .JYPlugMid627-drop").not($(".qrCode")[0]).width($("#JYPlugMid627").width());
            });
            $("#JYPlugMid627").on("mouseenter",".JYPlugMid627-AD,.JYPlugMid627-set",function () {
                var that = $(this);
                times = setTimeout(function () {
                    that.children(".JYPlugMid627-drop").show();
                    that.css("border-bottom","1px solid transparent");
                },300)
            });
            $("#JYPlugMid627").on("mouseleave",".JYPlugMid627-AD,.JYPlugMid627-set",function () {
                clearInterval(times);
                $(this).children(".JYPlugMid627-drop").hide();
                $(this).css("border-bottom","1px solid #ECECEC");
            });
            $("#JYPlugMid627").on("click",".JYPlugMid627-close",function () {
                $("#JYPlugMid627").remove();
            });
        }();                                       //中间移入展示,点击关闭事件绑定
        !function () {
            $.each(topAD,function (v,k) {
                $(`#JYPlugMid627-ADImg${k.index}`).attr("data-JYMove",k.cnzzName);
                $(`#JYPlugMid627-ADImg${k.index} .JYPlugMid627-ADTitle`).html(k.title);
                $(`#JYPlugMid627-ADImg${k.index} .JYPlugMid627-ADIcon`).html(k.icon);
                if (k.type == 1) {
                    $(`#JYPlugMid627-ADImg${k.index} .JYPlugMid627-ADImg`).html(`<img src="${k.pic}" data-JYClick="${k.cnzzName}">`);
                } else if (k.type == 2) {
                    var itemHtml = `<div class="JYPlugMid627-ADItem2" data-JYClick="${k.cnzzName}">
                        <div class="JYPlugMid627-ADItem2-img"><img src="${k.pic}"></div>
                        <div class="JYPlugMid627-ADItem2-box">
                            <div class="JYPlugMid627-ADItem2-icon"></div>
                            <div class="JYPlugMid627-ADItem2-title">${k.desc}</div>
                            <div class="JYPlugMid627-ADItem2-price">¥${k.price}</div>
                        </div>
                    </div>`;
                    $(`#JYPlugMid627-ADImg${k.index} .JYPlugMid627-ADImg`).html(itemHtml);
                }
                $(`#JYPlugMid627-ADImg${k.index} .JYPlugMid627-ADImg`).click(function () {
                    if (k.url) {
                        openWindow(k.url);
                    }
                });
            });
        }();                                       //上面两个广告位模块1
        !function () {
            var tbCookie = '';
            // var adPic = '';
            var adPic = 'data:image/jpeg;base64,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';
            var toUrl = 'https://s.click.taobao.com/OefKSPw';
            var clickE = '无券广告';
            //没有优惠券时中间的广告图和跳转地址以及cnzz点击事件名称
            function getTbCookie(call,pid,page,num,callBack) {
                chrome.extension.sendMessage({
                    name:"getCook",url:"https://www.taobao.com/",key:"_m_h5_tk"
                },function (d) {
                    if (d && d[0] && d[0].value) {
                        tbCookie = d[0].value;
                        call(pid,page,num,callBack);
                    } else {
                        $("body").append(`<iframe src="//h5.m.taobao.com/" id="jy-jy9527" style="display:none"></iframe>`);
                        setTimeout(function () {
                            $("#jy-jy9527").remove();
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
                                            callBack(k,'has');    //有相应优惠券
                                        } else {
                                            callBack(k,'no');    //有对应id数据但无优惠券的
                                        }
                                        hasSwi = 0;
                                        return false;
                                    }
                                });
                                if (hasSwi) {
                                    if (page == 3) {
                                        callBack(0,'err');        //数据没对应ID,可能没有推广,可能前面3页都没数据,不知道是否有优惠券
                                        return false
                                    } else {
                                        page++;
                                        getDan(pid,page,num,callBack);
                                    }
                                }
                            } else {
                                callBack(0,'no');    //搜索无任何数据,没有优惠券
                            }
                        } else {
                            num++;
                            if (num == 3) {
                                callBack(0,'err');    //请求失败的,不知道是否有优惠券
                                return false
                            } else {
                                getTbCookie(getDan,pid,page,num,callBack);
                            }
                        }
                    });
                }   //
                function setCoupon(list,type) {
                    var qrcodeText = "https://item.taobao.com/item.htm?id=" + sj_id;
                    if (type == 'has') {
                        qrcodeText = "https://uland.taobao.com/coupon/edetail" + "?e=" + getParam(list["clickUrl"],"e");
                        var html = `<div class="JYPlugMid627-couBox">
                            <div>
                                <div class="JYPlugMid627-couPrice">券后价 <span>¥${sub(list.discountPrice,list.couponAmount / 100)}</span></div>
                                <div class="JYPlugMid627-couTime" data-endtime=""></div>
                            </div>
                            <div class="JYPlugMid627-couBack" data-JYClick="领取优惠券">
                                <div class="JYPlugMid627-couAmount">${list.couponAmount / 100}元券</div>
                                <div class="JYPlugMid627-couNeed"></div>
                            </div>
                            <div class="JYPlugMid627-couEmpty"></div>
                            <div class="JYPlugMid627-couQr">
                                <div class="JYPlugMid627-couQr-icon"></div>
                                <div class="JYPlugMid627-couQr-title">手淘领券</div>
                                <div class="JYPlugMid627-couQr-box">
                                    <div class="JYPlugMid627-couQr-drop">
                                        <div id="JYPlugMid627-couQr"></div>
                                        <div class="">手淘扫码领券<br>商品<span>立减${list.couponAmount / 100}元</span></div>
                                    </div>  
                                </div>
                            </div>
                        </div>`;
                        $(".JYPlugMid627-hasCoupon").html(html);
                        $(".JYPlugMid627-hasCoupon").show();
                        $(".JYPlugMid627-couBack").click(function () {
                            openWindow(qrcodeText);
                        });
                        getDan(myQrMmId,page1,getH5CouNum1,setQrCoupon);
                        getCouInfo();
                    } else {
                        $(".JYPlugMid627-noCoupon").html(`<img src="${adPic}" data-JYClick="${clickE}">`);
                        $(".JYPlugMid627-noCoupon").show();
                        $(".JYPlugMid627-noCoupon").click(function () {
                            openWindow(toUrl);
                        });
                    }
                }       //生成优惠券判断是否有优惠券
                function setQrCoupon(list,type) {
                    var qrcodeText = "https://item.taobao.com/item.htm?id=" + sj_id;
                    if (list) {
                        if (type == 'has') {
                            qrcodeText = "https://uland.taobao.com/coupon/edetail?e=" + getParam(list["clickUrl"],"e");
                        } else {
                            qrcodeText = "https://s.click.taobao.com/t?e=" + getParam(list["clickUrl"],"e");
                        }
                    }
                    //生成二维码
                    new QRCode($("#JYPlugMid627-couQr")[0],{
                        text:qrcodeText,
                        width:120,
                        height:120,
                        colorDark:"#000000",
                        colorLight:"#ffffff",
                        correctLevel:QRCode.CorrectLevel.L
                    });
                    $("#JYPlugMid627-couQr").attr("title","");
                    $(".JYPlugMid627-couQr").hover(
                        function () {
                            $(".JYPlugMid627-couQr-box").show(0,function () {
                                $(".JYPlugMid627-couQr-drop").addClass("show");
                            });
                        },
                        function () {
                            $(".JYPlugMid627-couQr-drop").removeClass("show");
                        }
                    );
                    $(".JYPlugMid627-couQr-drop")[0].addEventListener('transitionend',function () {
                        var left = $(".JYPlugMid627-couQr-drop").css("transform").replace(/[^0-9\-,]/g,'').split(',')[4];
                        if (left == "-158") {
                            $(".JYPlugMid627-couQr-box").hide();
                        }
                    },false)
                }     //生成优惠券二维码
                function getCouInfo() {
                    chrome.extension.sendMessage({
                        name:"universal",
                        url:tblmUrl + "?q=https://item.taobao.com/item.htm?id=" + sj_id,
                        type:"get",
                    },function (res) {
                        if (res["data"] && res["data"]["pageList"]) {
                            var info = res["data"]["pageList"][0];
                            var ntime = new Date(info.couponEffectiveEndTime);
                            ntime = Math.floor(ntime.getTime() / 1000);
                            $(".JYPlugMid627-couNeed").html(`满${info.couponStartFee}减${info.couponAmount}`);
                            $(".JYPlugMid627-couTime").attr("data-endtime",ntime);
                            opTimer(".JYPlugMid627-couTime");
                        }
                    });
                }                  //获取优惠券条件和过期时间
                getDan(myMmId,page,getH5CouNum,setCoupon);
            }
        }();                                       //中间优惠券模块2
        !function () {
            var data = lunAD;
            var html = '';
            $.each(data,function (v,k) {
                html += `<li class="JYPlugMid627-rollAd-item${v}">
                    <span data-JYClick="${k.clickE}">${k.title}</span>
                </li>`;
                $(".JYPlugMid627-rollAd").on('click',`.JYPlugMid627-rollAd-item${v} span`,function () {
                    if (k.type) {
                        $(".JYPlugFix627-box img").attr("src",k.pic);
                        $("#JYPlugFix627").css("display","block");
                    } else {
                        openWindow(k.url)
                    }
                })
            });
            $(".JYPlugMid627-rollAd ul").html(html);
            $(".JYPlugMid627-rollAd li:eq(0)").clone(true).appendTo($(".JYPlugMid627-rollAd ul"));
            var liHeight = $(".JYPlugMid627-rollAd").height();
            var totalHeight = ($(".JYPlugMid627-rollAd li").length * $(".JYPlugMid627-rollAd li").eq(0).height()) - liHeight;
            $(".JYPlugMid627-rollAd ul").height(totalHeight);
            var index = 0;
            var autoTimer = 0;
            var clickEndFlag = true;    //
            function tab() {
                $(".JYPlugMid627-rollAd ul").stop().animate({
                    top:-index * liHeight
                },400,function () {
                    clickEndFlag = true;
                    if (index == $(".JYPlugMid627-rollAd li").length - 1) {
                        $(".JYPlugMid627-rollAd ul").css({top:0});
                        index = 0;
                    }
                })
            }        //
            function next() {
                index++;
                if (index > $(".JYPlugMid627-rollAd li").length - 1) {
                    index = 0;
                }
                tab();
            }       //
            autoTimer = setInterval(next,2000); //
            $(".JYPlugMid627-rollAd ul li").hover(function () {
                clearInterval(autoTimer);
            },function () {
                autoTimer = setInterval(next,2000);
            }); //轮播逻辑代码
            var fixHtml = `<div id="JYPlugFix627">
                <div class="JYPlugFix627-shadow"></div>
                <div class="JYPlugFix627-box">
                    <img src="">
                    <div class="JYPlugFix627-close"></div>
                </div>
            </div>`;
            $('body').append(fixHtml);
            $("#JYPlugFix627").on("click",".JYPlugFix627-shadow",function () {
                $("#JYPlugFix627").css("display","none");
            });
            $("#JYPlugFix627").on("click",".JYPlugFix627-close",function () {
                $("#JYPlugFix627").css("display","none");
            });
        }();                                       //下面轮播活动模块3
    }         //淘宝客业务页面
    function startAllUrl() {
        var total;
        var locHost = location.host;
        var sj_title = $("head>title").length ? $("head>title").html().replace(/-淘宝网|-tmall.com天猫$/,"") : "";
        var n = 0;
        var dypAlert = alertAD;      //右下角弹窗模块4
        total = dypAlert.length;
        $.each(dypAlert,function (v,k) {
            n++;
            if (k.position.match('2')) {
                start1(k,n);
            }
        });
        function start1(k,n) {
            var urlOk = 0;
            var keyOK = 0;
            var urlArr = k.plant.split('|');
            var keyArr = k.keys ? k.keys.split('|') : [];
            $.each(urlArr,function (v,k) {
                if (locHost == k) {
                    urlOk = 1;
                    return false;
                }
            });
            if (keyArr.length) {
                $.each(keyArr,function (v,k) {
                    if (sj_title.match(k)) {
                        keyOK = 1;
                        return false;
                    }
                });
            } else {
                keyOK = 1
            }
            if (urlOk && keyOK) {
                cnzzAppend(function () {});
                if (document.cookie.indexOf(`JYAlert${n}=1`) == -1) {
                    var curDate = new Date();
                    var curTamp = curDate.getTime();
                    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
                    var passedTamp = curTamp - curWeeHours;
                    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
                    var leftTime = new Date();
                    leftTime.setTime(leftTamp + curTamp);
                    document.cookie = `JYAlert${n}=1;expires=` + leftTime;
                    var typeimg = '',toUrl = '';
                    $("<style></style>").html(`#JYPlug625-alert${n}{z-index:999999999999;position:fixed;bottom:10px;right:35px;display:none}#JYPlug625-alert${n} img{display:block;max-width:300px;max-height:400px}#JYPlug625-alert${n}-close{width:30px;height:30px;position:absolute;right:0;top:0;cursor:pointer;opacity:1;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEUAAAAAAABlZWUAAAD19fWioqIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9IKCr6AAAAEHRSTlOAAJ919bt9Y0AsJghKSVdLz5TIOAAAAKNJREFUKM+F01kOwyAMBNBJpuyQ9P6nLVULiRUw8xXxZIXFxtYTi6O1dCVea42TJ3rok+RAiDDc+cQj58UHBjkaZwyTfxwwSfhy4oyZKntM4yu3YrOjZTf/8g2xr732x1dEgXChyHAQLrQiIVxoRQvh5q6wkmHeBoKpVRNO+7dD0XaeEbVzR2yc3xrbk4zv3K8fVG8HvZn0VtQbWR+D9RAtRvAD7KoEY4+OgCAAAAAASUVORK5CYII=)}#JYPlug625-alert${n}-close:hover{opacity:.5}@keyframes mgslideInLeft{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}.mgslideInLeft{animation-name:mgslideInLeft}.mganimated{animation-duration:1s;animation-fill-mode:both}`).appendTo("head");
                    typeimg = k.img_src;
                    toUrl = k.link ? k.link : 'javascript:void(0);';
                    $(document).ready(function () {
                        $("body").after(`<div id="JYPlug625-alert${n}" class="mganimated mgslideInLeft" data-name="${k.name}">
                                <a href="${toUrl}" target="_blank" rel="noreferrer"><img src='${typeimg}'></a>
                                <div id="JYPlug625-alert${n}-close"></div>
                            </div>`);
                        if (k.link) {
                            $(`#JYPlug625-alert${n} a`).attr("data-JYClick",k.name);
                        }
                        setTimeout(function () {
                            var swi = 0;
                            for (var i = 1; i < n; i++) {
                                if ($(`#JYPlug625-alert${i}`).length) {
                                    swi = 1;
                                    break;
                                }
                            }
                            if (!swi) {
                                $(`#JYPlug625-alert${n}`).show();
                                cnzzEvent(`${k.name}`,"弹出");
                            }
                            $(`#JYPlug625-alert${n}-close`).click(function () {
                                cnzzEvent(`${k.name}关闭`,"点击");
                                var that = $(this);
                                that.parent().fadeOut(1000,function () {
                                    that.parent().remove();
                                });
                            });
                            var swi1 = 0;
                            var nextNum = "";
                            for (var j = n + 1; j < total + 1; j++) {
                                if ($(`#JYPlug625-alert${j}`).length) {
                                    swi1 = 1;
                                    nextNum = j;
                                    break;
                                }
                            }
                            if (swi1) {
                                $(`#JYPlug625-alert${n}-close`).click(function () {
                                    setTimeout(function () {
                                        $(`#JYPlug625-alert${nextNum}`).show();
                                        cnzzEvent(`${$(`#JYPlug625-alert${nextNum}`).data("name")}`,"弹出");
                                    },2500);
                                });
                            }
                        },1000 * n);
                    });
                }
            }
        }
    }      //全网其他业务页面
}();