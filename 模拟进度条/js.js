var button = $(".button"), scroll = $(".scroll"), p = $("p"), total = 0;
var timer = null;
button.click(function () {
    if($(this).css("backgroundColor") !== "rgb(255, 0, 0)"){
        $(this).css("backgroundColor", "rgb(255, 0, 0)");
    }else{
        $(this).css("backgroundColor", "rgb(255, 255, 255)");
    }
    if(total == 100){
        total = 0;
        scroll.children().css({backgroundColor: "transparent"});
    }
    if(timer){
        window.clearInterval(timer);
        timer = null;
    }else{
        timer = window.setInterval(function () {
            total++;
            if(total == 100){
                button.css("backgroundColor", "rgb(255, 255, 255)");
                window.clearInterval(timer);
                timer = null;
            }
            p.html(total + "%");
            scroll.children("i:nth-child(" + total + ")").css({backgroundColor: "#00b3ee"});
        }, 10);
    }
});