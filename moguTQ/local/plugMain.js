﻿//上面两个广告位模块1
// 中间优惠券模块2 > 判断是否有优惠券
// 下面轮播活动模块3
// 右下角弹窗模块4
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
    var cssStyle = '#plugMid627,.plugMid627-tool{position:relative;background:#fff}.plugMid627-ADItem2,.plugMid627-tool>div{border:1px solid #ECECEC;box-sizing:border-box}#plugMid627{font-size:14px;font-family:"Microsoft YaHei",sans-serif;margin:5px 0;z-index:9;max-width:429px}#plugMid627.plugTM{margin-right:20px}.plugMid627-tool{display:flex;z-index:10}.plugMid627-tool>div{height:30px;display:flex;align-items:center;justify-content:center;border-left:none}.plugMid627-drop{position:absolute;top:29px;display:none;padding-top:1px}.plugMid627-QQ,.plugMid627-set{width:40px}.plugMid627-flex{display:flex;align-items:center}.plugMid627-logo{width:30px;cursor:default;border-color:#F40137!important;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAolBMVEX0ATf////1KVf6ma/2N2L8wM34cpD94uj0D0L+9/j1JlT1Hk7++/v+6e395uv94Ob8usn1G0v+8/X94ef90Nr7pbj6j6f6iqP4aor+8fT92eH8zdj6nLH3WHz3THL2QWr0Fkj0BTr+7vH91t78yNT8w9D7ssL7rb77qrz5hJ75epf4cI/4ZIb4X4H3VHn2PGb92+L7tcT7tMT6oLT5d5T2RGyzIRGEAAABGklEQVQ4y+3R2XKCQBAF0L6IOiCrssgmwX036///WmBIIsJg8N3zcqGqa2bqNj09inkS3eMbNnFT+Dxtg2dDjB1xLo48d+iRiAw94x8G+NWZDpmEIiRFXGBSIUFETaozHI4xHubmUIoofx21NpiiRUo1tvQjhiVd2dRmpECmLrZY0z3nXukDsHpV9eMNtHDrbQ8KvobVgPM0IM7zMCIBycSCUeliQpmS2GyOxbUO5gLvL6LdvAF9RhVJAH3WPE6DZvWrLE9eAY3r99iqJm4F6l7zqC5/DpMNnORfqQWXGAl9Qa+WgJDE2CsO1bVj0jIXYZl1GBw5cBj9P3gMEN72e8KSmjbAhv2VP1FyvMSGdXiubElHzvykp46+AbUPD9nBTSJTAAAAAElFTkSuQmCC);background-size:cover}.plugMid627-AD{flex:auto;cursor:pointer}.plugMid627-ADTitle{color:#333;margin-left:10px;height:20px;overflow:hidden}.plugMid627-ADIcon{font-size:12px;color:#FF3A27;border:1px solid #FF3A27;border-radius:3px;padding:0 2px}.plugMid627-AD:hover .plugMid627-ADTitle{color:#F40137}.plugMid627-AD .plugMid627-drop{left:0;width:500px}.plugMid627-ADImg{background:#fff}.plugMid627-ADImg img{width:100%;vertical-align:middle}.plugMid627-ADItem2{display:flex;width:100%;padding:10px 20px;border-top:none;border-bottom:2px solid #FD2550}.plugMid627-ADItem2-img{width:60px;height:60px;margin-right:10px}.plugMid627-ADItem2-box{flex:1;position:relative}.plugMid627-ADItem2-icon{position:absolute;width:14px;height:14px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABEVBMVEX/RQD/VQD/VAD/RQD/RQD/VQD/VQD////+RgD/RQD/QwD/SgD8////UwD/TQD/PQD/MwD/LAD/UQD/LgD90sH+49X92sn9y7P8n3z8eUb/QQH/PwD/OgD/OAD9/Pr9+fb+9vH+7ev+6N780bz9z7b9zLb8xrL+wqv+w6b7r5b8rYv+qYT9nXX9mXL+knH9lmn8j179iVb+hFL+gEv8fkX8ZTn9bin9ZCn+UBL+PgX/TQL+RwD/DAD+/fj+8uj91cT+0cT8yav8vaX9uJr+spH8ooz9m4f9lHn8onD7m2v7kGr8iWj9cFL+d079cjT8WDH9aC/9WS37ayr9WSH/Zx78Yxr+Wg3/Vwz7OgD8LAD/AQBbThY0AAAABnRSTlPn5ublSkmb2EzAAAAA3klEQVQY003BBW4DMRAAwA3dXmzHcIxhZuYyM+P/H1KpUqTMQCah7UlkIKlxovHQ0HL/kmBw/hF8zokpRSypZgCPXOYP2fDqpF4dEJIDI+6UbsrIKv2HHrNCCvxr+l0tuPgav6+aOI9ALFjTH9VqRbt1d44TCTSY5cdTp4v2/dMZjk1YG79tZ3ZhoV33OjhSsFbL/PVxn+DAO+3ixITo5bDwc4BHWHLLFj6aoNqst31uOJfebYsVVwKyxF8Sqcztwqo03iQFSpSgG51QEehK0g2k9J1QEF0HSEN2Tyr9BwwsHAF+24CqAAAAAElFTkSuQmCC);background-size:cover;top:3px}.plugMid627-ADItem2-title{font-size:13px;color:#4A90E2;line-height:20px;height:40px;display:-webkit-box;overflow:hidden;text-indent:18px;-webkit-line-clamp:2;-webkit-box-orient:vertical}.plugMid627-ADItem2-price{position:absolute;font-size:20px;color:#FD2550;line-height:20px;right:0;bottom:0}.plugMid627-QQ{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAg1JREFUOBGVlM1LG0EYxrO7SbNNIM1FEMWrtx6U9tI2wZAvzFFI69GLh4oHD22hUCj9+AtKUdCrCJpWFD+CIRdvgoJ3UbwqUhMJaUtKkv7e4CzJuiHrwPDOvM/zPvvM7MxoHoeWzWYflsvl1WazOQb84JbyT9O0ffqrQqFQtZfp9kQsFpsolUqXIhAIBEaLxaIpnfEIOb3RaFwkk8msvU5rT2Qymce1Wu3A5/NN5vP5rXZMjVOp1DhiP5i/4APHKt/hCJE9lvO+m4gUsaw84Q1d4t2G3al4PH56F3HOwD9Jp9PTCm13NEnypwJ6RZyv0V8qniVEcoC9sdasCN2iYRjH7NWAwi0hEkOVSmVHAb1iKBTahTPYwYtEIn2JROKqI+liQs1FNBodEmrLkd/vlz9QcFFrp+yZprkhSQ1V2bBvnIl+O8vNXFx5vd45cfSFjXvnpsiJw5V5W6/XP3s4D7+cCPfJoXEtjrz3KerCNUTEQHGTOIzNJ04326mYOxfk7B2BnYuG3OZlBiJ4Qm/9AWLPhsg6pDO6gYEVq4AvLPIHBHDV5F6ykiVFbp0jBD7iLM2b80wBvWIwGHyOK7SSn4Tb2mis/WVsVqvVYaI8ah5eyUe8kt8ZZijQ4WyHw+HZXC53I7hwyZlgf2RuPWy4+grwGiBwm68zP8TpjBB1XZ8HeypDmYP9Zr7AQf4g8/+C/7zh5Cz/zQAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-QQ a{display:block;width:100%;height:100%}.plugMid627-QQ:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAAclBMVEUAAAD0ATf1ATf1ATb1ATj1ATf/FDz0ATf2ATb1ATf2ATf1ATf1Ajj3Azj6BTn1Ajb2Azn0Azj/Czn1ATj1ATj1ATf2ATb1ATf0Ajf1Ajf3Ajb4Azr3BDv/B0D/HFX1ATf2Ajj1Ajf2Ajj1Ajf1Ajr/CT4MyKkgAAAAJnRSTlMA7uj4uLMM8fXz3NiaVCyEYVoW4dLNwLujd2tLPSQJ6qWhiYF/HYoZQm0AAACiSURBVBjTXY9ZEoMgEESHTUARFfc1+/2vGCQxTHwf3VWPYgYgsAnJmBYJ/MglXwFWrvPDWDVDYFb2q+h0HE7002UaR2RlKH6PquhDNRVa1IQiaPcm93QXQNCXj/aK1a31tyn8QauwFlOlQOAEAXlWErTI0COSjGswQvRRccGNL4P+mJo9n7WLytUPnyNd/IyBkMHPXOgYfk8YU521nWKMFABvCTIF2an2KvsAAAAASUVORK5CYII=) center no-repeat}.plugMid627-set{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAAhFBMVEUAAABcXFxFRUVISEhERERFRUVERERERERERERERERERERFRUVFRUVERERERERGRkZGRkZKSkpOTk5FRUVFRUVERERFRUVHR0dMTExFRUVFRUVFRUVFRUVFRUVHR0dGRkZJSUlERERERERHR0dFRUVISEhFRUVERERERERERERHR0dEREQ3G3oLAAAAK3RSTlMAB3Ie8I345630plxIm4c3NBgL18vAYCQS+7qTgnwuKw7RuE9OJ97dtGVEEnIQpAAAANhJREFUGNN1kdeywyAMRBcMBlzjJI5berkl+///F8OEiV9yXtDsSGglIZBkbhJAbsYVPlSps7xIy9YwW0e1YNmguNBIrPeUUa55909I67iLcsIckRWLGEqeEBFpicDpkFpfov/0A8Ce2rvRZHYGauW2Ki0AoQdegd+xwcxm06DfGgGgLyngqtA1GLjziJmcCdKFfPvIP9flJz48TxRYtnRPQFQDRwDHt8HK6i4YnGrxdZzvw9e8+bzO1z64Wyy2h1RU82IPlIjoQbW0eRbPEOms8Un/qn0f7QVYDhEZoiy6NwAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-set:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAMAAAC+oj0CAAAARVBMVEUAAAD1ATf1ATf4BTn2ATf1ATf2Ajj4BTn2Ajj2Ajj1ATf2Ajf1ATf2Ajj1ATf2Ajf1ATf1ATf1Ajj1Ajj2ATf2ATj1ATf16wIiAAAAF3RSTlMAxtsbiuImElZOlkeyCdBquqp9X3I764IS+eEAAAC/SURBVBjTdZFZssQgCEVldEKj6eTtf6mPdLU9fMQf4RTFhUu4Xjsnsoa4dastrBcZ+8DBhgBSaOGHl8ZkfWykjNvCSZI3IiVvkOWxcJUc3jGmFTKeb3z28vwpsTB5WbFSXX6XkjxlAFaXBZgA3kB3By2gpejJsKp5GHl9nhjD3+405H7NdfRLu21CdxgtO6dh+bvJnSSl8hpwfga8Wed2+WVVVNVl1cdYOkDg19hYBADnMX/PEFo1PGKgXcbraP8E0wjYgd4G6AAAAABJRU5ErkJggg==) center no-repeat}.plugMid627-set .plugMid627-drop{width:81px;right:0}.plugMid627-set ul{border:1px solid #ECECEC;border-top:none;background:#fff}.plugMid627-set li{height:40px;line-height:40px;text-align:center}.plugMid627-set li:hover{color:#F40137}.plugMid627-noCoupon img{width:100%;vertical-align:middle}.plugMid627-coupon{background:#fff}.plugMid627-hasCoupon{display:none;border-left:1px solid #ececec;border-right:1px solid #ececec;border-bottom:1px dashed #ececec;padding-left:20px;height:79px}.plugMid627-couBox{position:relative;display:flex;align-items:center;width:100%;height:100%}.plugMid627-couPrice{color:#444;font-size:14px;width:100px;overflow:hidden;white-space:nowrap}.plugMid627-couPrice span{font-weight:700;font-size:16px;color:#F40137}.plugMid627-couTime{font-size:12px;color:#999;width:100px;overflow:hidden}.plugMid627-couBack{width:155px;height:44px;cursor:pointer;color:#fff;margin-left:15px;background:url(data:image/png;base64,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)}@media (max-width:1179px){#plugMid627.plugTB .plugMid627-couBack{margin-left:-5px}#plugMid627.plugTB .plugMid627-hasCoupon{padding-left:10px}#plugMid627.plugTB .plugMid627-ADTitle{width:62px;overflow:hidden}}.plugMid627-couAmount,.plugMid627-couNeed{width:97px;text-align:center;line-height:16px;height:16px}.plugMid627-couAmount{margin-top:7px;font-size:16px;font-weight:700}.plugMid627-couNeed{font-size:12px;transform:scale(.84);margin-top:3px;overflow:hidden;opacity:.6}.plugMid627-couEmpty{width:60px}.plugMid627-couQr{position:absolute;width:48px;right:12px;top:11px;cursor:pointer}.plugMid627-couQr-icon{width:30px;height:30px;margin:4px auto 6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAYFBMVEUAAABFRUVGRkZFRUVFRUVFRUVFRUVERERGRkZFRUVHR0dFRUVRUVFJSUlFRUVJSUlFRUVFRUVbW1tFRUVISEhERERERET///9ERERFRUVFRUVERERFRUVKSkpVVVVEREQGu0XdAAAAH3RSTlMAXUmnZOL5e0KuK8UTDZgVkVUIkyDZwAHQf3jrthgDjfjCdgAAALZJREFUKM+l0dkOwiAQheHTTZQWKktXF97/LW0E4sRIiul/RfhuYAaOVgC1I532ual8Y+QxXDRvruArI5/hu2RyIaWmLKRUhKVzgnLv3DWftRCgPAmhM582lr4l8hou2o2PDbWgWcAWNByroSlAheMCyGZIPI1M7db6hshz23pOTa3/i5Ux+otnY4b0Qn15LLpuojx1ocS+Yxvfua/+8JPzB2A5hyP9+NgOMxoHOGMWmrESUGx9AbSUL+2LYKH8AAAAAElFTkSuQmCC)}.plugMid627-couQr-title{font-size:12px;height:18px;line-height:18px}.plugMid627-couQr-box{display:none;position:absolute;z-index:100000;top:-12px;right:-170px;text-align:center;width:158px;height:202px;overflow:hidden}.plugMid627-couQr-drop{background:#fff;width:156px;height:200px;border:1px solid #ececec;transform:translate3d(-100%,0,0);transition:transform .5s}.plugMid627-couQr-drop.show{transform:translate3d(0,0,0)}#plugMid627-couQr{margin:18px auto 10px;width:120px}.plugMid627-noCoupon{display:none;cursor:pointer}.plugMid627-rollAd{height:30px;border:1px solid #ECECEC;border-top:none;overflow:hidden;position:relative;background:#fff;z-index:8}.plugMid627-rollAd ul{position:relative;height:100%;padding-left:20px}.plugMid627-rollAd li{height:30px;color:#444;display:flex;align-items:center}.plugMid627-rollAd span{line-height:30px;cursor:pointer}.plugMid627-rollAd span:hover{color:#F40137}#plugFix627{display:none;position:fixed;width:100%;height:100%;left:0;top:0;z-index:2147483647}.plugFix627-shadow{position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.75)}.plugFix627-box{text-align:center;border-radius:20px;width:500px;height:500px;box-sizing:border-box;position:absolute;left:50%;top:50%;margin:-250px 0 0 -250px}.plugFix627-close{position:absolute;right:50%;bottom:0;margin-right:-15px;width:30px;height:30px;cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMAu/oRSx0M8XRZJ+2lBz3Dwm713aqek4h5ajLgxdG2gGKXqD5kAAABfUlEQVRIx52W6XaFIAyEw+JVBLu4Vr3bvP9LttLWIyVaD/NPD58yJCShWMr0orFS2kb0RtG/ykYhsZEUY3YMdH5VoUtVVarUhee7fUgNNWRrVLjLVqIeFE9oC7iM+bUDrOaID0BMxGoSwEf0tnJAQbsqAFf9Ia7INR1I57iGjMNc0qHKGS70kQcEy+RbPxrY3RW/StnYOX8G9jc+AwSdksDwE6oa0zlkQv0d6g6OTsqh8z+BzM4imcSydkRLp9Vi9J5M6PF+oVUv85O2MhBESsows+94u6xEHn7Pr/ZcoMvrF7MS79E5G+pREMfwBBXoSUATx/AEaQhqUBLLsASVaMhCEcfcWIIULElUxDC3nUtaQbKI97H44RELxRLF4ofdGGvfO/dnwNoX0CxBPKMhllCyxMrEoTQQPMEzAiZOy9kTK/OI0jJO/uf28fIoo+RPuGIJFzmhXCQUpYTSl1BgE8p4QrNIaEkJjS+hvaY18fRR4XggSRx70oerhBHuE36YJtNdpHYUAAAAAElFTkSuQmCC);background-size:cover}';
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
                <div class="plugMid627-drop">
                    <div class="plugMid627-ADImg"></div>
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
                pic:'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMEI5RUY2MjczOTQxMUU4OTg0MENENkM3RDFBOEUzMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMEI5RUY2MzczOTQxMUU4OTg0MENENkM3RDFBOEUzMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlCQkNEQ0ZGNzM5NDExRTg5ODQwQ0Q2QzdEMUE4RTMwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlCQkNERDAwNzM5NDExRTg5ODQwQ0Q2QzdEMUE4RTMwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAwICAgICAwICAwUDAwMFBQQD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',
                title:'9块9包邮',
                icon:'低价',
                url:'https://s.click.taobao.com/5QPGEPw',
                type:1,
                index:2,
                cnzzName:'广告2'
            }
        };
        $.each(adData,function (v,k) {
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
                openWindow(k.url);
            });
        });
    }();                                       //上面两个广告位模块1
    !function () {
        var tbCookie = '';                   //淘宝cookie
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
                                    getDan(pid,page,num,callBack);
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
                                <div class="plugMid627-couPrice">券后价 <span>¥${sub(list.discountPrice,list.couponAmount / 100)}</span></div>
                                <div class="plugMid627-couTime" data-endtime="1535673600">有效期</div>
                            </div>
                            <div class="plugMid627-couBack" data-mgClick="领取优惠券">
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
                    $(".plugMid627-noCoupon").html(`<img src="${adPic}" data-mgClick="${clickE}">`);
                    $(".plugMid627-noCoupon").show();
                    $(".plugMid627-noCoupon").click(function () {
                        openWindow(toUrl);
                    })
                }
            }       //生成优惠券判断是否有优惠券
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
    }();                                       //中间优惠券模块2
    !function () {
        var data = [
            {name:'618活动',title:'酷girl的夏日潮搭牛仔',pic:'http://file.douyapu.com/douyapu/dai360/2018618.png',clickE:"酷girl",type:0,url:"https://s.click.taobao.com/J1aQGPw"}
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
                    "img_src":"data:image/png;base64,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",
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
    }();                                       //右下角弹窗模块4
}