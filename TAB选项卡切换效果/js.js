var lis = $(".tabTag li"), focus = $(".tabContext ul"), bar = $("i");
lis.click(function () {
    bar.animate({top: 65 + $(this).index() * 60 + "px"}, 300);
    focus.children("li:nth-child(" + ($(this).index() + 1) + ")").animate({top: 50}, 300);
    focus.children("li:nth-child(" + ($(this).index() + 1) + ")").siblings().animate({top: -205}, 300)
});
lis.mousemove(function () {
    $(this).css({color: "#000"});
});
lis.mouseout(function () {
    $(this).css({color: "#999"});
});