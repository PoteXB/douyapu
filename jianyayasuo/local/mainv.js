setTimeout(function () {
    if (document.body.getAttribute("mainSign2018625") == 1) {
        return;
    }
    $("body").attr("mainSign2018625","1");
    if (document.body.getAttribute("firstSign2018827") == 1) {
        return;
    }
    $("body").attr("firstSign2018827","1");
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

    function cnzzAppend(cnzzId,cnzzUrl,callBack) {
        if (!$('html').html().match(cnzzId)) {
            var myScript = document.createElement("script");
            myScript.appendChild(document.createTextNode(`var moguBack_czc = _czc?_czc:[];var _czc = [];_czc.push(["_setAccount",${cnzzId}]);`));
            document.head.appendChild(myScript);
            $.getScript(cnzzUrl,function () {
                var myScript = document.createElement("script");
                myScript.appendChild(document.createTextNode(`var mogu_czc = _czc;_czc = [];`));
                document.head.appendChild(myScript);
                $(document).on("click","[data-moguDJ]",function () {
                    var name = $(this).attr("data-moguDJ");
                    cnzzEvent(name,'点击');
                });
                var clock;
                $(document).on("mouseenter","[data-moguYR]",function () {
                    var that = $(this);
                    clock = setTimeout(function () {
                        var name = that.attr("data-moguYR");
                        cnzzEvent(name,'曝光');
                    },500);
                });
                $(document).on("mouseleave","[data-moguYR]",function () {
                    clearInterval(clock);
                });
                if (callBack) {
                    callBack();
                }
            });
        } else {
            if (callBack) {
                callBack();
            }
        }
    }         //CNZZ统计
    function cnzzEvent(n,e) {
        var myScript = document.createElement("script");
        myScript.appendChild(document.createTextNode(`!function(){var czcTime=setInterval(function(){if(typeof mogu_czc!="undefined"){mogu_czc.push(["_trackEvent","${n}","${e}"]);clearInterval(czcTime)}},100)}();`));
        document.head.appendChild(myScript);
    }               //CNZZ统计
    var locHost = location.host;
    var adJson = {};                            //全局广告数据
    var toolBarShow = '';
    var apiUrl = 'http://report.douyapu.com';   //全局接口地址
    var apiKey = 'j';                           //全局接口字段
    var channelId = '';                         //渠道ID
    !function () {
        var hitTb = 0;
        var matchTbUrl = [
            'detail.tmall.com',
            'detail.tmall.hk',
            'item.taobao.com',
            'item.taobao.hk',
            'chaoshi.detail.tmall.com',
            'item.jd.com',
            'item.jd.hk',
            'detail.ju.taobao.com',
            'product.suning.com',
            'product.dangdang.com',
            'detail.vip.com'
        ];
        $.each(matchTbUrl,function (k,v) {
            if (v == locHost) {
                hitTb = 1;
                return false
            }
        });
        if (hitTb) {
            chrome.storage.local.get(null,function (e) {
                channelId = e.channelId1013;
                if (channelId && channelId == '130001' && e.productId1013) {
                    apiUrl = 'http://report.318000.com.cn';
                    apiKey = 's';
                }
                adJson = e.JsonJs816 ? e.JsonJs816 : e.jsonvdata;
                adJson = (typeof adJson == "string") ? JSON.parse(adJson) : adJson;
                toolBarShow = e.toolBarShow ? e.toolBarShow : 'show';
                start();
            });
        }
    }();
    //淘宝客业务页面
    function start() {
        // var cssStyle='';
        var cssStyle = '#plugMid627,.plugMid627-tool{position:relative;background:#fff}#plugBot627,#plugMid627{font-family:"Microsoft YaHei",sans-serif}.plugBot627-burst-dropPrice,.plugMid627-ADItem2-title{-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}#plugMid627{font-size:14px;margin:5px 0;z-index:9;max-width:429px}#plugMid627.plugTM{margin-right:20px}.plugMid627-tool{display:flex;z-index:10}.plugMid627-tool>div{height:30px;display:flex;align-items:center;justify-content:center;border:1px solid #ECECEC;box-sizing:border-box;border-left:none}.plugMid627-drop{position:absolute;top:29px;display:none;padding-top:1px}.plugMid627-QQ,.plugMid627-set{width:40px}.plugMid627-logo{width:30px;cursor:default;border-color:#F40137;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAolBMVEX0ATf////1KVf6ma/2N2L8wM34cpD94uj0D0L+9/j1JlT1Hk7++/v+6e395uv94Ob8usn1G0v+8/X94ef90Nr7pbj6j6f6iqP4aor+8fT92eH8zdj6nLH3WHz3THL2QWr0Fkj0BTr+7vH91t78yNT8w9D7ssL7rb77qrz5hJ75epf4cI/4ZIb4X4H3VHn2PGb92+L7tcT7tMT6oLT5d5T2RGyzIRGEAAABGklEQVQ4y+3R2XKCQBAF0L6IOiCrssgmwX036///WmBIIsJg8N3zcqGqa2bqNj09inkS3eMbNnFT+Dxtg2dDjB1xLo48d+iRiAw94x8G+NWZDpmEIiRFXGBSIUFETaozHI4xHubmUIoofx21NpiiRUo1tvQjhiVd2dRmpECmLrZY0z3nXukDsHpV9eMNtHDrbQ8KvobVgPM0IM7zMCIBycSCUeliQpmS2GyOxbUO5gLvL6LdvAF9RhVJAH3WPE6DZvWrLE9eAY3r99iqJm4F6l7zqC5/DpMNnORfqQWXGAl9Qa+WgJDE2CsO1bVj0jIXYZl1GBw5cBj9P3gMEN72e8KSmjbAhv2VP1FyvMSGdXiubElHzvykp46+AbUPD9nBTSJTAAAAAElFTkSuQmCC);background-size:cover}.plugMid627-logo.jys{border-color:#ECECEC;border-left:1px solid #ECECEC!important;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAACH1BMVEUAAAAAofMAofMAofMAofMAofMAofMAofMGp/QAofMAofMAofMRs/UKrPUBpPMkzvcAovMkzvcBovMAofMAofMDpPQAovQAofMAofMAofMAofMJsPQCpfMQtfUNsvUBo/MBo/MCpPQIq/QgyfcFp/QCpPQAofMWvPYAofMkzvcbwvYAofMMrvQkzvckzvcKrvQjy/cexfYIqvQlz/cQtPUkzPcNs/UCpPMFp/QXvPUBpPMSuPUhyfYHqfQGqfMNsPQWu/UBovMYvvYlzfcawfYlz/cMsPQkzvcjzPckzvciy/clz/cAofMkzvcAofMjzPcQtfUhyfcTufUjzPcdxPYHqvQApPMjy/cgyPYfx/YawfYIrPQGqPQWvPULr/Rl0fkcw/YYv/YOsvQKrvTJ7/3G7f0hyvcRuvUAqPQFp/S96/266fy26fyo5vyP3vslzvcXx/dPxfcTuPYQtfUAq/QCpvTV9P2v6Pyt5/yT5Puh4/uW4fuH3/tXy/hUyfgjzfcdxvYRwvYLu/YItfURsvUasfXQ8v3B7P2q6PyZ5Pue4/uQ4fuN2vp52vpc1/ltz/li1fhByPggy/c7xPdJwvcywPcUxfYxwvY3wPYtvfYZufYDufYfvvUctfULsvUAsPS67fyx6Py05vul5ft92/py2Ppm2fl60/l3zvlIz/hPzfhdyvhJyvgeyfcuyPcxxPZAv/YQvvY3uPYcvfUmtvVwY8vmAAAAVHRSTlMAmomNlJCXhwKLakURCPLWwL+of3hbWD0sGwv+/PbZ1cW5t62koW9sU0gwJyEbBvr29fPx7+zo5+bk49/d0MnGw7SpopGNg4CAe3VpZWFhV1JRNyVmixDFAAACP0lEQVQoz63SVXcTURQFYO5oI3V3oaWFFnd3d8jMxCbu7p40Wnf34u7wA5nJygoUwuKl9/V7OHvfc3Zs39t7s7y0/Mbjf+juUns/pdOdeVhUAPfdPswoJRQJDnYX/6X8q3ZqRkeJHAKBQnGF/+fYy/YZh2MhHmdULFZe6tuie8r7qY8TwVeJtxHx6mqSpi882hKKohwTvgHf1JQv8nL8nV7vOv0gr3eP6oTCheCTT8OBFxrriF87m3K7j3TnIl8/oBOKRIng8PR4IGJb0y9qo5tut6r5WrbAfUrItBEkRoee+p9/XvzwfcUU20yrZDJ1Ncs7GY0LFF9HrUOm0JptcHrJFPOoVDK1pCPLomyZpM3qt4Tl5uX5gMbpYVBCnGX5lohRpTIZtphCI3LLl0mtxmlQSwhC2pntfFLAKK2Xh8xy+UpYq31tcRokhFRqrGGZ19UiVtK0PmWzzso31t/PZcxOktGSsh6WuSh8nqZdruhAdEkTM3i8PzRzpNR4vAKuYrkGQJyO5tT84NhGemzSY1h/Zs6QZCvAES7LfRAG453HXMsqWaMqTRgyb76RTW0whILa7LfVVWIoBFoaZbJsXi9JllyEYASpya29fhdAIPTcfrar1EiSp7pwFIN5+aNpqEYwDtR+iCCMXrKpFYMQUFn320aLeBwA4xUnGC0pgxnl1uctFwCgONbeVlYBcTCkp+GX5AOgEA7hOAyg2gK3yq8GCAzDKKjqLXjnxTwUIBi4wy+EbMDee1Xc2vzY/7+fntulPgsXUuAAAAAASUVORK5CYII=);background-size:cover}.plugMid627-AD{flex:auto;cursor:pointer}.plugMid627-ADTitle{color:#333;margin-left:10px;height:20px;overflow:hidden}.plugMid627-ADIcon{font-size:12px;color:#FF3A27;border:1px solid #FF3A27;border-radius:3px;padding:0 2px}.plugMid627-AD:hover .plugMid627-ADTitle{color:#F40137}.plugMid627-AD .plugMid627-drop{left:0}.plugMid627-ADImg{background:#fff}.plugMid627-AD .plugMid627-drop.qrCode{left:auto;right:80px;width:153px;border:1px solid #ECECEC;border-top:none}.plugMid627-AD .plugMid627-drop.qrCode>div{background:#FFF}.plugMid627-drop.qrCode .plugMid627-ADImg{width:130px;margin:0 auto;padding:15px 0}.plugMid627-drop.qrCode .plugMid627-drop-title{text-align:center;padding-bottom:15px}.plugMid627-ADImg img{width:100%;vertical-align:middle}.plugMid627-ADItem2{display:flex;width:100%;padding:10px 20px;border:1px solid #ECECEC;border-top:none;border-bottom:2px solid #FD2550;box-sizing:border-box}.plugMid627-ADItem2-img{width:60px;height:60px;margin-right:10px}.plugMid627-ADItem2-box{flex:1;position:relative}.plugMid627-ADItem2-icon{position:absolute;width:14px;height:14px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABEVBMVEX/RQD/VQD/VAD/RQD/RQD/VQD/VQD////+RgD/RQD/QwD/SgD8////UwD/TQD/PQD/MwD/LAD/UQD/LgD90sH+49X92sn9y7P8n3z8eUb/QQH/PwD/OgD/OAD9/Pr9+fb+9vH+7ev+6N780bz9z7b9zLb8xrL+wqv+w6b7r5b8rYv+qYT9nXX9mXL+knH9lmn8j179iVb+hFL+gEv8fkX8ZTn9bin9ZCn+UBL+PgX/TQL+RwD/DAD+/fj+8uj91cT+0cT8yav8vaX9uJr+spH8ooz9m4f9lHn8onD7m2v7kGr8iWj9cFL+d079cjT8WDH9aC/9WS37ayr9WSH/Zx78Yxr+Wg3/Vwz7OgD8LAD/AQBbThY0AAAABnRSTlPn5ublSkmb2EzAAAAA3klEQVQY003BBW4DMRAAwA3dXmzHcIxhZuYyM+P/H1KpUqTMQCah7UlkIKlxovHQ0HL/kmBw/hF8zokpRSypZgCPXOYP2fDqpF4dEJIDI+6UbsrIKv2HHrNCCvxr+l0tuPgav6+aOI9ALFjTH9VqRbt1d44TCTSY5cdTp4v2/dMZjk1YG79tZ3ZhoV33OjhSsFbL/PVxn+DAO+3ixITo5bDwc4BHWHLLFj6aoNqst31uOJfebYsVVwKyxF8Sqcztwqo03iQFSpSgG51QEehK0g2k9J1QEF0HSEN2Tyr9BwwsHAF+24CqAAAAAElFTkSuQmCC);background-size:cover;top:3px}.plugMid627-ADItem2-title{font-size:13px;color:#4A90E2;line-height:20px;height:40px;display:-webkit-box;text-indent:18px}.plugMid627-ADItem2-price{position:absolute;font-size:20px;color:#FD2550;line-height:20px;right:0;bottom:0}.plugMid627-QQ{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAg1JREFUOBGVlM1LG0EYxrO7SbNNIM1FEMWrtx6U9tI2wZAvzFFI69GLh4oHD22hUCj9+AtKUdCrCJpWFD+CIRdvgoJ3UbwqUhMJaUtKkv7e4CzJuiHrwPDOvM/zPvvM7MxoHoeWzWYflsvl1WazOQb84JbyT9O0ffqrQqFQtZfp9kQsFpsolUqXIhAIBEaLxaIpnfEIOb3RaFwkk8msvU5rT2Qymce1Wu3A5/NN5vP5rXZMjVOp1DhiP5i/4APHKt/hCJE9lvO+m4gUsaw84Q1d4t2G3al4PH56F3HOwD9Jp9PTCm13NEnypwJ6RZyv0V8qniVEcoC9sdasCN2iYRjH7NWAwi0hEkOVSmVHAb1iKBTahTPYwYtEIn2JROKqI+liQs1FNBodEmrLkd/vlz9QcFFrp+yZprkhSQ1V2bBvnIl+O8vNXFx5vd45cfSFjXvnpsiJw5V5W6/XP3s4D7+cCPfJoXEtjrz3KerCNUTEQHGTOIzNJ04326mYOxfk7B2BnYuG3OZlBiJ4Qm/9AWLPhsg6pDO6gYEVq4AvLPIHBHDV5F6ykiVFbp0jBD7iLM2b80wBvWIwGHyOK7SSn4Tb2mis/WVsVqvVYaI8ah5eyUe8kt8ZZijQ4WyHw+HZXC53I7hwyZlgf2RuPWy4+grwGiBwm68zP8TpjBB1XZ8HeypDmYP9Zr7AQf4g8/+C/7zh5Cz/zQAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-QQ a{display:block;width:100%;height:100%}.plugMid627-QQ:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAAclBMVEUAAAD0ATf1ATf1ATb1ATj1ATf/FDz0ATf2ATb1ATf2ATf1ATf1Ajj3Azj6BTn1Ajb2Azn0Azj/Czn1ATj1ATj1ATf2ATb1ATf0Ajf1Ajf3Ajb4Azr3BDv/B0D/HFX1ATf2Ajj1Ajf2Ajj1Ajf1Ajr/CT4MyKkgAAAAJnRSTlMA7uj4uLMM8fXz3NiaVCyEYVoW4dLNwLujd2tLPSQJ6qWhiYF/HYoZQm0AAACiSURBVBjTXY9ZEoMgEESHTUARFfc1+/2vGCQxTHwf3VWPYgYgsAnJmBYJ/MglXwFWrvPDWDVDYFb2q+h0HE7002UaR2RlKH6PquhDNRVa1IQiaPcm93QXQNCXj/aK1a31tyn8QauwFlOlQOAEAXlWErTI0COSjGswQvRRccGNL4P+mJo9n7WLytUPnyNd/IyBkMHPXOgYfk8YU521nWKMFABvCTIF2an2KvsAAAAASUVORK5CYII=) center no-repeat}.plugMid627-set{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAAhFBMVEUAAABcXFxFRUVISEhERERFRUVERERERERERERERERERERFRUVFRUVERERERERGRkZGRkZKSkpOTk5FRUVFRUVERERFRUVHR0dMTExFRUVFRUVFRUVFRUVFRUVHR0dGRkZJSUlERERERERHR0dFRUVISEhFRUVERERERERERERHR0dEREQ3G3oLAAAAK3RSTlMAB3Ie8I345630plxIm4c3NBgL18vAYCQS+7qTgnwuKw7RuE9OJ97dtGVEEnIQpAAAANhJREFUGNN1kdeywyAMRBcMBlzjJI5berkl+///F8OEiV9yXtDsSGglIZBkbhJAbsYVPlSps7xIy9YwW0e1YNmguNBIrPeUUa55909I67iLcsIckRWLGEqeEBFpicDpkFpfov/0A8Ce2rvRZHYGauW2Ki0AoQdegd+xwcxm06DfGgGgLyngqtA1GLjziJmcCdKFfPvIP9flJz48TxRYtnRPQFQDRwDHt8HK6i4YnGrxdZzvw9e8+bzO1z64Wyy2h1RU82IPlIjoQbW0eRbPEOms8Un/qn0f7QVYDhEZoiy6NwAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-set:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAARVBMVEUAAAD1ATf1ATf4BTn2ATf1ATf2Ajj4BTn2Ajj2Ajj1ATf2Ajf1ATf2Ajj1ATf2Ajf1ATf1ATf1Ajj1Ajj2ATf2ATj1ATf16wIiAAAAF3RSTlMAxtsbiuImElZOlkeyCdBquqp9X3I764IS+eEAAAC/SURBVBjTdZFZssQgCEVldEKj6eTtf6mPdLU9fMQf4RTFhUu4Xjsnsoa4dastrBcZ+8DBhgBSaOGHl8ZkfWykjNvCSZI3IiVvkOWxcJUc3jGmFTKeb3z28vwpsTB5WbFSXX6XkjxlAFaXBZgA3kB3By2gpejJsKp5GHl9nhjD3+405H7NdfRLu21CdxgtO6dh+bvJnSSl8hpwfga8Wed2+WVVVNVl1cdYOkDg19hYBADnMX/PEFo1PGKgXcbraP8E0wjYgd4G6AAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-set .plugMid627-drop{width:81px;right:0}.plugMid627-set ul{border:1px solid #ECECEC;border-top:none;background:#fff}.plugMid627-hasCoupon,.plugMid627-noCoupon{border-left:1px solid #ececec;border-right:1px solid #ececec}.plugMid627-set li{height:40px;line-height:40px;text-align:center}.plugMid627-set li:hover{color:#F40137}.plugMid627-noCoupon img{width:100%;vertical-align:middle}.plugMid627-coupon{background:#fff}.plugMid627-hasCoupon{display:none;border-bottom:1px dashed #ececec;padding-left:20px;height:79px}.plugMid627-couBox{position:relative;display:flex;align-items:center;width:100%;height:100%}.plugMid627-couPrice{color:#444;font-size:14px;width:100px;overflow:hidden;white-space:nowrap}.plugMid627-couPrice span{font-weight:700;font-size:16px;color:#F40137}.plugMid627-couTime{font-size:12px;color:#999;width:100px;overflow:hidden}.plugMid627-couBack{position:relative;width:155px;height:44px;cursor:pointer;color:#fff;margin-left:15px;background:url(data:image/gif;base64,R0lGODlhmwAsAPf/APYBOf+Cm+grU/55lvkxXf/j6dsjSvxGb/90k/+1xPIoVf/n7P5efugjTPlVev9SeOAnTvo6Zf+IovItWewlUfs+aPgsWv/q7v/n6+EtVOBObf9YfP+fsv91lPYjUv7Q2v7E0P9tivdafPZXev+4xvZTd//Ez/7b4vxDbfIzXf1gg/5MdP6Hn/+Vq/7L1fYkU/9qi/lZfO1Pcf1egPVQdf5xj/91kP9Wev5oivYnVf5Sd/97lvJPc/5bfv/M1fqzwvUxXP5UeP+tvvZxjvGYq/YgT/5OdvUEOv4xX/84ZP5Rd//7/P1IcP+muP/u8v/2+P5Mc/+LovtegfcLQPQSRP9UeuUKOfxhhP1rjP89ZvIIPP/c4/5Da/cRRP/d5P/h5/47ZPEEOfhOdP1Fbf5BZ+4QQewEN+UDM/xkhv86Zv5tjf5ykf1oitMCLv4/afxlh/+JpPIOQP5ykO0KPNsHM/6Dn/pcf/hQddoDMf9nhv5vj/6GoP5Tdf/8/f+Opf68yv/V3f5/m//5+v/z9v6Cnf6ru//P2P96lf+wv/+arv+htO+JntMCLe1UdfiSqOAEM/89af94lP89aP58mPo3Yv52k/9XfP59mf56lfNYevJQc/s6Zvo0YPJUd/+ouf5PduZScf6PpeVPb/1Jcf/8/PxKcv/3+f+wwPs4ZP/i5//W3f/w9PxEbf9sjfw/af+Zrf5Pdftgg/5oif/r8P1qi/+itftBav/L1v/I0vStu/+9y/xAa/lOdelQcfhNc/1MdP+KpPtjhfs9Z/5sjf5xkf5NdP9vj//l6v9Vev5liP9Pdv5jhf5Jcvk3Yv1jhfxlhvpbfv5jhupsiPlOdP5uj/9zkv6FoP5mh/hPdf9tjf+HovY0X/5ae/MkU/coV/6Bnf5Xef56lP/g5vkzX/MiUP5nhf1bfv+SqP/W3v58mf5ph/mhtP6OpP+Rp/99mO1TdP+9yv/AzfgVR/41YP9WfPsjU/wnV/41Yv0uXPohUfUCOPwrWvodT/kZS////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBMkYxNzZGOUVBMzExRTg5MkVBQkE1NDYzNTJBRkIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBMkYxNzcwOUVBMzExRTg5MkVBQkE1NDYzNTJBRkIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEEyRjE3NkQ5RUEzMTFFODkyRUFCQTU0NjM1MkFGQjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEEyRjE3NkU5RUEzMTFFODkyRUFCQTU0NjM1MkFGQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0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)}@media (max-width:1179px){#plugMid627.plugTB .plugMid627-couBack{margin-left:-5px}#plugMid627.plugTB .plugMid627-hasCoupon{padding-left:10px}#plugMid627.plugTB .plugMid627-ADTitle{width:62px;overflow:hidden}}.plugMid627-couAmount,.plugMid627-couNeed{width:97px;text-align:center;line-height:16px;height:16px}.plugMid627-couAmount{margin-top:7px;font-size:16px;font-weight:700}.plugMid627-couNeed{font-size:12px;transform:scale(.84);margin-top:3px;overflow:hidden;opacity:.6}.plugMid627-couEmpty{width:60px}.plugMid627-couQr,.plugMid627-couQrBig{position:absolute;width:48px;right:12px;top:11px;cursor:pointer}.plugMid627-couQr-icon{width:30px;height:30px;margin:4px auto 6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAYFBMVEUAAABFRUVGRkZFRUVFRUVFRUVFRUVERERGRkZFRUVHR0dFRUVRUVFJSUlFRUVJSUlFRUVFRUVbW1tFRUVISEhERERERET///9ERERFRUVFRUVERERFRUVKSkpVVVVEREQGu0XdAAAAH3RSTlMAXUmnZOL5e0KuK8UTDZgVkVUIkyDZwAHQf3jrthgDjfjCdgAAALZJREFUKM+l0dkOwiAQheHTTZQWKktXF97/LW0E4sRIiul/RfhuYAaOVgC1I532ual8Y+QxXDRvruArI5/hu2RyIaWmLKRUhKVzgnLv3DWftRCgPAmhM582lr4l8hou2o2PDbWgWcAWNByroSlAheMCyGZIPI1M7db6hshz23pOTa3/i5Ux+otnY4b0Qn15LLpuojx1ocS+Yxvfua/+8JPzB2A5hyP9+NgOMxoHOGMWmrESUGx9AbSUL+2LYKH8AAAAAElFTkSuQmCC)}.plugMid627-couQr-title{font-size:12px;height:18px;line-height:18px}.plugMid627-couQr-box{display:none;position:absolute;z-index:100000;top:-12px;right:-170px;text-align:center;width:158px;height:202px;overflow:hidden}.plugMid627-couQr-drop{background:#fff;width:156px;height:200px;border:1px solid #ececec;transform:translate3d(-100%,0,0);transition:transform .5s}.plugMid627-couQr-drop.show{transform:translate3d(0,0,0)}#plugMid627-couQr{margin:18px auto 10px;width:120px}.plugMid627-noCoupon{display:none;border-bottom:1px dashed #ececec;padding:5px 0 5px 14px}.plugMid627-noCoupon b{font-weight:400;font-size:12px;background:#fff;color:#FF3A27;border:1px solid #FF3A27;border-radius:3px;float:left;padding:0 2px;margin-top:5px;width:auto;line-height:18px}.plugMid627-noCoupon span{float:none;display:block;margin-left:36px;line-height:30px;position:relative;font-size:12px;cursor:pointer}.plugMid627-noCoupon span.color{color:#FF3A27}.plugMid627-noCoupon span:hover{text-decoration:underline;color:#FF3A27}.plugMid627-couScan{position:absolute;display:none;left:148px;height:150px;width:127px;top:-54px;background:#FFF7F8;z-index:9000000;border:1px solid #F95774}#plugMid627-couScan{height:100px;width:100px;margin:10px auto}.plugMid627-couScan-title{font-size:14px;color:#F95572;letter-spacing:0;font-weight:700;float:left;height:12px;line-height:14px;width:100%;margin-top:4px;text-align:center}.plugMid627-rollAd{height:30px;border:1px solid #ECECEC;border-top:none;overflow:hidden;position:relative;background:#fff;z-index:8}.plugMid627-rollAd ul{position:relative;height:100%;padding-left:20px}.plugMid627-rollAd li{height:30px;color:#444;display:flex;align-items:center}.plugMid627-rollAd span{line-height:30px;cursor:pointer}.plugMid627-rollAd span:hover{color:#F40137}#plugFix627{display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index:2147483647}.plugFix627-shadow{position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.75)}.plugFix627-box{text-align:center;border-radius:20px;width:500px;height:500px;box-sizing:border-box;position:absolute;left:50%;top:50%;margin:-250px 0 0 -250px}.plugFix627-close{position:absolute;right:50%;bottom:0;margin-right:-15px;width:30px;height:30px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMAu/oRSx0M8XRZJ+2lBz3Dwm713aqek4h5ajLgxdG2gGKXqD5kAAABfUlEQVRIx52W6XaFIAyEw+JVBLu4Vr3bvP9LttLWIyVaD/NPD58yJCShWMr0orFS2kb0RtG/ykYhsZEUY3YMdH5VoUtVVarUhee7fUgNNWRrVLjLVqIeFE9oC7iM+bUDrOaID0BMxGoSwEf0tnJAQbsqAFf9Ia7INR1I57iGjMNc0qHKGS70kQcEy+RbPxrY3RW/StnYOX8G9jc+AwSdksDwE6oa0zlkQv0d6g6OTsqh8z+BzM4imcSydkRLp9Vi9J5M6PF+oVUv85O2MhBESsows+94u6xEHn7Pr/ZcoMvrF7MS79E5G+pREMfwBBXoSUATx/AEaQhqUBLLsASVaMhCEcfcWIIULElUxDC3nUtaQbKI97H44RELxRLF4ofdGGvfO/dnwNoX0CxBPKMhllCyxMrEoTQQPMEzAiZOy9kTK/OI0jJO/uf28fIoo+RPuGIJFzmhXCQUpYTSl1BgE8p4QrNIaEkJjS+hvaY18fRR4XggSRx70oerhBHuE36YJtNdpHYUAAAAAElFTkSuQmCC);background-size:cover}#plugBot627{height:40px;position:fixed;background:#FDFDFD;left:0;bottom:0;z-index:2147483647;display:flex;align-items:center;border-top:1px solid #DDD;border-right:1px solid #DDD}#plugBot627>div{display:flex;align-items:center;justify-content:center}#plugBot627>div.plugBot627-rollAd{align-items:stretch}.plugBot627-logo{width:30px;margin-left:10px;height:30px;border-radius:3px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAolBMVEX0ATf////1KVf6ma/2N2L8wM34cpD94uj0D0L+9/j1JlT1Hk7++/v+6e395uv94Ob8usn1G0v+8/X94ef90Nr7pbj6j6f6iqP4aor+8fT92eH8zdj6nLH3WHz3THL2QWr0Fkj0BTr+7vH91t78yNT8w9D7ssL7rb77qrz5hJ75epf4cI/4ZIb4X4H3VHn2PGb92+L7tcT7tMT6oLT5d5T2RGyzIRGEAAABGklEQVQ4y+3R2XKCQBAF0L6IOiCrssgmwX036///WmBIIsJg8N3zcqGqa2bqNj09inkS3eMbNnFT+Dxtg2dDjB1xLo48d+iRiAw94x8G+NWZDpmEIiRFXGBSIUFETaozHI4xHubmUIoofx21NpiiRUo1tvQjhiVd2dRmpECmLrZY0z3nXukDsHpV9eMNtHDrbQ8KvobVgPM0IM7zMCIBycSCUeliQpmS2GyOxbUO5gLvL6LdvAF9RhVJAH3WPE6DZvWrLE9eAY3r99iqJm4F6l7zqC5/DpMNnORfqQWXGAl9Qa+WgJDE2CsO1bVj0jIXYZl1GBw5cBj9P3gMEN72e8KSmjbAhv2VP1FyvMSGdXiubElHzvykp46+AbUPD9nBTSJTAAAAAElFTkSuQmCC) center no-repeat}.plugBot627-burst,.plugBot627-coupon,.plugBot627-rollAd{height:40px;cursor:pointer;margin-left:10px;padding:0 5px;position:relative}.plugBot627-burst-head{opacity:.6;width:93px;height:28px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAcCAMAAAA0q0M4AAABKVBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzP0WY30WY3zR3TzWW/yTWL0LGPtfkX0WY30WY30WY3ueEjzPV70WY30WY3xaXDtgUT0WY30L2L0LmL0WY3teEn0MWHyOV/0WY3tfkbvb0v0LWPtgUTxTljvYVH0WY3wV1T0K2PtgUTwWFUzMzPzNmDueEn0WY3zM2HzOV/tf0XzM2HudErtfUf0WY3zNWDwWlTteUjySlnvZVDyOGDudknuckryOl/xUVfwXVLzLWLzQlzubE3tgUbzQ1v0LGP0WY30LWP0WY3xSlrvZVD0WY30L2LvaE7teUjvaU7wVlXwVVXtgEbtgET0WY30WY0zMzP0WY3yQlzva03tf0XtDlIlAAAAXnRSTlMAv39A3+/Pj2AQryAwn1CaMhoPCv3q1ruFWVgqFgn5+PXp5NLNzczLysfEw8OpmomJh3BiYk9JPj4oJR52+fn5+Pjz8+vq6Ojc29vbycKjmZOKiW1bWkY/+fmZmVpD5DM1qwAAAvdJREFUSMet1eda2zAYBeAjyfK22zSLkbChQMsolE0ne5fdKQH3fxH9ZMWBBH76/RHj2D4oR1+eoG11fro6MFCdnl9F4T4ePQxM/56f/zM98HD0EYXaePvwtrdp/2720skGirNarfbiid5qtbh6br6Mdq11Y/TLDYqxvjX6Bl3ejG6toxCT2y8ErW9PFjMt9+3O+2dmltrd33dNTsjwIs9DJKwIhJn73BDW4WS7jprWtWb7Ix12hijlweIqx2wal8xQHD7njsP5Qn7v7f01rFJN1+u6nu/B9f0tHvmKnvbzdGFReiBcxsN2useYpBNHOYwAF9/KyPwb0RONRk3X+u15+dvF03A3CFzFW+mwKD1WiilarkGXAyFcV4hQcfMhgPfvYTR+aF3fHOlvTOjBngZIfoUEiXIFM/Es7kqHUlKFUjm0XkoXygq5Ckw7e7Mw6npwE5d6pNSkf3MJY3YPVuqoBKmpwaPnutMJLZtxRocIwvAdn7mxpJV8/mBLnzGFzEzQ6+seZD58tsdIOmm2rXS3MGVSlmXSqff0SbrKAMyu4FeWTpmvyKl5oXCb/hOt+FiQ1BfE9s4tOzMubWXWDGNeLDIxpccgu7M24q/OjcCa3cWzEVTo7h2OclPab5aoRMSsNamBUgsg7961hv11ZmlQ52unK10S5T1LD8zM0HbQwYzUAmcs8eHTHIGcfy3jUXNC12GVv56jE40lutPpzVQ6IqQFJwvSDWTIWChjyfzs27Fy14dHp7rWgNV3t4IOsZQBnvXOHKShpJW7SrIokRFjUegqAUea5g+O0dajB/vRcnyADoFDj5DOmYnMV4hxL1RRwBOI7M3QdCSUjIDFx8Uvab2E9tIX0SFyed4Qg8U8OsmucZ4iI8xYejy7zQMZ3ynlVfdsoqW0M45CrH0ff/7rMf59DcVY/jRWQofS2KdlFGV5aLgPT/QNDxUXTuWMVaauyq3yr6YqY2so1OJ+ZejkbG7u7GSosr+Iwq3MTQ1XKsNTcysozH94u3W6C1fy3AAAAABJRU5ErkJggg==) center no-repeat}.plugBot627-coupon-head{opacity:.6;width:78px;height:28px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAcCAMAAAD4MnnTAAABBVBMVEUAAAAzMzMzMzMzMzP0WY0zMzMzMzP0WY0zMzMzMzMzMzMzMzP0WY0zMzMzMzMzMzMzMzMzMzP0WY0zMzPtg0PzMV3xWFH0WY3yWW3yRVjzM1z0WY3tfkTwU1PueUb0WY30WY3wWFL0K2DuekbtfUX0LV/ucknyPln0Kl/tg0PxTlXvYk/0WY3wWFLtg0P0WY3zNVzuekbzL17vbUvtf0TyQlnzMl3zOFvzMl3ud0jtfkXzN1v0WY30WY30WY3vZU3udEnyO1rxUlTvXlDthEP0LF/zQ1nug0TvbUzudEj0K1/zKl/0K1/te0b0WY3ugkTtgkTvZk3uZU0zMzP0WY30LV7vbUuS5f+oAAAAU3RSTlMAf79Av89gQO+f36/vcFAwjyDfEPzMCmAP/fXPzYg+IDD5+Pbr6djLxMTDw6+aiX9iYllZWVhJPiglHhqPcFD46+ro6Ojc29vKypmLh0afmZmJiVXcaDIAAALFSURBVEjHpZXpVuJAEIVv0iSEJIQgoLjiiqAIiCju+77MVq3v/yhT3R2G6MyPOfD96Ero05dbfesA/rDUbt6Wy7fN9hImZ/ehXG5+b7d/NMvlh11MxvFCeaE/Dc10n1+OMQFL6+t9pOivr0/Q8duacZN2u/aGMTlaq1fxhWp97Qjj8XT5j5NHl09jZvqxp+vMMvAtA5xxZfY+xsu3/mhqGC5DSszIeWge6xgRx4DtlvIlJAgSSHALvJ8DIqFSTcxlz2QnK8PsvJzJJvZG6ZbIAciKyI9QsBUOOboWUPQ8AQpQ8BwAPy/MvMkUZv4ufmFInlwlp48ULUWOcroWwR/y97jwPXaJ7W0Yd0xHtrIKMGYnwfeh5Qw0QnWdQuBmxwSRYabkVEZxCsXODRIsstIKlBcibxagJFQNhKaElcWh3LxkNa1o5BZXYCh6ZAkRkaMkBKCuzTEL4HLHDnduUHKG2rycqqIWhmfAZ7mAyFJd2Uma6nDOLEBs20SciU8+r7g2zVY7odStqjJjmr2GIeZmVRxWImfHRi5HgfLukKvCd7yIy9YWFMthyEr6/kKZBUY7SFJgb0oulWxMHKblkZeMDtkuFmenTbLVmmxx7cjzmhmU2cW0nKBAybl+ZCsCx2IcKgS2a/nEzza5foDB7D40PMDnXFqJN+zPDtJybE7JccOulycRk1sMLMpB4dkAcgTF/SaYc871FBkpZQjD5j1ScjEFbDBCQPB9/WDz7Hp+SQu5ABwHiq62V5OZrB6X1vLQXDclx3NRQpEY22Vf+ro8KgovQmRTUFDJxomNqxOlh0+cXG1ihJ0PCioFPXb8JCyFztklP48Sh+3CcDhX+fvnszJ3iP9D4AsHc5WTL94qcwcYF9bb6CFFb2MSNe638l7pDf8Ye/xyiMno3r2vNp5fX58bq+93XUzO4KWxsbq60XgZYHx+A2aCZvMJPqQdAAAAAElFTkSuQmCC) center no-repeat}.plugBot627-burst:hover,.plugBot627-coupon:hover{background:#f7f7f7}.plugBot627-burst:hover .plugBot627-burst-head,.plugBot627-coupon:hover .plugBot627-coupon-head{opacity:1}.plugBot627-burst-drop{position:absolute;background:#FDFDFD;width:350px;height:225px;border:1px solid #DFDFDF;border-radius:5px 5px 0 0;box-shadow:rgba(0,0,0,.0980392) 0 0 6px;bottom:39px;left:0}.plugBot627-burst-drop img{width:90px;height:90px}.plugBot627-burst-dropHead{position:relative;color:#333;line-height:25px;font-size:16px;font-weight:700;padding-left:15px;height:25px;margin:15px 0 11px 15px}.plugBot627-burst-dropHead::before{content:"";position:absolute;top:3px;left:0;height:18px;border-left:3px solid #FF3A27}.plugBot627-burst-drop ul{margin:15px 0 0;display:flex;align-items:center;justify-content:space-around;height:170px;color:#666}.plugBot627-burst-drop li{width:95px;height:160px;margin-bottom:10px}.plugBot627-burst-dropTitle{font-size:12px;height:18px;margin-top:12px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.plugBot627-burst-dropPrice{color:#FF5645;font-size:12px;height:36px;white-space:normal;text-overflow:ellipsis;display:-webkit-box}.plugBot627-rollAd{overflow:hidden}.plugBot627-rollAd ul{position:relative}.plugBot627-rollAd li{display:flex;align-items:center;height:40px;font-size:12px;color:#FF3A27}.plugBot627-rollAd li:hover{text-decoration:underline}.plugBot627-rollAd img{height:30px}.plugBot627-close{width:28px;height:40px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAKlBMVEUAAACTnaaVnaWUnaaTnaWVn6WUnKaUnaWUnKeTnKaXn6eUnaaUnKaUnaZyV6Y5AAAADXRSTlMAwGDwgDCgn0CQIHBfvGJUrQAAAIRJREFUKM9jIB6sAeKOAASf1XYCA8NdAYRA8F0HsABCwTUGFAHluwkoAkx3gQqQBXSBCsACcAVXGCACcAUKUAGYgksMKAK+YAUIATagAoQAQgFCwNaIAU0AqANDC35DEUowHYbpdEzPwZUUMKAF0HW4AEIJWiADleCNBsyIYlgNjUrCAAC8Dj4kPBg6uAAAAABJRU5ErkJggg==) center no-repeat;cursor:pointer}';
        // $.ajax({
        //     url:chrome.extension.getURL("local/style.css"),
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
        var middleTemplateHtml1 = `<div id="plugMid627">
            <div class="plugMid627-tool">
                <div class="plugMid627-logo"></div>
                <div class="plugMid627-AD bind" id="plugMid627-ADImg1">
                    <div class="plugMid627-ADIcon"></div>
                    <div class="plugMid627-ADTitle"></div>
                    <div class="plugMid627-drop">
                        <div class="plugMid627-ADImg"></div>
                    </div>
                </div>
                <div class="plugMid627-AD bind" id="plugMid627-ADImg2">
                    <div class="plugMid627-ADIcon"></div>
                    <div class="plugMid627-ADTitle"></div>
                    <div class="plugMid627-drop qrCode">
                        <div>
                            <div class="plugMid627-ADImg"></div>
                            <div class="plugMid627-drop-title">微信扫码马上体验</div>
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
        var nowPlat = '';
        var middleTemplateDom = {
            ".tm-fcs-panel":"tm",
            ".tb-promo-meta":"tb",
            ".tb-meta":"tb",
            ".summary-price-wrap":"jd",
            ".J_statusBanner":"ju",
            ".proinfo-focus":"sn",
            ".price_info":"dd",
            "#J-pi-price-box":"wp"
        };  //天猫 淘宝 淘宝 京东 聚划算 苏宁 当当 唯品会
        $.each(middleTemplateDom,function (v,k) {
            if ($(v).length) {
                $(v).after(middleTemplateHtml1);
                nowPlat = k;
                if (k == "tm") {
                    $("#plugMid627").addClass('plugTM');
                } else if (k == "tb") {
                    $("#plugMid627").addClass('plugTB');
                }
                return false;
            }
        }); //中间区域插入代码块
        if (channelId == '120016') {
            $('.plugMid627-logo').addClass('jys');
        }
        var sj_id = getUrlParam("id"),//获取当前商品id
            jdCat = '',
            consult = [],//咨询群
            myMmId = [
                "mm_186350031_100250459_42860000467",
                "mm_186350031_100250459_42861550293"
            ],//推广mmid
            myQrMmId = [
                "mm_186350031_100250459_42866050233"
            ],//扫码推广mmid
            myPostMmId = "mm_133078964_46586405_1416646851";//上报mmid
        if (channelId && channelId == '130001') {
            myMmId = [
                "mm_32823682_143600200_43743750078"
            ];
            myQrMmId = [
                "mm_32823682_143600200_43758850294"
            ];
        }
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
        function trim(str) {
            return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
        }                                    // 去掉字符串前后空格
        function verSlide(dom) {
            !function () {
                $(dom + " li:eq(0)").clone(true).appendTo($(dom + " ul"));
                var liHeight = $(dom).height();
                var totalHeight = ($(dom + " li").length * $(dom + " li").eq(0).height()) - liHeight;
                $(dom + " ul").height(totalHeight);
                var index = 0;
                var autoTimer = 0;
                var clickEndFlag = true;    //
                function tab() {
                    $(dom + " ul").stop().animate({
                        top:-index * liHeight
                    },400,function () {
                        clickEndFlag = true;
                        if (index == $(dom + " li").length - 1) {
                            $(dom + " ul").css({top:0});
                            index = 0;
                        }
                    })
                }        //
                function next() {
                    index++;
                    if (index > $(dom + " li").length - 1) {
                        index = 0;
                    }
                    tab();
                }       //
                autoTimer = setInterval(next,2000); //
                $(dom + " li").hover(function () {
                    clearInterval(autoTimer);
                },function () {
                    autoTimer = setInterval(next,2000);
                }); //轮播逻辑代码
            }();
        }                                //垂直轮播
        if (channelId && channelId == '130001') {
            cnzzAppend("1275097963","https://s22.cnzz.com/z_stat.php?id=1275097963&web_id=1275097963",function () {cnzzEvent("MID展示","展示");});
        } else {
            cnzzAppend("1274446362","https://s13.cnzz.com/z_stat.php?id=1274446362&web_id=1274446362",function () {cnzzEvent("MID展示","展示");});
        }
        !function () {
            var qqUrl = Math.floor(Math.random() * consult.length);
            qqUrl = consult[qqUrl];
            $(".plugMid627-QQ a").attr("href",qqUrl);
        }();                                       //随机咨询群链接
        !function () {
            var times = null;
            $(".plugMid627-AD .plugMid627-drop").not($(".qrCode")[0]).width($("#plugMid627").width());
            $(window).on("resize",function () {
                $(".plugMid627-AD .plugMid627-drop").not($(".qrCode")[0]).width($("#plugMid627").width());
            });
            $("#plugMid627").on("mouseenter",".plugMid627-AD.bind,.plugMid627-set",function () {
                var that = $(this);
                times = setTimeout(function () {
                    that.children(".plugMid627-drop").show();
                    that.css("border-bottom","1px solid transparent");
                },300)
            });
            $("#plugMid627").on("mouseleave",".plugMid627-AD.bind,.plugMid627-set",function () {
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
         });     *///打字机
        !function () {
            var adData = {};
            if (adJson) {
                adData = adJson.MidAD
            }
            $.each(adData,function (v,k) {
                $(`#plugMid627-ADImg${k.index}`).attr("data-moguYR",k.cnzzName);
                $(`#plugMid627-ADImg${k.index} .plugMid627-ADTitle`).html(k.title);
                $(`#plugMid627-ADImg${k.index} .plugMid627-ADIcon`).html(k.icon);
                if (k.type == 1) {
                    $(`#plugMid627-ADImg${k.index} .plugMid627-ADImg`).html(`<img src="${k.pic}" data-moguDJ="${k.cnzzName}">`);
                } else if (k.type == 2) {
                    var itemHtml = `<div class="plugMid627-ADItem2" data-moguDJ="${k.cnzzName}">
                        <div class="plugMid627-ADItem2-img"><img src="${k.pic}"></div>
                        <div class="plugMid627-ADItem2-box">
                            <div class="plugMid627-ADItem2-icon"></div>
                            <div class="plugMid627-ADItem2-title">${k.desc}</div>
                            <div class="plugMid627-ADItem2-price">¥${k.price}</div>
                        </div>
                    </div>`;
                    $(`#plugMid627-ADImg${k.index} .plugMid627-ADImg`).html(itemHtml);
                } else if (k.type == 3) {
                    $(`#plugMid627-ADImg${k.index}`).removeClass("bind");
                    $(`#plugMid627-ADImg${k.index}`).attr("data-moguDJ",k.cnzzName);
                    $(`#plugMid627-ADImg${k.index}`).click(function () {
                        if (k.url) {
                            openWindow(k.url);
                        }
                    });
                }
                $(`#plugMid627-ADImg${k.index} .plugMid627-ADImg`).click(function () {
                    if (k.url) {
                        openWindow(k.url);
                    }
                });
            });
        }();                                       //上面两个广告位模块1
        !function () {
            var adData = []; //没有优惠券时或者京东等其他平台中间的广告图和跳转地址以及cnzz点击事件名称
            if (adJson) {
                adData = adJson.noCouAD
            }
            function noCouponHtml(adData) {
                return `<div class="plugMid627-couBox">
                    <div>
                        <div><b>活动</b><span class="color" data-url="${adData[0].url}" data-moguDJ="${adData[0].cnzz}">${adData[0].name}</span></div>
                        <div><b>领券</b><span data-url="${adData[1].url}" data-moguDJ="${adData[1].cnzz}">${adData[1].name}</span></div>
                    </div>
                </div>`
            } //无券的视图渲染
            function noCouponQrHtml(t,p) {
                return `<div class="plugMid627-couEmpty"></div>
                <div class="plugMid627-couQr" data-moguYR="${p}扫码下单">
                    <div class="plugMid627-couQr-icon"></div>
                    <div class="plugMid627-couQr-title">${t}下单</div>
                    <div class="plugMid627-couQr-box">
                        <div class="plugMid627-couQr-drop">
                            <div id="plugMid627-couQr"></div>
                            <div class="">打开${t}<br>扫码轻松下单</div>
                        </div>  
                    </div>
                </div>`
            } //无券时二维码下单的渲染
            function hasCouHtml(a,b,c,p,m) {
                return `<div class="plugMid627-couBox">
                    <div>
                        <div class="plugMid627-couPrice">券后价 <span>¥${sub(a,b)}</span></div>
                        <div class="plugMid627-couTime" data-endtime=""></div>
                    </div>
                    <div class="plugMid627-couBack" data-moguDJ="领取优惠券">
                        <div class="plugMid627-couAmount">${b}元券</div>
                        <div class="plugMid627-couNeed">${c}</div>
                    </div>
                    <div class="plugMid627-couEmpty"></div>
                    <div class="plugMid627-couQr" data-moguYR="${m}扫码领券">
                        <div class="plugMid627-couQr-icon"></div>
                        <div class="plugMid627-couQr-title">${p}领券</div>
                        <div class="plugMid627-couQr-box">
                            <div class="plugMid627-couQr-drop">
                                <div id="plugMid627-couQr"></div>
                                <div class="">${p}扫码领券<br>商品<span>立减${b}元</span></div>
                            </div>  
                        </div>
                    </div>
                </div>`;
            }                    //有券的视图渲染
            function startQRCode(qrcodeText) {
                //生成二维码
                new QRCode($("#plugMid627-couQr")[0],{
                    text:qrcodeText,
                    width:120,
                    height:120,
                    colorDark:"#000000",
                    colorLight:"#ffffff",
                    correctLevel:QRCode.CorrectLevel.L
                });
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
            }   //生成二维码
            !function () {
                var itemTitle = $("head>title")[0].innerHTML.replace(/-淘宝网$|-tmall.com天猫$|-天猫超市-天猫Tmall.com-上天猫，就购了-理想生活上天猫$/,"");//详情页标题;
                var tbCookie = '';
                if (nowPlat != 'tm' && nowPlat != 'tb' && nowPlat != 'ju') {
                    return
                }
                if (nowPlat == 'ju') {
                    sj_id = getUrlParam("item_id") ? getUrlParam("item_id") : getUrlParam("itemId");
                    itemTitle = $("head>title")[0].innerHTML.replace(/-聚划算团购/,"");
                    $.ajax({
                        url:"https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/",
                        data:{data:`{"itemNumId":"${sj_id}"}`},
                        success:function (e) {
                            if (e && e.data && e.data.item) {
                                itemTitle = e.data.item.title;
                            }
                        },
                        complete:function () {
                            startCou();
                        }
                    }); //淘宝H5商品数据
                } else {
                    startCou();
                }
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
                function startCou() {
                    var page = 1;
                    var getH5CouNum = 0;    //点击
                    var page1 = 1;
                    var getH5CouNum1 = 0;   //扫码
                    var page2 = 1;
                    var getH5CouNum2 = 0;   //上报
                    function getDan(pid,page,num,callBack) {
                        var time = Date.now();
                        var s = `{"q":"${itemTitle}","pid":"${pid}","page":${page},"useItemCouponPage":"1","lunaUrlParam": "{'algo_sort':'mixcoupon','rank':'rank_profile:FirstRankScorer_atbh5','PS':'tk_item_score_atbh5','appBucket':'h'}"}`;
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
                                                callBack(k,'has');    //有相应推广优惠券
                                            } else {
                                                callBack(k,'no');    //有推广链接无优惠券的
                                            }
                                            hasSwi = 0;
                                            return false;
                                        }
                                    });
                                    if (hasSwi) {
                                        if (page == 3) {
                                            callBack(0);        //数据没对应ID,可能没有推广,可能前面3页都没数据,不知道是否有优惠券
                                            return false
                                        } else {
                                            page++;
                                            getDan(pid,page,num,callBack);
                                        }
                                    }
                                } else {
                                    callBack(0);    //搜索无任何数据,没有优惠券
                                }
                            } else {
                                num++;
                                if (num == 3) {
                                    callBack(0);    //请求失败包括签名过期等因素
                                    return false
                                } else {
                                    getTbCookie(getDan,pid,page,num,callBack);  //递归调用
                                }
                            }
                        });
                    }        //旧API请求单品优惠券
                    function getDanNewApi() {
                        chrome.extension.sendMessage({
                            name:"universal",
                            url:`${apiUrl}/tb`,
                            type:"post",
                            dataType:"json",
                            data:{
                                itemId:sj_id,
                                type:apiKey
                            }
                        },function (e) {
                            if (!e || e.code != 1) {
                                getTbCookie(getDan,myMmId,page,getH5CouNum,setCoupon);  //读取cook获取点击
                                return
                            }
                            var data = (typeof e.msg == 'string') ? JSON.parse(e.msg) : e.msg;
                            if (!data.success) {
                                getTbCookie(getDan,myMmId,page,getH5CouNum,setCoupon);  //读取cook获取点击
                                return
                            }
                            if (data.success && data.list && data.list.item && data.list.item.couponInfo && data.list.item.endTime && data.list.item.totalCount) {
                                data = data.list.item;
                                var amount = parseFloat(data.couponInfo.split("减")[1] ? data.couponInfo.split("减")[1] : data.couponInfo.split("减")[0]);
                                var amountReq = data.couponInfo;
                                var urls = data.tbLink;
                                var html = hasCouHtml(data.finalPrice,amount,amountReq,'手淘','淘宝');   //淘宝平台新接口渲染
                                $(".plugMid627-hasCoupon").html(html);
                                $(".plugMid627-hasCoupon").show();
                                $(".plugMid627-couBack").click(function () {
                                    openWindow(urls);
                                });
                                var ntime = new Date(data.endTime + ' 23:59:59');
                                ntime = Math.floor(ntime.getTime() / 1000);
                                $(".plugMid627-couTime").attr("data-endtime",ntime);
                                opTimer(".plugMid627-couTime");
                                getTbCookie(getDan,myQrMmId,page1,getH5CouNum1,setQrCoupon);    //用的新接口无cook,读取cook 获取扫码
                            } else {
                                $(".plugMid627-noCoupon").html(noCouponHtml(adData));
                                $(".plugMid627-noCoupon").show();
                                $(".plugMid627-noCoupon").on('click','span',function () {
                                    openWindow($(this).data('url'));
                                });
                                cnzzEvent('无券广告','曝光');
                            }
                        });
                    }                       //新API请求单品优惠券
                    function setCoupon(k,type) {
                        if (k && type == 'has') {
                            var openUrl = "https://uland.taobao.com/coupon/edetail" + "?e=" + getParam(k["clickUrl"],"e");
                            var html = hasCouHtml(k.discountPrice,k.couponAmount / 100,"",'手淘','淘宝');    //淘宝平台旧接口渲染
                            $(".plugMid627-hasCoupon").html(html);
                            $(".plugMid627-hasCoupon").show();
                            $(".plugMid627-couBack").click(function () {
                                openWindow(openUrl);
                            });
                            var conponE = getParam(k.clickUrl,"e"); //优惠券E参数
                            var getH5CouNum3 = 0;                   //获取优惠券详细数据的轮询次数
                            function getCouponInfo() {
                                var time = Date.now();
                                var s = `{"e":"${conponE}","pid":"${myPostMmId}"}`;
                                chrome.extension.sendMessage({
                                    url:"https://acs.m.taobao.com/h5/mtop.alimama.union.hsf.coupon.get/1.0/",
                                    data:{
                                        jsv:"2.4.0",v:"1.0",api:"mtop.alimama.union.hsf.coupon.get",appKey:"12574478",t:time,AntiCreep:true,AntiFlood:true,
                                        sign:md5(tbCookie.split("_")[0] + "&" + time + "&12574478&" + s),data:s
                                    },
                                    type:"get",dataType:"json",name:"universal"
                                },function (r) {
                                    if (r && r.ret && r.ret[0] && r.ret[0].match("调用成功")) {
                                        if (r && r.data && r.data.result) {
                                            var data = r.data.result;
                                            var ntime = new Date(data["effectiveEndTime"]);
                                            ntime = Math.floor(ntime.getTime() / 1000);
                                            $(".plugMid627-couNeed").html(`满${data.startFee}减${data.amount}`);
                                            $(".plugMid627-couTime").attr("data-endtime",ntime);
                                            opTimer(".plugMid627-couTime");
                                        }
                                    } else {
                                        getH5CouNum3++;
                                        if (getH5CouNum3 == 3) {
                                            $(".plugMid627-couNeed").html(`无门槛`);
                                            return false
                                        } else {
                                            getTbCookie(getCouponInfo); //递归请求优惠券详情信息
                                        }
                                    }
                                });
                            }//
                            getCouponInfo();
                            getDan(myQrMmId,page1,getH5CouNum1,setQrCoupon);    //新接口失效返回旧接口已经获取过cook 获取扫码
                        } else {
                            $(".plugMid627-noCoupon").html(noCouponHtml(adData));
                            $(".plugMid627-noCoupon").show();
                            $(".plugMid627-noCoupon").on('click','span',function () {
                                openWindow($(this).data('url'));
                            });
                            cnzzEvent('无券广告','曝光');
                        }
                    }                    //旧接口点击优惠券回调
                    function setQrCoupon(k,type) {
                        var qrcodeText = "https://item.taobao.com/item.htm?id=" + sj_id;
                        if (k) {
                            if (type == 'has') {
                                qrcodeText = "https://uland.taobao.com/coupon/edetail?e=" + getParam(k["clickUrl"],"e");
                            } else {
                                qrcodeText = "https://s.click.taobao.com/t?e=" + getParam(k["clickUrl"],"e");
                            }
                        }
                        startQRCode(qrcodeText);
                    }                  //旧接口二维码优惠券回调
                    getDanNewApi();
                    // getDan(myMmId,page,getH5CouNum,setCoupon);
                }
            }();        //天猫,淘宝,聚划算
            !function () {
                if (nowPlat != 'jd') {
                    return
                }
                var itemId = '';
                var info = {};
                var myScript = document.createElement("script");
                myScript.appendChild(document.createTextNode('window.postMessage({"moguData":{id:pageConfig.product.skuid,cat:pageConfig.product.cat,venderId:pageConfig.product.venderId,shopId:pageConfig.product.shopId}},"*")'));
                document.body.appendChild(myScript);
                window.addEventListener("message",function (event) {
                    if (event.data.moguData) {
                        itemId = event.data.moguData.id;
                        info.venderId = event.data.moguData.venderId;
                        info.cat = event.data.moguData.cat.toString();
                        jdCat = info.cat;
                        info.shopId = event.data.moguData.shopId;
                        startCou();
                    }
                },false);
                function startCou() {
                    function getDanNewApi() {
                        chrome.extension.sendMessage({
                            name:"universal",
                            url:`${apiUrl}/jd`,
                            type:"post",
                            dataType:"json",
                            data:{
                                skuId:itemId,
                                type:"y",
                                action:'coupon'
                            }
                        },function (e) {
                            if (e && e.code == 1) {
                                setCoupon(e.msg,'has')
                            } else {
                                setCoupon(0,'no')
                            }
                        });
                    }                       //自己API请求单品优惠券
                    function setCoupon(k,type) {
                        if (k && type == 'has') {
                            $(".plugMid627-hasCoupon").html(hasCouHtml(k.pcPrice,k.discount,`满${k.quota}减${k.discount}`,'微信','京东')); //京东平台有券渲染
                            $(".plugMid627-couBack").append(hasCouponAdd());
                            startScan(k.link);
                            $(".plugMid627-hasCoupon").show();
                            $(".plugMid627-couTime").attr("data-endtime",k.endTime / 1000);
                            opTimer(".plugMid627-couTime");
                            var qrcodeText = k.link;
                            startQRCode(qrcodeText);
                        } else {
                            getDanSelf();
                        }
                    }                    //
                    function getDanSelf() {
                        chrome.extension.sendMessage({
                            name:"universal",
                            url:"https://cd.jd.com/promotion/v2",
                            type:"get",
                            dataType:"json",
                            data:{skuId:itemId,venderId:info.venderId,shopId:info.shopId,cat:info.cat,area:'1_72_2799_0'}
                        },function (e) {
                            if (e && e.skuCoupon) {
                                var data = '';
                                var hasC = 1;
                                $.each(e.skuCoupon,function (v,k) {
                                    if (k.url) {
                                        data = k;
                                        hasC = 0;
                                        return false
                                    }
                                });
                                if (hasC) {
                                    noCoupon();
                                    return
                                }
                                var url = `https:${data.url}`.replace(/(to=)([^&]*)/g,`to=item.jd.com/${itemId}.html`);
                                chrome.extension.sendMessage({
                                    name:"universal",
                                    url:`${apiUrl}/jd`,
                                    type:"post",
                                    dataType:"json",
                                    data:{skuId:itemId,url:url,type:'y',action:'getcoupon'}
                                },function (d) {
                                    if (d && d.code == 1 && d.msg) {
                                        chrome.extension.sendMessage({
                                            name:"universal",
                                            url:"https://c0.3.cn/stock",
                                            type:"get",
                                            dataType:"json",
                                            data:{skuId:itemId,venderId:info.venderId,extraParam:'{"originid":"1"}',cat:info.cat,area:'1_72_2799_0'}
                                        },function (e) {
                                            var price = '';
                                            if (e && e.stock && e.stock.jdPrice && e.stock.jdPrice.p) {
                                                price = e.stock.jdPrice.p;
                                            } else {
                                            }
                                            $(".plugMid627-hasCoupon").html(hasCouHtml(price,data.discount,`满${data.quota}减${data.discount}`,'微信','京东'));//京东平台有自己店铺券渲染
                                            $(".plugMid627-couBack").append(hasCouponAdd());
                                            startScan(d.msg);
                                            $(".plugMid627-hasCoupon").show();
                                            var endTime = new Date(data.endTime + ' 23:59:59');
                                            endTime = Math.floor(endTime.getTime() / 1000);
                                            $(".plugMid627-couTime").attr("data-endtime",endTime);
                                            opTimer(".plugMid627-couTime");
                                            var qrcodeText = d.msg;
                                            startQRCode(qrcodeText);
                                        });
                                    } else {
                                        noCoupon();
                                    }
                                });
                            } else {
                                noCoupon();
                            }
                        });
                    }                         //获取自己店铺优惠券
                    function getQrNoDan() {
                        chrome.extension.sendMessage({
                            name:"universal",
                            url:`${apiUrl}/jd`,
                            type:"post",
                            dataType:"json",
                            data:{
                                itemid:itemId,
                                type:"s",
                                action:'conversion',
                                url:`https://item.jd.com/${itemId}.html`
                            }
                        },function (e) {
                            if (e && e.code == 1) {
                                $(".plugMid627-couBox").append(noCouponQrHtml("微信",'京东'));
                                $(".plugMid627-couQr").css('top','6px');
                                startQRCode(e.msg);
                            }
                        });
                    }                         //获取无券转链二维码
                    function noCoupon() {
                        $(".plugMid627-noCoupon").html(noCouponHtml(adData));
                        $(".plugMid627-noCoupon").show();
                        $(".plugMid627-noCoupon").on('click','span',function () {
                            openWindow($(this).data('url'));
                        });
                        cnzzEvent('无券广告','曝光');
                        cnzzEvent('京东无券广告','曝光');
                        getQrNoDan()
                    }                           //无券时的处理
                    function hasCouponAdd() {
                        return `<div class="plugMid627-couScan"><div id="plugMid627-couScan"></div><div class="plugMid627-couScan-title">扫码立即领券</div></div>`
                    }                       //有券时追加二维码dom
                    function startScan(qrcodeText) {
                        //生成二维码
                        new QRCode($("#plugMid627-couScan")[0],{
                            text:qrcodeText,
                            width:100,
                            height:100,
                            colorDark:"#000000",
                            colorLight:"#ffffff",
                            correctLevel:QRCode.CorrectLevel.L
                        });
                        $("#plugMid627-couScan").attr("title","");
                        $(".plugMid627-couBack").removeAttr('data-mogudj');
                        $(".plugMid627-couBack").attr('data-moguYR','京东领取优惠券');
                        $(".plugMid627-couBack").hover(
                            function () {
                                $(".plugMid627-couScan").show();
                            },
                            function () {
                                $(".plugMid627-couScan").hide();
                            });
                    }                //生成二维码
                    getDanNewApi();
                }       //京东优惠券
            }();        //京东
            !function () {
                if (nowPlat != 'sn' && nowPlat != 'dd' && nowPlat != 'wp') {
                    return
                }
                if (nowPlat == 'wp') {
                    $('#plugMid627').css('z-index',100)
                }
                $(".plugMid627-noCoupon").html(noCouponHtml(adData));
                $(".plugMid627-noCoupon").show();
                $(".plugMid627-noCoupon").on('click','span',function () {
                    openWindow($(this).data('url'));
                });
                cnzzEvent('无券广告','曝光');
            }()         //苏宁,当当,唯品会
        }();                                       //中间优惠券模块2
        !function () {
            var data = [];
            if (adJson) {
                data = adJson.rollAD
            }
            var html = '';
            $.each(data,function (v,k) {
                html += `<li class="plugMid627-rollAd-item${v}">
                    <span data-moguDJ="${k.clickE}">${k.title}</span>
                </li>`;
                $(".plugMid627-rollAd").on('click',`.plugMid627-rollAd-item${v} span`,function () {
                    // $(".plugFix627-close").attr("data-moguDJ",`${k.name}关闭`);
                    if (k.type) {
                        $(".plugFix627-box img").attr("src",k.pic);
                        $("#plugFix627").css("display","block");
                    } else {
                        openWindow(k.url)
                    }
                })
            });
            $(".plugMid627-rollAd ul").html(html);
            verSlide('.plugMid627-rollAd');
            var fixHtml = `<div id="plugFix627">
                <div class="plugFix627-shadow"></div>
                <div class="plugFix627-box">
                    <img src="">
                    <div class="plugFix627-close"></div>
                </div>
            </div>`;
            $('body').append(fixHtml);
            $("#plugFix627").on("click",".plugFix627-shadow",function () {
                $("#plugFix627").css("display","none");
            });
            $("#plugFix627").on("click",".plugFix627-close",function () {
                $("#plugFix627").css("display","none");
            });
        }();                                       //下面轮播活动模块3
    }

    //全网弹窗广告
    !function () {
        var total;
        var cssTest1 = 1;
        var cssTest2 = 1;
        var cssTest3 = 1;
        var sj_title = $("head>title").length ? $("head>title").html().replace(/-淘宝网|-tmall.com天猫$/,"") : "";
        var alertTime = {};                             //图片弹窗广告的过期时间
        var nowTime = new Date().getTime();             //当前时间戳
        chrome.storage.local.get(null,function (e) {
            if (!e.JsonJs816 && !e.jsonvdata) {
                return
            }
            var n = 0;
            var jsonData = e.JsonJs816 ? e.JsonJs816 : e.jsonvdata;
            jsonData = (typeof jsonData == "string") ? JSON.parse(jsonData) : jsonData;
            var dypAlert = jsonData.alertAD;                                                //右下角弹窗模块4
            var tipsTime = e.tipsTime;                                                      //tips过期时间
            alertTime = e.alertTime ? e.alertTime : {};
            total = dypAlert.length;
            $.each(dypAlert,function (v,k) {
                n++;
                var urlOk = 0;
                var keyOK = 0;
                var urlArr = k.plant.split('|');
                var keyArr = k.keys ? k.keys.split('|') : [];
                $.each(urlArr,function (v1,k1) {
                    if (locHost == k1) {
                        urlOk = 1;
                        return false;
                    }
                });
                if (keyArr.length) {
                    $.each(keyArr,function (v2,k2) {
                        if (sj_title.match(k2)) {
                            keyOK = 1;
                            return false;
                        }
                    });
                } else {
                    keyOK = 1
                }
                if (urlOk && keyOK) {
                    if (channelId && channelId == '130001') {
                        cnzzAppend("1275097963","https://s22.cnzz.com/z_stat.php?id=1275097963&web_id=1275097963");
                    } else {
                        cnzzAppend("1274446362","https://s13.cnzz.com/z_stat.php?id=1274446362&web_id=1274446362");
                    }
                    if (alertTime[`mgTqAlert${n}${locHost}`] && (nowTime < alertTime[`mgTqAlert${n}${locHost}`])) {
                        return
                    }
                    if (k.position.match('2')) {
                        start1(k,n);
                    } else if (k.position.match('3')) {
                        if (tipsTime && (nowTime < tipsTime)) {
                            return
                        }
                        start2(k,n)
                    } else if (k.position.match('4')) {
                        if (tipsTime && (nowTime < tipsTime)) {
                            return
                        }
                        start3(k,n)
                    }
                }
            });
        });
        function setCookie(n) {
            var curDate = new Date();
            var curTamp = curDate.getTime();
            var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
            var passedTamp = curTamp - curWeeHours;
            var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
            alertTime[`mgTqAlert${n}${locHost}`] = leftTamp + curTamp;
            chrome.storage.local.set({alertTime:alertTime});
        }       //存cookie
        function bindEvent(k,n) {
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
                setCookie(n);
            }
            $(`#plug625-alert${n}-close`).click(function () {
                cnzzEvent(`${k.name}关闭`,"点击");
                $(`#plug625-alert${n}`).fadeOut(1000,function () {
                    $(`#plug625-alert${n}`).remove();
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
                        setCookie(nextNum);
                    },2500);
                });
            }
        }     //绑定事件
        function start1(k,n) {
            var typeimg = k.img_src;
            var toUrl = k.link ? k.link : 'javascript:void(0);';
            if (cssTest1) {
                $("<style></style>").html(`.plug625-alert{z-index:999999999999;position:fixed;bottom:0;right:0;display:none}.plug625-alert img{display:block;max-width:300px;max-height:400px}.plug625-alert-close{width:30px;height:30px;position:absolute;right:0;top:0;cursor:pointer;opacity:1;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEUAAAAAAABlZWUAAAD19fWioqIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9IKCr6AAAAEHRSTlOAAJ919bt9Y0AsJghKSVdLz5TIOAAAAKNJREFUKM+F01kOwyAMBNBJpuyQ9P6nLVULiRUw8xXxZIXFxtYTi6O1dCVea42TJ3rok+RAiDDc+cQj58UHBjkaZwyTfxwwSfhy4oyZKntM4yu3YrOjZTf/8g2xr732x1dEgXChyHAQLrQiIVxoRQvh5q6wkmHeBoKpVRNO+7dD0XaeEbVzR2yc3xrbk4zv3K8fVG8HvZn0VtQbWR+D9RAtRvAD7KoEY4+OgCAAAAAASUVORK5CYII=)}.plug625-alert-close:hover{opacity:.5}@keyframes mgslideInLeft{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}.mgslideInLeft{animation-name:mgslideInLeft}.mganimated{animation-duration:1s;animation-fill-mode:both}`).appendTo("head");
                cssTest1 = 0;
            }
            $(document).ready(function () {
                $("body").after(`<div id="plug625-alert${n}" class="mganimated mgslideInLeft plug625-alert" data-name="${k.name}">
                    <a href="${toUrl}" target="_blank" rel="noreferrer"><img src='${typeimg}'></a>
                    <div id="plug625-alert${n}-close" class="plug625-alert-close"></div>
                </div>`);
                if (k.link) {
                    $(`#plug625-alert${n} a`).attr("data-moguDJ",k.name);
                }
                setTimeout(function () {
                    bindEvent(k,n)
                },500 * n);
            });
        }        //整个图片形式
        // function start2(k,n) {
        //     if (cssTest2) {
        //         $("<style></style>").html(`.plug625-alertNew{z-index:999999999999;position:fixed;bottom:0;right:0;display:none;background:#fff;font-family:"Microsoft Yahei",sans-serif}.plug625-alertNew-head{display:flex;background:linear-gradient(to right,#F53669,#FB5E95);color:#fff;height:30px;padding-left:10px;align-items:center;font-size:14px}.plug625-alertNew-head-title{letter-spacing:2px}.plug625-alertNew-set{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAP1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////9Du/pqAAAAFHRSTlMAQBCAMNDAILDwYKDfv5+Q4HBvUC8i92oAAAE+SURBVDjLjVNbcsQgDAsP8w7LZnX/sxYcKKRTptVHGMeOJTviWKATGEkfv+MFY4xTCq9NgfH3CbMpSD1B9DOjg+QvXe+E9pThW4oAfNYiQd2xQhI6e0CM1j4QAK/kHUvlAZiAdMdvvCtLdHZyWhdt6/Tmel82omXxkqcPy6dCLI0+bSN2mVqcqDjF3AxsVaBGGOBjCNHPlgqfQxLymJYs01CfTzqQrIfpiRO67w0nHwQn+09yrR5xdI6wTcAk55SYsWIOh+O/BapTuCeFg+pau0gzRRqe5hYpCXG8T7qrF8NiJJ+LQr6ujOeiLM65aoMKM1dNsK3PZ/ezAneXPsmdST1nWIXITi8mdbnyqCGm4CJU5GG53KJ0eVpMG7Uo07RF6DhNO21vNrYfKLS5ONNgf1y9F07G9vLqAkZZyb8ABqcQzlq00WIAAAAASUVORK5CYII=);margin-left:78px;margin-right:10px;position:relative}.plug625-alertNew-setDrop{display:none;position:absolute;top:20px;left:-32px;width:85px;z-index:10;color:#333;font-size:12px}.plug625-alertNew-setDrop div{margin-top:10px;background:#fff;border:1px solid #ddd;padding:5px}.plug625-alertNew-setDrop div:hover{color:red}.plug625-alertNew-close{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAKlBMVEUAAAD///////////////////////////////////////////////////+Gu8ovAAAADXRSTlMA76AwENCQP8CwYFAgw5s7dQAAAJdJREFUKM9jIAuwH4CxWArAlK4wTMD1GpjKvWgAVRALEXC9K8wAZYRAJYBKwPQlB4iME0SJ4V0FmGG6ICXMspfgFjMBlUAVIJRAFSCUQBUglEAVIJSgKmBgvnvXAM6BuAFkEQIArQBahKJAAWgRigKocxEKwG5BUQBVglAAUYJQAFeCUIAIurkwX7DEQlhr4b7wuM1AGwAAMdUzJRXTMbMAAAAASUVORK5CYII=)}.plug625-alertNew-close,.plug625-alertNew-set{width:20px;height:20px;background-size:cover;cursor:pointer}.plug625-alertNew ul{padding:10px 10px 0 10px;border-left:1px solid #F1F1F1}.plug625-alertNew li{margin-top:10px}.plug625-alertNew li:first-child{margin-top:0;overflow:hidden}.plug625-alertNew li:first-child span{animation:puffOut .5s ease 0s infinite normal both}.plug625-alertNew li div{width:190px;height:110px}.plug625-alertNew li a{position:relative;display:flex}.plug625-alertNew li span{z-index:3;text-align:center;display:block;position:absolute;bottom:0;left:0;width:190px;padding:4px 7px;max-height:28px;line-height:14px;color:#fff;cursor:pointer;background:rgba(0,0,0,.6);font-size:12px;box-sizing:border-box}@keyframes mgslideInTop{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}.mgslideInTop{animation-name:mgslideInTop}.mganimated{animation-duration:.5s;animation-fill-mode:both}@keyframes puffOut{0%{transform-origin:50% 50%;transform:scale(1)}50%{transform-origin:50% 50%;transform:scale(1.1)}100%{transform-origin:50% 50%;transform:scale(1)}}`).appendTo("head");
        //         cssTest2 = 0;
        //     }
        //     $(document).ready(function () {
        //         $("body").after(`<div id="plug625-alert${n}" class="plug625-alertNew mgslideInTop mganimated">
        //             <div class="plug625-alertNew-head">
        //                 <div class="plug625-alertNew-head-title">猜你喜欢</div>
        //                 <div class="plug625-alertNew-set" title="设置" id="plug625-alert${n}-set">
        //                     <div class="plug625-alertNew-setDrop">
        //                         <div id="plug625-alert${n}-setClick">三天不再弹出</div>
        //                     </div>
        //                 </div>
        //                 <div class="plug625-alertNew-close" id="plug625-alert${n}-close" title="关闭"></div>
        //             </div>
        //             <ul></ul>
        //         </div>`);
        //         var html = '';
        //         $.each(k.data,function (v1,k1) {
        //             html += `<li>
        //                 <a href="${k1.link}" target="_blank" rel="noreferrer" data-moguDJ="${k.name}-${v1 + 1}">
        //                     <div style="background:url(${k1.img_src});background-size:190px 110px"></div>
        //                     <span>${k1.title}</span>
        //                 </a>
        //             </li>`
        //         });
        //         $(`#plug625-alert${n} ul`).html(html);
        //         setTimeout(function () {
        //             bindEvent(k,n);
        //             $(`#plug625-alert${n}-set`).hover(
        //                 function () {
        //                     $(this).find('.plug625-alertNew-setDrop').show()
        //                 },
        //                 function () {
        //                     $(this).find('.plug625-alertNew-setDrop').hide()
        //                 }
        //             );
        //             $(`#plug625-alert${n}-setClick`).click(function () {
        //                 chrome.storage.local.set({tipsTime:nowTime + 259200000});
        //                 $(`#plug625-alert${n}-close`).click();
        //             });
        //         },1000 * n);
        //     });
        // }        //信息流广告形式
        function start3(k,n) {
            if (cssTest3) {
                $("<style></style>").html(`.plug625-alertNew{z-index:999999999999;position:fixed;bottom:0;right:0;display:none;background:#FAFAFA;font-family:"Microsoft Yahei",sans-serif;border-left:1px solid #C5C5C5;border-top:1px solid #C5C5C5;box-shadow:0 0 10px #ccc}.plug625-alertNew-head{display:flex;color:#48464B;height:30px;padding-left:10px;align-items:center;font-size:14px}.plug625-alertNew-head-title{font-weight:700}.plug625-alertNew-set{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAQlBMVEUAAABIRExHRUpIRkpHRktFRUpAQEBIRUpIRUpIRUpHRkpISEhIRUtHREtIRUpGRklHRktJRUlIRkpHRkpHRUpIRkslOX7LAAAAFXRSTlMAQPCA0DAQwKDgsCC/cGBQjz/fr2+TrnL8AAABBklEQVQ4y81S266DMAyjSeiVsm7M//+rpywdLdN4PZolSNM4UWyY/hnztlT4dEkgxxWyXA7AvIcbvhXNvT7QI1J9zec6A4/yCJpgKQTcxnpCThxiatMkZMtkB4KT6ROWeFgApt0+fVlbZ0aXK1HjSuQcqO0X/EFAnlRfqd02NoZ3ByGDXy1xGGg9Vk11tt99Mi3DziJz8sEdPtXD7ij4ZLK4dn94TWIHmeT27K08yquHutukgljtzRqs6ypCa/VYmOW9fWyiRtNMDOJNt7eP2Pr5w97ONv7ZMlv8XM1II93RA4Kl7UwCIT5/XOak+tVRw/nbb4ekYboCyr1iC5eElVARzPRj+ANU0QmsikmNlwAAAABJRU5ErkJggg==);margin-left:125px;background-size:cover;margin-right:10px;position:relative}.plug625-alertNew-setDrop{display:none;position:absolute;top:20px;left:-32px;width:85px;z-index:10;color:#333;font-size:12px}.plug625-alertNew-setDrop div{margin-top:2px;background:#fff;border:1px solid #ddd;padding:5px}.plug625-alertNew-setDrop div:hover{color:#fb6400}.plug625-alertNew-close{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEUAAABIRUpIRUpHRUpAQEBIRUpFRUpHRUpIRkpISEhHREtGRklIRkpHRUpIREtIRUpHRkpIRksClJIcAAAAEXRSTlMAoGDwEMAw0IAgcFDfkEDgsByAhvUAAAD0SURBVDjLrVHRtsMgCBsioq22zf//7L1nMEvbPS4vCgkQ9PVTrCQAIGP7Si+MnepSKzF6etClg8psJdB25RNrifHGXC48KF8rsiIoClMkXcFnza7zHhQs0z++7pVm2geUZVZYQxVfCsVPd0KeSGgW7+cuxid3AespFLY13qGHWajxPYw3iJlAjc6NN1R9CAigMxoaR7g/dxpHyBF4c+pQuw2OfFA091Ow+oun+caeyP5XNiqX+bv5HffP7NVa3FHRplvOT77wCF+vUxFzUa3tXs/tFqdYXh89s6Anr2lLx3i62gRQGSQdOEx6R0sk/6CUX7/EH6hdCAUU5WwWAAAAAElFTkSuQmCC) center no-repeat;background-size:18px 18px}.plug625-alertNew-close,.plug625-alertNew-set{width:20px;height:20px;cursor:pointer}.plug625-alertNew ul{width:274px}.plug625-alertNew li{width:100%;padding:0 15px 0 15px;box-sizing:border-box;height:60px;border-bottom:1px solid #E4E4E4}.plug625-alertNew li.head{height:167px;padding:0 10px 10px 10px}.plug625-alertNew li.head a{overflow:hidden}.plug625-alertNew li.head span{z-index:3;text-align:center;display:block;position:absolute;bottom:0;left:0;width:254px;padding:4px 7px;max-height:28px;line-height:14px;color:#fff;cursor:pointer;background:rgba(0,0,0,.6);font-size:12px;box-sizing:border-box;animation:puffOut .5s ease 0s infinite normal both}.plug625-alertNew li a{position:relative;display:flex;align-items:center;width:100%;height:100%}.plug625-alertNew li p{font-size:12px;color:#484848;margin-left:10px;width:175px;max-height:36px;line-height:18px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.plug625-alertNew li:hover p{color:#fb6400;text-decoration:underline}@keyframes mgslideInTop{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}.mgslideInTop{animation-name:mgslideInTop}.mganimated{animation-duration:.5s;animation-fill-mode:both}@keyframes puffOut{0%{transform-origin:50% 50%;transform:scale(1)}50%{transform-origin:50% 50%;transform:scale(1.1)}100%{transform-origin:50% 50%;transform:scale(1)}}`).appendTo("head");
                cssTest3 = 0;
            }
            $(document).ready(function () {
                $("body").after(`<div id="plug625-alert${n}" class="plug625-alertNew mgslideInTop mganimated">
                    <div class="plug625-alertNew-head">
                        <div class="plug625-alertNew-head-title">猜你喜欢 (3)</div>
                        <div class="plug625-alertNew-set" title="设置" id="plug625-alert${n}-set">
                            <div class="plug625-alertNew-setDrop">
                                <div id="plug625-alert${n}-setClick">三天不再弹出</div>
                            </div>
                        </div>
                        <div class="plug625-alertNew-close" id="plug625-alert${n}-close" title="关闭"></div>
                    </div>
                    <ul></ul>
                </div>`);
                var html = '';
                $.each(k.data,function (v1,k1) {
                    if (k1.type == "1") {
                        html += `<li class="head">
                            <a href="${k1.link}" target="_blank" rel="noreferrer" data-moguDJ="${k.name}-${v1 + 1}">
                                <div style="background:url(${k1.img_src});width:100%;height:100%;background-size:254px 156px"></div>
                                <span>${k1.title}</span>
                            </a>
                        </li>`
                    } else if (k1.type == "2") {
                        html += `<li>
                            <a href="${k1.link}" target="_blank" rel="noreferrer" data-moguDJ="${k.name}-${v1 + 1}">
                                <div style="background:url(${k1.img_src});width:40px;height:40px;background-size:cover"></div>
                                <p>${k1.title}</p>
                            </a>
                        </li>`
                    }
                });
                $(`#plug625-alert${n} ul`).html(html);
                setTimeout(function () {
                    bindEvent(k,n);
                    $(`#plug625-alert${n}-set`).hover(
                        function () {
                            $(this).find('.plug625-alertNew-setDrop').show()
                        },
                        function () {
                            $(this).find('.plug625-alertNew-setDrop').hide()
                        }
                    );
                    $(`#plug625-alert${n}-setClick`).click(function () {
                        chrome.storage.local.set({tipsTime:nowTime + 259200000});
                        $(`#plug625-alert${n}-close`).click();
                    });
                },500 * n);
            });
        }        //信息流广告形式
    }();
},100);