//定义一个变量根据点击次数去判断，第一天显示隐藏。
var num=0;
//取出在浏览器存的值，来完成禁止点击效果。
var figure=sessionStorage.getItem("figure");

//取出死去的人。
var death=JSON.parse(sessionStorage.getItem("death"));
console.log(death);
//把存入的字符串转化为数字。

var order= parseInt(figure);
console.log(order);

//第一个按钮浏览器的值

$(document).ready(function () {
    if (order == 2){
        $("#murder").css("background","#696969");
        //开始加载的时候，就禁止点。
        $("#murder").off("click");
        $(".left-triangle").eq(0).addClass("triangles");
        $(".left-triangle").eq(0).removeClass("left-triangle");

    };
    //插入提示。
    var text="号被杀手杀死，真实身份是。";
    var insertion=(`<p class="situation">${death[[1]].number}${text}${death[[1]].name}</p>`);
    if (order==2){
        $(".weather").append(insertion);
    };
});

    $("#display").click(function () {
        //点击次数。
        num=num+1;
        if (num % 2 == 1) {
            $(".weather").hide();
            $(".triangle").hide();
            //为奇数的话，隐藏。
            } else {
            $(".weather").show();
            $(".triangle").show();
            //为偶数出现。
            }
    });
    //禁止点击事件，浏览器的值目前为。2在杀手杀人页面进行存值。·完成禁点的原因是因为如果浏览器取不出来值的话为nan。
$("#murder").on("click",function () {
    if (order == 2) {
        alert("请按顺序点击。");
    } else {
        window.location.href = "../html/kill-a-person.html";
    }

});
// console.log($(".btn").first());
$(".btn").eq(1).click(function () {
    if (order ==2 ){
        alert("亡灵发言");
        $(this).css("background","#696969");
        $(".left-triangle").eq(0).addClass("triangles");
        $(".left-triangle").eq(0).removeClass("left-triangle");
        order=order+1;
    }else {
        alert("请按顺序点击");
    }
});
$(".btn").eq(2).click(function () {
    if (order==3){
        alert("下面请玩家依次发言");
        $(".btn").eq(2).css("background","#696969");
        $(".left-triangle").eq(0).addClass("triangles");
        $(".left-triangle").eq(0).removeClass("left-triangle");
        order=order+1;
        console.log(order);
    } else {
        alert("请执行下一步");
    }
});
$(".btn").eq(3).click(function () {
    if (order==4){
        window.location.href="../html/kill-a-person.html";
        $(".btn").eq(3).css("background","#696969");
        $(".left-triangle").eq(0).addClass("triangles");
        $(".left-triangle").eq(0).removeClass("left-triangle");
        order=order+1;
        figure=order;
        sessionStorage.setItem("figure",figure);
    }else {
        alert("请顺序点击")
    }
});
//返回跳转。
$("#backtrack").click(function () {
    window.location.href = "../html/judge.html";
});