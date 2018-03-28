//写cookie缓存
function setCookie(n, v, s) {
	var e = new Date();
	e.setTime(e.getTime() + s * 1000);
	document.cookie = n + "=" + escape(v) + "; path=/;expires=" + e.toGMTString()
}

//读cookie缓存
function getCookie(n) {
	var a, r = new RegExp("(^| )" + n + "=([^;]*)(;|$)");
	if(a = document.cookie.match(r)) {
		return unescape(a[2])
	} else {
		return null
	}
}

//输入框键入事件
$('#search-val').on({
	focus: function() {
		console.log(1);
	},
	blur: function() {
		console.log(2);
	},
	keyup: function(event) {
		var val = $(this).val();
		if(event.keyCode == 13) {
			val = encodeURIComponent($("#searchText").val());
			console.log(val);
			window.location.href = "/coupon/search?val=" + val;
		}
	}
});