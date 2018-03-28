//获取网页地址,给nav相应加class
$(".nav-box>li").each(function () {
    if (location.pathname + location.search == $(this).children().attr("href")) {
        $(this).addClass('active');
        document.title = document.title + " - " + $(this).children("a").text() + " - 优惠券工具 - 让用户平等享受购物";
    } else if (getUrlParam("cid") && $(this).children().attr("href") == "/coupon/lists/?cid=1&sort=1") {
        $(this).addClass('active');
        document.title = document.title + " - " + $(this).children("a").text() + " - 优惠券工具 - 让用户平等享受购物";
    }
});

//获取url指定参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

// 收藏店铺
$('#collectWeb').click(function () {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title);
    }
    else if (document.all) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }

    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
});


function getCookie(n) {
    var a, r = new RegExp("(^| )" + n + "=([^;]*)(;|$)");
    if (a = document.cookie.match(r)) {
        return unescape(a[2])
    } else {
        return null
    }
}

$(function () {
    var cookiesreg = new RegExp("(^| )loginScreenName=([^;]*)(;|$)");
    if (document.cookie.match(cookiesreg)) {
        $(".login-mark").html("退出");
        var userName = getCookie("username");
        var userPic = getCookie("img_url");
        $(".login-icon").show();
        $(".login-usename").html(userName).attr("title", userName);
        $(".login-icon").css({
            "backgroundImage": "url(" + userPic + ")",
            "backgroundPosition": '0 0',
            "backgroundSize": "cover",
            "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + userPic + ",sizingMethod=scale)",
            "borderRadius": "50%"
        });
        $(".loginList").hide();
    } else {
        $(".login-icon").hide();
        $(".login-mark").html("请登录").attr("title", "请登录");
        $(".login-mark").on("click", function (e) {
            e.preventDefault();
        });
        var sett;
        $('#login').on({
            mouseenter: function () {
                clearTimeout(sett);
                sett = setTimeout(function () {
                    $(".login-ways").show();
                }, 300)
            },
            mouseleave: function () {
                clearTimeout(sett);
                sett = setTimeout(function () {
                    $(".login-ways").hide();
                }, 300);
            }
        });
    }
    $(".login").click(function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
    })
});

(function () {
    //搜索保存历史记录
    var hisTime;
    var hisItem;
    var firstKey;
    $("#search-history").on("mousedown", "li", function () {
        $("#searchText").val($(this).text());
        $("#searchBtn").click();
    });

    function init() {
        hisTime = [];
        hisItem = [];
        var i = 0;
        for (; i < localStorage.length; i++) {
            if (!isNaN(localStorage.key(i))) {
                hisTime.push(localStorage.key(i));
            }
        }
        if (hisTime.length > 0) {
            hisTime.reverse();
            for (var y = hisTime.length - 1; y >= 0; y--) {
                localStorage.getItem(hisTime[y]) && hisItem.push(localStorage.getItem(hisTime[y]));
            }
        }
        i = 0;
        $("#search-history ul").html("");
        for (; i < hisItem.length; i++) {
            $("#search-history ul").prepend("<li>" + hisItem[i] + "</li>");
        }
    }

    init();
    $("#his-dele").mousedown(function () {
        var f = 0;
        for (; f < hisTime.length; f++) {
            localStorage.removeItem(hisTime[f]);
        }
        init();
    });

    function trim(str) {
        return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
    }

    //写历史记录缓存方法
    function setHistoryLocal() {
        $("#search-history").hide();
        var value = trim($("#searchText").val());
        var time = (new Date()).getTime();
        if ($.inArray(value, hisItem) >= 0) {
            for (var j = 0; j < localStorage.length; j++) {
                if (value == localStorage.getItem(localStorage.key(j))) {
                    localStorage.removeItem(localStorage.key(j));
                }
            }
            localStorage.setItem(time, value);
        } else {
            if (hisItem.length > 4) {
                firstKey = hisTime[4];
                localStorage.removeItem(firstKey);
                localStorage.setItem(time, value);
            } else {
                localStorage.setItem(time, value);
            }
        }
        init();
    }

    //搜索按钮触发事件
    $("#searchBtn").click(function () {
        setHistoryLocal();
        var value = encodeURIComponent($("#searchText").val());
        window.location.href = "/coupon/search?val=" + value;
    });

    //输入框键入事件
    $('#searchText').on({
        mousedown: function () {
            if (hisTime.length > 0) {
                $("#search-history").show();
            }
        },
        blur: function () {
            $("#search-history").hide();
        },
        focus: function () {
        },
        keyup: function (event) {
            var val = $(this).val();
            if (event.keyCode == 13) {
                setHistoryLocal();
                val = encodeURIComponent($("#searchText").val());
                window.location.href = "/coupon/search?val=" + val;
            }
        }
    });
})();

!function () {
    // 返回顶部
    $(".fixedtool .icon4").click(function (e) {
        e.preventDefault();
        $("html,body").animate({
            'scrollTop': '0px'
        }, 300)
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 350) {
            $(".fixedtool .icon4").show();
        } else {
            $(".fixedtool .icon4").hide();
        }
    })
}();

// 导航栏目第一个下载助手的鼠标移入移出事件
!function () {
    var dropdownTime;
    $(".nav-first").hover(function () {
        dropdownTime = setTimeout(function () {
            $(".nav-dropdown").stop(true, true).fadeIn("slow");
        }, 200);
    }, function () {
        clearTimeout(dropdownTime);
        $(".nav-dropdown").stop(true, true).fadeOut("slow");
    })
}();
// !function () {
//     var nav = $("#nav_wrap"); //得到导航对象
//     var scrollHeight = $("#nav_wrap").offset().top;
//     var sc = $(document); //得到document文档对象。
//     sc.scroll(function () {
//         if (sc.scrollTop() >= scrollHeight) {
//             nav.addClass("fixednav");
//         } else {
//             nav.removeClass("fixednav");
//         }
//     })
// }();

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}

//字符串转义
function htmldecode(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    return div.innerText || div.textContent;
}