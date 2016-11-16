//输入框
var input = utils.getElesByClass("search")[0];
input.onfocus = function () {
    input.setAttribute("placeholder", "搜索职位、公司或地点");
    console.log(1);
};
input.onblur = function () {
    input.setAttribute("placeholder", "产品经理")
};
//轮播图
var bannerImg = utils.getElesByClass("bannerImg")[0];
var bannerUl = bannerImg.getElementsByTagName("ul")[0];
var bannerList = utils.getElesByClass("bannerList")[0];
var lis = bannerList.getElementsByTagName("li");
var spanList = bannerList.getElementsByTagName("span");
var moveBorder = utils.getElesByClass("moveBorder")[0];
var topValue = utils.css(bannerUl, "top");
var bannerStep = 0;
bannerUl.moveTimer = window.setInterval(autoMove, 5000);
function autoMove() {
    bannerStep++;
    if(bannerStep === spanList.length){
        bannerStep = 0;
    }
    setImg();
}
for(var i = 0; i < lis.length; i++){
    lis[i].index = i;
}
function setImg() {
    animate(bannerUl, {top: bannerStep * -160}, 200);
    animate(moveBorder, {top: bannerStep * 55}, 200);
    for(var i = 0; i < spanList.length; i++){
        spanList[i].className = "";
    }
    spanList[bannerStep].className = "selected";
}
bannerUl.onmouseover = function () {
    if(bannerUl.moveTimer){
        window.clearInterval(bannerUl.moveTimer);
        bannerUl.moveTimer = null;
    }
};
bannerUl.onmouseout = function () {
    bannerUl.moveTimer = window.setInterval(autoMove, 5000);
};
bannerList.onmouseover = function (e) {
    if(e.target.nodeName === "LI"){
        bannerStep = e.target.index;
        setImg();
    }
};
//侧面火箭
var rocketList = document.getElementById("rocket");
var rocket = rocketList.getElementsByTagName("a")[0];
window.onscroll = function (e) {
    var scrollValue = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollValue);
    if(scrollValue < 5){
        utils.css(rocket, "opacity", 0);
    }else{
        utils.css(rocket, "opacity", 1);
    }
};
//展开隐藏链接
var link = document.getElementById("link");
var aList = link.getElementsByTagName("a");
var aLink = aList[aList.length - 1];
aLink.onclick = function () {
    console.log(utils.css(link, "height"));
    if(utils.css(link, "height") === 15){
        utils.css(link, "height", 30);
    }else {
        utils.css(link, "height", 15);
    }
}