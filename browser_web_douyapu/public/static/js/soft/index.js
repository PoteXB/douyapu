//刷新和滚动请求初始值
var freshCouponNum = 0;
var scrollCouponNum = 0;
var searchCouponNum = 0;
var catCouponNum = 0;
var collectNum = 0;
//数据请求接口

var firstCouponUrl = "//client.douyapu.com/soft/couponlists";
var hotCouponUrl = "//client.douyapu.com/soft/hots";
var catIdCouponUrl = "//client.douyapu.com/soft/couponlists";
var searchCouponUrl = "//client.douyapu.com/soft/couponlists";
var collectCouponUrl = "//client.douyapu.com/soft/collist";
var catIdTitleUrl = "//client.douyapu.com/soft/category";
//商品详情跳转前缀
var host = "//www.douyapu.com/coupon/detail?id=";

//var firstCouponUrl = "http://192.168.3.131/soft/couponlists";
//var hotCouponUrl = "http://192.168.3.131/soft/hots";
//var catIdCouponUrl = "http://192.168.3.131/soft/couponlists";
//var searchCouponUrl = "http://192.168.3.131/soft/couponlists";
//var collectCouponUrl = "http://192.168.3.131/soft/collist";
//var catIdTitleUrl = "http://192.168.3.131/soft/category";
//var host = "http://192.168.3.131/coupon/detail?id=";

//图片后缀
var picUrlBack = "_100x100.jpg";
//每一行商品的高度
var rowHeight = 131;
//刷新请求数量
var freshPerPage = 20;
//滚动请求数量
var scrollPerPage = 10;
//刷新点击事件
$("#fresh-butt").click(function() {
	loadhtml(firstCouponUrl, 2);
});

//html代码加载方法,1默认商品  7默认翻页  2刷新  3搜索  4搜索翻页  5分类  6分类翻页 8收藏加载 9收藏滚动
function loadhtml(apiUrl, type) {
	//	if(type == 1) {
	//		console.log("默认加载");
	//	} else if(type == 2) {
	//		console.log("刷新");
	//	} else if(type == 3) {
	//		console.log("搜索加载");
	//	} else if(type == 4) {
	//		console.log("搜索翻页");
	//	} else if(type == 5) {
	//		console.log("分类加载");
	//	} else if(type == 6) {
	//		console.log("分类翻页");
	//	} else if(type == 7) {
	//		console.log("默认翻页");
	//	} else if(type == 8) {
	//		console.log("加载收藏");
	//	} else if(type == 9) {
	//		console.log("加载滚动");
	//	}
	var requestType = "post";
	var addCouponHtml = "";
	var requestData = {};
	var sortType = $(".dropdown-menu li.active").data("type");
	var clickValue = $("#search-val").val();
	var catId = $("#catIdList li.active").data("id") ? $("#catIdList li.active").data("id") : "";
	if(type == 1 || type == 7) {
		requestData = { "pageSize": scrollPerPage, "ownNo": scrollCouponNum, "sort": sortType, "searchVal": "", "catId": catId };
	} else if(type == 2) {
		requestData = { "pageSize": freshPerPage, "ownNo": freshCouponNum, "time": parseInt(getCookie("douyapuTime") / 1000) };
	} else if(type == 5 || type == 6) {
		requestData = { "pageSize": scrollPerPage, "ownNo": catCouponNum, "sort": sortType, "searchVal": clickValue, "catId": catId };
	} else if(type == 8 || type == 9) {
		requestData = { "pageSize": scrollPerPage, "ownNo": collectNum, "userId": getCookie("TTTTT") };
	} else {
		requestData = { "pageSize": scrollPerPage, "ownNo": searchCouponNum, "sort": sortType, "searchVal": clickValue, "catId": catId };
	}
	$.ajax({
		type: requestType,
		url: apiUrl,
		data: requestData,
		dataType: "json",
		success: function(data) {
			data = (typeof(data) == "string") ? JSON.parse(data) : data;
			$("#loading-msg").hide();
			if(data && data.results && data.results.length > 0) {
				for(var i = 0; i < data.results.length; i++) {
					var listObj = JSON.parse(data.results[i]);
					addCouponHtml +=
						'<div class="row">' +
						'<div class="col-xs-4">' +
						'<a href=' + host + listObj.itemId + ' target="_blank"><img src=' + listObj.picUrl + picUrlBack + ' alt="缩略图"></a>' +
						'</div>' +
						'<div class="col-xs-8 margin-left-3">' +
						'<div class="container-fluid">' +
						'<div class="row">' +
						'<a href=' + host + listObj.itemId + ' class="my-title" target="_blank"><p class="row_hidden mid-font" ' + 'title="' + listObj.title + ' ">' + listObj.title + '</p></a>' +
						'</div>' +
						'<div class="row">' +
						'<div class="col-xs-6 small-font color-bfbfbf"><span>天猫价 : ' + listObj.discountPrice + '</span></div>' +
						'<div class="col-xs-6 small-font"><span class="time-right"><b class="time-icon"></b> ' + listObj.effectiveEndTime + '</span></div>' +
						'</div>' +
						'<div class="row button-price-group">' +
						'<div class="col-xs-8 button-price-group-left">' +
						'<span class="color-fe4242"><b></b>券后价: <span class="big-font arial-font">' + (listObj.discountPrice * 1 - listObj.amount * 1).toFixed(2) + '</span></span>' +
						'</div>' +
						'<div class="col-xs-4 button-price-group-right">' +
						'<a href="' + listObj.shareUrl + '" target="_blank"><button class="small-font">立减 ' + listObj.amount + ' 元</button></a>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>';
				}
				if(type == 1) {
					//默认加载
					bindScrollEvent(4);
					bindSortEvent(1);
					if(apiUrl == hotCouponUrl) {
						bindScrollEvent(3);
						bindSortEvent(4);
					}
					scrollCouponNum += data.results.length;
					$("#coupon-main>.container-fluid").html(addCouponHtml);
				} else if(type == 7) {
					//默认翻页
					scrollCouponNum += data.results.length;
					$("#coupon-main>.container-fluid").append(addCouponHtml);
				} else if(type == 2) {
					//刷新
					freshCouponNum += data.results.length;
					$("#coupon-main>.container-fluid").prepend(addCouponHtml);
					$("#find-coupon-num").stop(true, true);
					$("#find-coupon-num").html("已为您更新&nbsp;<span class='color-fe4242'>\"" + data.count + "\"</span>&nbsp;张券券啦~").fadeIn();
					setTimeout(function() {
						$("#find-coupon-num").fadeOut();
					}, 1000);
					$("body").animate({ "scrollTop": 0 }, 0);
				} else if(type == 3) {
					//搜索加载
					bindScrollEvent(1);
					bindSortEvent(2);
					searchCouponNum += data.results.length;
					$("#search-sign").html(`<div class="col-xs-12">
					共找到<span class="color-fe4242"> " ${data.count} " </span>笔与<span class="color-fe4242"> " ${clickValue} " </span>的有关产品
				</div>`);
					$("#coupon-main>.container-fluid").html(addCouponHtml);
				} else if(type == 4) {
					//搜索翻页
					searchCouponNum += data.results.length;
					$("#coupon-main>.container-fluid").append(addCouponHtml);
				} else if(type == 5) {
					//分类加载
					bindScrollEvent(2);
					bindSortEvent(3);
					catCouponNum += data.results.length;
					if(clickValue) {
						$("#search-sign").html(`<div class="col-xs-12">
					共找到<span class="color-fe4242"> " ${data.count} " </span>笔与<span class="color-fe4242"> " ${clickValue} " </span>的有关产品
				</div>`);
					}
					$("#coupon-main>.container-fluid").html(addCouponHtml);
				} else if(type == 6) {
					//分类翻页
					catCouponNum += data.results.length;
					$("#coupon-main>.container-fluid").append(addCouponHtml);
				} else if(type == 8) {
					//收藏加载
					bindScrollEvent(5);
					collectNum += data.results.length;
					$("#coupon-main>.container-fluid").html(addCouponHtml);
				} else if(type == 9) {
					//收藏加载
					collectNum += data.results.length;
					$("#coupon-main>.container-fluid").append(addCouponHtml);
				}
			} else {
				if(type == 2) {
					$("#find-coupon-num").html("sorry , 没有更多券券了~");
					$("#find-coupon-num").stop(true, true);
					$("#find-coupon-num").fadeIn();
					setTimeout(function() {
						$("#find-coupon-num").fadeOut();
					}, 1000);
				} else if(type == 3) {
					getRelatedCoupons(clickValue);
				} else if(type == 8) {
					$("#coupon-main>div.container-fluid").empty();
					$("#fresh-butt").hide();
					var html = `
				<div class="col-xs-12"><img src="../../../public/static/img/soft/A.png" alt="" /></div>
				<div class="col-xs-12">暂还没有收藏任何优惠券!!</div>
			`;
					$("#no-search-sign").html(html);
				} else if(type == 1 || type == 4 || type == 6 || type == 7 || type == 9) {
					$(document).off("scroll");
				} else if(type == 5) {
					noCatCoupon(clickValue);
				}
				$("#loading-msg").hide();
			}
		},
		error: function() {
			$("#loading-msg").hide();
			$("#find-coupon-num").html("网络异常,请刷新试试...");
			$("#find-coupon-num").fadeIn();
			return false;
		}
	});
}

//搜索不到的时候请求相关优惠券方法
function getRelatedCoupons(val) {
	var nowCat = $("#catIdList").find("li.active").text();
	var html = `
				<div class="col-xs-12"><img src="../../../public/static/img/soft/A.png" alt="" /></div>
				<div class="col-xs-12">在<span class="color-fe4242"> “ ${nowCat} ” </span>类目下没有找到与 <span class="color-fe4242"> “ ${val} ” </span> 相关的优惠券</div>
				<div class="col-xs-12 related-title"><div>相关推荐</div></div>
			`;
	$("#no-search-sign").html(html);
	$("#coupon-main>div.container-fluid").empty();
	scrollCouponNum = 0;
	loadhtml(hotCouponUrl, 1);
}

//分类没有数据时候请求渲染方法
function noCatCoupon(val) {
	var nowCat = $("#catIdList").find("li.active").text();
    var html;
	if(val) {
		html = `
				<div class="col-xs-12"><img src="../../../public/static/img/soft/A.png" alt="" /></div>
				<div class="col-xs-12">在<span class="color-fe4242"> “ ${nowCat} ” </span>类目下没有找到与 <span class="color-fe4242"> “ ${val} ” </span> 相关的优惠券</div>
				<div class="col-xs-12 related-title"><div>相关推荐</div></div>
			`;
	} else {
		html = `
				<div class="col-xs-12"><img src="../../../public/static/img/soft/A.png" alt="" /></div>
				<div class="col-xs-12">暂时还没加入<span class="color-fe4242"> “ ${nowCat} ” </span>类目的优惠券</div>
				<div class="col-xs-12 related-title"><div>相关推荐</div></div>
			`;
	}
	$("#no-search-sign").html(html);
	$("#coupon-main>div.container-fluid").empty();
	scrollCouponNum = 0;
	loadhtml(hotCouponUrl, 1);
}

$("#back-butt").click(function() {
	history.go(0);
});

//点击返顶事件
$("#scroll-top").click(function() {
	$("body").animate({ "scrollTop": 0 }, 1000, "swing");
});

//窗口滚动绑定事件  1.搜索滚动  2.分类滚动  3.相关滚动  4.默认滚动 5收藏滚动
function bindScrollEvent(type) {
	$(document).off("scroll");
	$(document).on("scroll", function() {
		if($(document).scrollTop() == 0) {
			$("#scroll-top").hide();
		} else {
			$("#scroll-top").show();
		}
		var allHeight = rowHeight * ($(' #coupon-main>.container-fluid>div').length);
		if(($("body").scrollTop() + $(window).height()) - $("#coupon-main").offset().top == allHeight) {
			if(type == 1) {
				loadhtml(searchCouponUrl, 4);
			} else if(type == 2) {
				loadhtml(catIdCouponUrl, 6);
			} else if(type == 3) {
				loadhtml(hotCouponUrl, 7);
			} else if(type == 4) {
				loadhtml(firstCouponUrl, 7);
			} else if(type == 5) {
				loadhtml(collectCouponUrl, 9);
			}
		}
	});
}

//绑定点击排序方式选择加载不同内容方法 1.默认排序  2.搜索排序  3.分类排序 4.相关排序
function bindSortEvent(type) {
	$(".dropdown .dropdown-menu").off("click");
	$(".dropdown .dropdown-menu").on("click", "li", function() {
		$(".dropdown>button").html($(this).children().text());
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
		if(type == 1) {
			scrollCouponNum = 0;
			loadhtml(firstCouponUrl, 1);
		} else if(type == 2) {
			searchCouponNum = 0;
			loadhtml(searchCouponUrl, 3);
		} else if(type == 3) {
			catCouponNum = 0;
			loadhtml(catIdCouponUrl, 5);
		} else if(type == 4) {
			scrollCouponNum = 0;
			loadhtml(hotCouponUrl, 1);
		}
	})
}

//页面加载完执行加载默认优惠券列表
(function() {　
	var time = new Date().getTime();
	setCookie("douyapuTime", time, 2592000);
	getCatIdList();
	loadhtml(firstCouponUrl, 1);
})();

//获得类目列表
function getCatIdList() {
	$.ajax({
		type: "post",
		url: catIdTitleUrl,
		data: {
			level: 1
		},
		dataType: "json",
		success: function(res) {
			var html = '<li class="active"><b class="no-icon"></b>全部分类</li>';
			for(var i = 0; i < res.results.length; i++) {
				html += '<li data-Id=' + res.results[i].cat_id + '><b class="b' + res.results[i].cat_id + '"></b>' + res.results[i].name + '</li>';
			}
			$("#catIdList ul").html(html);
		}
	});
}

//分类列表li绑定点击事件
$("#catIdList").on("click", "li", function() {
	$("#no-search-sign").empty();
	$("#search-sign").empty();
	$(this).parent().children().removeClass("active");
	$(this).addClass("active");
	catCouponNum = 0;
	$(".cat-select").html($(this).text());
	loadhtml(catIdCouponUrl, 5)
});

//已选择的分类标题绑定点击事件
$(".cat-select").on("click", function() {
	if(!$("#catIdList").is(":animated")) {
		$("#catIdList").fadeToggle();
	}
});

$("body").click(function(e) {
	if(!$(e.target).closest(".cat-select").length) {
		$("#catIdList").fadeOut()
	}
});

//点击历史记录列表里的某一个内容搜索这个内容
var hisTime;
var hisItem;
var firstKey;
$("#search-history").on("mousedown", "li", function() {
	$("#search-val").val($(this).text());
	$(".input-text>span").click();
});

//重构搜索历史列表
function init() {
	hisTime = [];
	hisItem = [];
	var i = 0;
	for(; i < document.cookie.split(";").length; i++) {
		if(!isNaN(document.cookie.split(";")[i].split("=")[0] * 1)) {
			hisTime.push(document.cookie.split(";")[i].split("=")[0] * 1);
		}
	}
	if(hisTime.length > 0) {
		hisTime.reverse();
		for(var y = hisTime.length - 1; y >= 0; y--) {
			getCookie(hisTime[y]) && hisItem.push(getCookie(hisTime[y]));
		}
	}
	i = 0;
	$("#search-history ul").html("");
	for(; i < hisItem.length; i++) {
		$("#search-history ul").prepend("<li>" + hisItem[i] + "</li>");
	}
}

//清除历史记录事件
$("#his-dele").mousedown(function() {
	var f = 0;
	for(; f < hisTime.length; f++) {
		setCookie(hisTime[f], "", -1);
	}
	init();
});

function trim(str) {
	return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
}

//写历史记录缓存方法
function setHistoryLocal() {
	$("#search-history").hide();
	var value = trim($("#search-val").val());
	var time = (new Date()).getTime();
	if($.inArray(value, hisItem) >= 0) {
		var arr1 = document.cookie.split("; ");
		for(var j = 0; j < arr1.length; j++) {
			if(escape(value) == arr1[j].split("=")[1]) {
				setCookie(arr1[j].split("=")[0], "", -1);
			}
		}
		setCookie(time, value, 2592000);
	} else {
		if(hisItem.length > 4) {
			firstKey = hisTime[4];
			setCookie(firstKey, "", -1);
			setCookie(time, value, 2592000);
		} else {
			setCookie(time, value, 2592000);
		}
	}
	init();
}

init();

//输入框键入事件
$('#search-val').on({
	blur: function() {
		$("#search-history").hide();
	},
	mousedown: function() {
		if(hisTime.length > 0) {
			$("#search-history").show();
		}
	},
	keyup: function(event) {
		if(event.keyCode == 13) {
			$(".input-text>span").click();
		}
	},
	input: function() {
		if($(this).val() != "") {
			$(".my-icon-close").removeClass("hidden");
		} else {
			$(".my-icon-close").addClass("hidden");
		}
	},
	focus: function() {
		if($(this).val() != "") {
			$(".my-icon-close").removeClass("hidden");
		} else {
			$(".my-icon-close").addClass("hidden");
		}
	}
});

//清除现有的搜索内容方法,叉叉
$(".my-icon-close").on("click", function() {
	$('#search-val').val("");
	$(this).addClass("hidden");
});

function isNull(str) {
	if(str == "") return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}

//点击搜索事件
$(".input-text>span").on("click", function() {
	if(!isNull($("#search-val").val())) {
		searchCouponNum = 0;
		$("#search-sign").empty();
		$("#no-search-sign").empty();
		setHistoryLocal();
		loadhtml(searchCouponUrl, 3);
	}
});

$(".input-text>.my-icon-search").on("click", function() {
	$(".input-text>span").click();
});

//检测是否登录
var cookiesreg = new RegExp("(^| )loginScreenName=([^;]*)(;|$)");
if(document.cookie.match(cookiesreg)) {
	$("#login-left>b.portrait1").hide();
	$("#login-left>b.portrait2").css({
		"backgroundImage": 'url(' + decodeURIComponent(getCookie("img_url")) + ')'
	}).show();
	$("#login-left>span").html("退出").hide();
	$("#login .loginList").hide();
	$("#loginSign").removeClass("hidden");
	$("#collect").show();
} else {
	$("#login-left>b.portrait1").show();
	$("#login-left>b.portrait2").hide();
	$("#login-left>span").html("登录").show();
	$("#loginSign").addClass("hidden");
	$("#collect").hide();
}

//点击我的收藏展示收藏
$("#collect>span").on("click", function() {
	collectNum = 0;
	$("#tool-col").hide();
	$("#person-info-back").show();
	$("#search-sign").empty();
	$("#no-search-sign").empty();
	loadhtml(collectCouponUrl, 8);

});

$("#person-info-back").on("click", function() {
	history.go(0);
});

//登录鼠标hover显示登录方式
var sett;
$('#login-left').on({
	mouseenter: function() {
		clearTimeout(sett);
		sett = setTimeout(function() {
			$("#login .loginList").addClass('hidden');
			$("#login .loginList").removeClass('hidden');
		}, 300);
	},
	mouseleave: function() {
		clearTimeout(sett);
		sett = setTimeout(function() {
			$("#login .loginList").addClass('hidden');
		}, 300);
	}
});

$("#login .loginList").on({
	mouseenter: function() {
		clearTimeout(sett);
		$("#login .loginList").removeClass('hidden');

	},
	mouseleave: function() {
		sett = setTimeout(function() {
			$("#login .loginList").addClass('hidden');
		}, 300);
	},
	click: function() {
		$("#login .loginList").addClass('hidden');
	}
});

//退出登录事件
$("#loginSign").click(function() {
	setCookie111("loginScreenName", "", -1);
	setCookie111("loginToken", "", -1);
	setCookie111("loginUid", "", -1);
	setCookie111("loginUrl", "", -1);
	setCookie111("loginUrl", "", -1);
	setCookie111("TTTTT", "", -1);
	setCookie111("img_url", "", -1);
	setCookie111("loginKey", "", -1);
	setCookie111("username", "", -1);
	history.go(0);
});

function setCookie111(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/;domain=.douyapu.com")
}

//读写cookies方法
function setCookie(n, v, s) {
	var e = new Date();
	e.setTime(e.getTime() + s * 1000);
	document.cookie = n + "=" + escape(v) + ";path=/;expires=" + e.toGMTString()
}

function getCookie(n) {
	var a, r = new RegExp("(^| )" + n + "=([^;]*)(;|$)");
	if(a = document.cookie.match(r)) {
		return unescape(a[2])
	} else {
		return null
	}
}