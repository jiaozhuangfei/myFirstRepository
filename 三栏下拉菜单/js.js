$(document).ready(function () {
    var $h3 = $("h3");
    $h3.first().parent().siblings().children("ul").hide();
    $h3.each(function (index, item) {
        $(item).click(function () {
            $(this).next().slideDown();
            $(this).parent().siblings().children("ul").slideUp();
        })
    });
});