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
var focusList = bannerList.getElementsByTagName("li");
var moveBorder = utils.getElesByClass("moveBorder")[0];
var topValue = utils.css(bannerUl, "top");
var bannerStep = 0;
bannerUl.timer = window.setInterval(autoMove, 1000);
function autoMove() {
    bannerStep++;
    if(bannerStep === focusList.length){
        bannerStep = 0;
    }
    setImg();
    setFocus();
    console.log(1);
}
function setImg() {
    animate(bannerUl, {top: bannerStep * -160}, 300);
}
function setFocus() {
    animate(moveBorder, {top: bannerStep * 55}, 300);
}