!function () {
    var reg1 = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    var reg2 = /[1-9][0-9]{4,}/;
    $(".feedback-select-content").on("click", "li", function () {
        $(this).toggleClass("select");
        if ($(".feedback-select-content li.select").length > 0) {
            $(this).parent().parent().attr("data-sign", 1);
        } else {
            $(this).parent().parent().attr("data-sign", 0);
        }
    });

    $("#feedback").on("change", "input,textarea", function () {
        if ($(this).val()) {
            $(this).attr("data-sign", 1);
        } else {
            $(this).attr("data-sign", 0);
        }
    });

    $("#submit-btn").click(function () {
    	var brua=window.navigator.userAgent;
        var value1 = $("#test3").val();
        var sign1 = 0, sign2 = 0, sign3 = 0;
        if ($("#test1").attr("data-sign") == 0) {
            $("#msg1").fadeIn();
        } else {
            $("#msg1").hide();
            sign1 = 1;
        }
        if ($("#test2").attr("data-sign") == 0) {
            $("#msg2").fadeIn();
        } else {
            $("#msg2").hide();
            sign2 = 1;
        }
        if ($("#test3").attr("data-sign") == 0) {
            $("#msg3").html("请填写此处").fadeIn();
        } else {
            if (!(reg1.test(value1) == true || reg2.test(value1) == true)) {
                $("#msg3").html("请填写正确的QQ或者有效的邮箱").fadeIn();
                $("#test3").focus();
            } else {
                $("#msg3").hide();
                sign3 = 1;
            }
        }
        if (sign1 && sign2 && sign3) {
            var str = "", count = 0;
            $("#test2 li.select").each(function () {
                str += $(this).children("span").data("type") + ",";
                count += 1;
                if (count == $("#test2 li.select").length) {
                    $.ajax({
                        type: "post",
                        url: "/index/feedback/submit",
                        dataType: "json",
                        data: {
                            "desc": $("#test1").val(),
                            "option": str,
                            "contact": $("#test3").val(),
                            "address": $("#test4").val(),
                            "ua":brua,
                            "type":2
                        },
                        success: function (e) {
                            if (e.status) {
                                alert("反馈成功");
                                history.go(0);
                            } else {
                                alert("反馈失败");
                            }
                        },
                        error: function () {
                            alert("请稍后重试");
                        }
                    });
                }
            });
        }
    });
    $("textarea").on({
        "change": function () {
            var curLength = $(this).val().length;
            if (curLength >= 200) {
                var num = $(this).val().substr(0, 200);
                $(this).val(num);
            }
        },
        "keydown": function () {
            $(this).val($(this).val().substring(0, 200));
        },
        "keyup": function () {
            $(this).val($(this).val().substring(0, 200));
        }
    });
}();