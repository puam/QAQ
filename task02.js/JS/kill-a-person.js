//取出浏览器的值存玩家信息的值。
var player = JSON.parse(sessionStorage.getItem("list"));
// var death=JSON.parse(sessionStorage.getItem("death"));
var typeface = "号";
//if按钮判断
//这个值是负责写下面页面的点击效果。并转化为数字类型。
var figure=sessionStorage.getItem("figure");
figure=parseInt(figure);

//模板字符串渲染html
function box() {
    //给id选择器使用。
    for (let i = 0; i < player.length; i++) {
        let div = (`<div class="game-box" id="kills">
                    <div class="role">${player[i].name}</div>
                    <div class="number">${i + 1}${typeface}</div>
                    <img class="kill" src="../img/img-7-2.png" height="30" width="30"/>
                    </div>`
        );
        //用jQuery模板渲染html
        $("#gaine").append(div);
    }
}

//默认加载函数
$(document).ready(function () {
    box();
    $(".kill").hide();//默认隐藏图片
    $(".game-box").click(function () {
        // $('.role').removeClass('message-box');
        //运行点击事件时,清除role的类名,如果没有这个类名的话.
        $(".role").removeClass("message-box");
        //点击获取dom,给k所以盒子的kill添加,图片隐藏,因为图片本身时隐藏的.不写的话,它无法点击
        //其他盒子的时候显示
        $(".kill").css('display', 'none');

        //children查找子元素role之后,追加类名.改变颜色.
        // $(this).addClass('message-box');
        $(this).children(".role").addClass("message-box");
        //当前图片显示
        // $(this).siblings('img').show();
        $(this).children('img').show();
    });
    console.log(figure);

    //投票页面，移除点击事件，更改标题。死掉的角色禁止点击。
    if (figure==5){
        var death = JSON.parse(sessionStorage.getItem("death"));
        $(".role").eq(death[0].number-1).css("background","#696969");
        $(".game-box").eq(death[0].number-1).off("click");
        $(".hunt").text("发言讨论结束，请大家投票。");
        $(".title").text("投票");
    };
});
//杀人与投票
$("#start").click(function () {
    //浏览器的点击按钮需要用给的值
    var Store=2;
    //查找玩家数组的下标。
var subscript=$(".role").index($(".message-box"));
if( figure==5){
    //取出杀人之后浏览器保存的值。
    var browser = JSON.parse(sessionStorage.getItem("player"));
    //取出浏览器死亡对象数组。
    var death=JSON.parse(sessionStorage.getItem("death"));
    //把选中的死亡状态push进入数组。并且更改state的状态
    death.push({name: browser[subscript].name,number: browser[subscript].number,state: browser[subscript].state=2});
    //打印投票存入的对象。
    //在浏览器里面存值。
    sessionStorage.setItem("death",JSON.stringify(death));
    sessionStorage.setItem("player",JSON.stringify(browser));
    var test=[];
    test.push(death);
    window.location.href="../html/start-game.html";
    //把浏览器的值禁止点击使用的值，重置之后再去使用。
    figure=2;
    sessionStorage.setItem("figure",figure)
    //浏览器存的数字重新存入。
}else if (player[subscript].name=="平民") {
    // /建立空数组存放对象。
    var death=[];
    // 把死亡状态的对象传入数组。
    death.push({name:player[subscript].name,number:player[subscript].number,state:player[subscript].state=2});
    // 浏览器存值。
    sessionStorage.setItem("player",JSON.stringify(player));
    sessionStorage.setItem("death",JSON.stringify(death));
    // 页面跳转
    window.location.href="../html/start-game.html";
    // 把页面四个按钮的值变量存值。
    sessionStorage.setItem("figure",Store);
    console.log(player[subscript].name);
}else {
    alert("不能对本职业的人下手");
}

});

$(".quit").click(function () {
    alert("确定要返回首页吗？");
    sessionStorage.clear();
    window.location.href="../html/index.html";
});
