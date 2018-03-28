//点击左边内容,右边相应内容改变
$(".helppage-left").on("click", "a[data-type]", function () {
    history.go(0);
});
~function inLoc() {
    var loc = location.href.split("#")[1] ? location.href.split("#")[1] : "hui";
    $(".helppage-right>div#" + loc).css("display", "block");
    $(".helppage-left>a[data-type=" + "'" + loc + "']").addClass("active");
}();