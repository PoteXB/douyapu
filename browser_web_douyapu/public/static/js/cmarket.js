!function () {
    var scrollHeight = $("#couponbook-fixed").offset().top;
    $(document).on("scroll", function () {
        if ($(document).scrollTop() >= scrollHeight) {
            $("#couponbook-fixed").addClass("couponbook-fixed");
            $(".couponbook-sort").css("marginTop", 156)
        } else {
            $("#couponbook-fixed").removeClass("couponbook-fixed");
            $(".couponbook-sort").css("marginTop", 0)
        }
    });
    $(".couponbook-category").on("mouseenter", ".couponbook-category-item", function () {
        $(".couponbook-category .couponbook-category-dropdown").hide();
        $(this).children(".couponbook-category-dropdown").show();
    });
    $(".couponbook-category").on("mouseleave", ".couponbook-category-item", function () {
        $(this).children(".couponbook-category-dropdown").hide();
    });
}();
