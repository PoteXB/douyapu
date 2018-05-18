var cityName = localStorage.city ? localStorage.city : "";
var urlc = "https://www.baidu.com/home/other/data/weatherInfo";

function getWeather(cityName) {
	$.ajax({
		type: "get",
		url: urlc,
		data: {
			"city": cityName
		},
		dataType: 'json',
		success: function(msg) {
			if(msg.data.weather.content && msg.data.weather.content.today) {
				oprender(msg.data);
				localStorage.city = msg.data.weather.content.city;
			} else {
				$("#errorMsg").css("display", "block");
				$("#errorMsg span").html("未查询到该城市的天气信息，正在切换当前城市...");
				getWeather("");
				timer = setTimeout(function() {
					$("#errorMsg").css("display", "none");
				}, 3000);
			};
		},
		error: function() {
			$("#errorMsg").css("display", "block");
			$("#errorMsg span").html("当前网络不佳,请稍后打开重试...");
		}
	});
}

function oprender(data) {
	var time = new Date();
	var house = time.getHours();
	var aqi = data.weather.content.today.pm25;
	var warningtitle = data.weather.content.warning ? data.weather.content.warning : {
		"title": "",
		"color": ""
	};
	if(aqi <= 50) {
		aqi_q = "优";
	} else if(aqi > 50 && aqi <= 100) {
		aqi_q = "良";
	} else if(aqi > 100 && aqi <= 150) {
		aqi_q = "轻度";
	} else if(aqi > 150 && aqi <= 200) {
		aqi_q = "中度";
	} else if(aqi > 200 && aqi <= 300) {
		aqi_q = "重度";
	} else if(aqi > 300) {
		aqi_q = "严重";
	};
	$(".now_temp").text(data.weather.content.today.temp).attr('title',data.weather.content.today.temp);
	$(".city").text(data.weather.content.city).attr('title', data.weather.content.city);
	$(".wind_force").text(data.weather.content.today.wind).attr('title', data.weather.content.today.wind);
	$(".condition").text(data.weather.content.today.condition).attr('title', data.weather.content.today.condition);
	$(".air_font").text("空气");
	$(".icon").addClass("map_icon");
	$(".air_q").text(aqi_q).attr('title', aqi_q);
	$(".air_v").text(data.weather.content.today.pm25).attr('title', data.weather.content.today.pm25);
	$(".date").text(data.weather.content.week).attr('title', data.weather.content.week);
	$(".hint").text(warningtitle.title).attr('title', warningtitle.title).css("color", warningtitle.color);
	$(".lunar").text("农历  " + data.weather.content.calendar.lunar).attr('title', data.weather.content.calendar.lunar);
	var bgImg = [{
		"day": "sun_day",
		"light": "sun_light"
	}, {
		"day": "cloud_day",
		"light": "cloud_light"
	}, {
		"day": "snow",
		"light": "snow"
	}, {
		"day": "thunder",
		"light": "thunder"
	}, {
		"day": "rain",
		"light": "rain"
	}, {
		"day": "cloudy",
		"light": "cloudy"
	}, ]
	var cdnClass = ["晴", "云", "雪", "雷阵雨", "雨", "阴"];
	var pattern;
	var promise = new Promise(function(resolve, reject) {
		for(var i = 0; i < cdnClass.length; i++) {
			pattern = new RegExp(cdnClass[i]);
			if(pattern.test(data.weather.content.today.condition)) {
				bgImgSrc = bgImg[i];
				break;
			}
		}
		resolve(bgImgSrc);
	});
	promise.then(function(res) {
		if(house > 6 && house < 18) {
			bgImgSrc = res["day"];
		} else {
			bgImgSrc = res["light"];
		}
		$(".img_right").css({
			"background": "url(../image/" + bgImgSrc + ".png) no-repeat"
		});
	});
	$("#zezhao").css("display", "none").addClass("opcity");
}

//取消退出事件
$("#refreshBtn").click(function() {
	history.go(0);
});

//刷新按钮
$(".refresh").click(function() {
	history.go(0);
});

//选择城市
$(".goSet").click(function() {
	$("#setBox").removeClass("hidden");
});

//选择热门城市点击
$(".hotCityList").on("click", "a", function(e) {
	e.preventDefault();
	localStorage.city = $(this).html();
	history.go(0);
});

var matchingCtiyArr = [];

function isCity(cityname) {
	var judge = null;
	$.each(matchingCtiyArr, function(index, value) {
		if(cityname == value["cityName"]) {
			judge = value;
		}
	});
	return judge;
}

//渲染列表事件
function setList(data) {
	$(".list").empty();
	matchingCtiyArr = data;
	var mlength = 5;
	if($("#cityName").val()) {
		if(matchingCtiyArr.length < 5) {
			mlength = matchingCtiyArr.length;
		}
		for(var i = 0; i < mlength; i++) {
			var oli = "<li class='lis'>" + matchingCtiyArr[i]["cityName"] + "</li>";
			$(".list").append(oli);
		}
	}
}

//搜索后的城市列表点击其中一个把这个城市名字写入输入框中
$(".list").on("click", ".lis", function() {
	$("#cityName").val($(this).text());
	setData = matchingCtiyArr[$(this).index()];
	$(".list").css("display", "none");
});

//返回键点击事件
$(".okbtn").click(function() {
	history.go(0);
});

//城市输入请求相关字城市列表事件
$("#cityName").on("keyup", function(e) {
	$(".error").addClass("hidden");
	var search = $(this).val();
	if(search) {
		var value = [];
		for(var i = 0; i < cityArr.length; i++) {
			if(cityArr[i].match(search) != null) {
				value.push({
					"cityName": cityArr[i]
				});
			}
		};
		setList(value);
		if(value.length > 0) {
			$(".list").show();
		} else {
			$(".list").hide();
		}
	} else {
		$(".list").empty();
		$(".error").addClass("hidden");
		$(".list").hide();
	}
});

//确定按钮点击事件
$("#searchBtn").click(function() {
	var isc = isCity($("#cityName").val());
	if(isc != null) {
		setData = isc.cityName;
		localStorage.city = setData;
		history.go(0);
	} else {
		$(".error").removeClass("hidden");
		$(".list").hide();
	}
});

getWeather(cityName);