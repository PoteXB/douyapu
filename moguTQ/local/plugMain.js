//上面两个广告位模块1
// 中间优惠券模块2 > 判断是否有优惠券
// 下面轮播活动模块3
// 右下角弹窗模块4
setTimeout(function () {
    if ($("body").attr("mainSign2018625") == 1) {
        return;
    }
    $("body").attr("mainSign2018625","1");
    function cnzzAppend(callBack) {
        if (!$('html').html().match(`1274446353`)) {
            var myScript = document.createElement("script");
            myScript.appendChild(document.createTextNode(`var moguBack_czc = _czc?_czc:[];var _czc = [];_czc.push(["_setAccount","1274446353"]);`));
            document.head.appendChild(myScript);
            $.getScript("https://s22.cnzz.com/z_stat.php?id=1274446353&web_id=1274446353",function () {
                var myScript = document.createElement("script");
                myScript.appendChild(document.createTextNode(`var mogu_czc = _czc;_czc = moguBack_czc;`));
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
    if ($("body").attr("dypSign159357") != 1) {
        var hitTb = 0;
        var matchTbUrl = [
            'detail.tmall.com',
            'item.taobao.com'
        ];
        $.each(matchTbUrl,function (k,v) {
            if (v == locHost) {
                hitTb = 1;
                return false
            }
        });
        if (hitTb) {
            chrome.storage.local.get(null,function (e) {
                adJson = e.JsonJs816;
                start();
            });
        }
    }
    //计算指定cookie剩余时间
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
    }

    //淘宝客业务页面
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
            var noCouAD = {};
            if (adJson) {
                noCouAD = adJson.noCouAD
            }
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
                            <div class="plugMid627-couBack" data-moguDJ="领取优惠券">
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
                        $(".plugMid627-noCoupon").html(`<img src="${noCouAD.adPic}" data-moguDJ="${noCouAD.clickE}">`);
                        $(".plugMid627-noCoupon").show();
                        $(".plugMid627-noCoupon").click(function () {
                            openWindow(noCouAD.toUrl);
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
    }

    //全网其他业务页面
    !function () {
        var total;
        var sj_title = $("head>title").length ? $("head>title").html().replace(/-淘宝网|-tmall.com天猫$/,"") : "";
        chrome.storage.local.get(null,function (e) {
            if (!e.JsonJs816) {
                return
            }
            var n = 0;
            var dypAlert = e.JsonJs816.alertAD;      //右下角弹窗模块4
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
                cnzzAppend();
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
                            $(`#plug625-alert${n} a`).attr("data-moguDJ",k.name);
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
    //淘宝首页用户信息上报
    !function () {
        if (locHost != "www.taobao.com") {
            return
        }
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
    }();
    //电商平台统计
    !function () {
        var cnzzArr = ['.taobao.com','.taobao.hk','.tmall.com','.tmall.hk','.jd.com','.jd.hk','.suning.com','.vip.com','.mogujie.com','.dangdang.com'];
        var cnzzArrOK = 0;
        $.each(cnzzArr,function (v,k) {
            if (locHost.indexOf(k) != -1) {
                cnzzArrOK = 1;
                return false;
            }
        });
        if (cnzzArrOK == 1) {
            cnzzAppend();
        }
    }();
    //京东插入广告
    !function () {
        var jdArr = ['item.jd.com','search.jd.com'];
        var jdArrOK = 0;
        $.each(jdArr,function (v,k) {
            if (locHost == k) {
                jdArrOK = 1;
                return false;
            }
        });
        if (jdArrOK) {
            function checkExposure() {
                $.each($('.adNeedCheck'),function () {
                    isVisible(this) && ($(this).removeClass('adNeedCheck'), cnzzEvent($(this).data("name"),'曝光'))
                })
            }//检查需要检查曝光的带class
            function isVisible(b) {
                var c = $(b)[0].offsetTop,a = $(window);
                return !(a.scrollTop() > c + $(b).outerHeight() || a.scrollTop() + a.height() < c)
            }//检查是否在可视范围中
            $(window).on('scroll',function () {
                checkExposure();
            });
            function openWindow(full_link) {
                window.open('javascript:window.name;','<script>location.replace("' + full_link + '")<\/script>');
            }                        //不带refer跳转
            chrome.storage.local.get(null,function (e) {
                if (!e.JsonJs816) {
                    return
                }
                var data = e.JsonJs816.jdInsAD;
                $("<style></style>").html(`.moguInsertAD {cursor:pointer}`).appendTo("head");
                if ($("#track .track-con ul").length) {
                    !function () {
                        var val = data.jdRight;
                        var html = `<li style="float: left;" class="moguInsertAD adNeedCheck" data-url="${val.url}" data-name="${val.name}">
                            <a> 
                                <img height="150px" width="150px" src="${val.img}">
                                <p class="J-p-23170432951"></p>
                            </a>
                        </li>`;
                        $("#track .track-con ul").prepend(html);
                    }();
                }
                if ($(".ab-goods.u-ad-wrap .mc").length) {
                    !function () {
                        var val = data.jdLeft;
                        var html2 = `<div class="moguInsertAD adNeedCheck" style="margin-bottom:20px;text-align:center" data-url="${val.url}" data-name="${val.name}">
                            <img width="160px" height="214px" src="${val.img}" class="err-product">
                        </div>`;
                        $(".ab-goods.u-ad-wrap .mc").before(html2);
                    }();
                }
                if ($("#J_bottom-ad").length) {
                    !function () {
                        var val = data.jdBottom;
                        $("#J_bottom-ad").prepend(`<div style="margin-bottom:10px;cursor:pointer;" class="moguInsertAD adNeedCheck" data-url="${val.url}" data-name="${val.name}">
                            <img style="width: 100%;" src="${val.img}">
                        </div>`);
                    }();
                }
                checkExposure();
                $(".moguInsertAD").on('click',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    cnzzEvent($(this).data("name"),'点击');
                    openWindow($(this).data("url"));
                })
            });
        }
    }()
},1000);