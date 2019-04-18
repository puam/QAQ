//list浏览器玩家信息。typeface是模板字符串使用的变量。figure浏览器值，判断是否投票。
var list = JSON.parse(sessionStorage.getItem("list"));
var figure=sessionStorage.getItem("figure");
//转换数字类型。
figure=parseInt(figure);
//浏览器取出死亡数组。

//模板字符串渲染html
function box() {
    var typeface = "号";
    //给id选择器使用。
    for (let i = 0; i < list.length; i++) {
        let div = (`<div class="game-box" id="kills">
                    <div class="role">${list[i].name}</div>
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
    //browser是玩家信息,由于执行环境的关系叫browser.death是死亡数组.push进去投票死去的人.
    var browser = JSON.parse(sessionStorage.getItem("list"));
    var death=JSON.parse(sessionStorage.getItem("death"));
    for (var i=0; i<death.length;i++){

    }
    death[i-1].push({name: browser[subscript].name,number: browser[subscript].number,state: browser[subscript].state=2});
    //浏览器存值，death死亡数组存入。list，存入死掉的玩家状态。
    sessionStorage.setItem("death",JSON.stringify(death));
    sessionStorage.setItem("list",JSON.stringify(browser));

    //p获取死亡数组,push死亡数组.
    // var die=JSON.parse(sessionStorage.getItem("die"));
    // die.push(death);
    // sessionStorage.setItem("die",JSON.stringify(die));
    //修改浏览器步骤.
    figure=1;
    sessionStorage.setItem("figure",figure);
    window.location.href="../html/start-game.html";
}else if (list[subscript].name=="平民") {
    //取出数组。
    var death=JSON.parse(sessionStorage.getItem("death"));
    for (var i=0; i<death.length;i++) {

    }
    console.log(i);
    // 把死亡状态的对象传入数组。
    death[i-1].push({name:list[subscript].name,number:list[subscript].number,state:list[subscript].state=2});
    // 浏览器存值。
    sessionStorage.setItem("list",JSON.stringify(list));
    sessionStorage.setItem("death",JSON.stringify(death));
    console.log(death.length);
    // var die=JSON.parse(sessionStorage.getItem("die"));
    // die.push(death);
    // sessionStorage.setItem("die",JSON.stringify(die));
    // 页面跳转
    window.location.href="../html/start-game.html";
    // 把页面四个按钮的值变量存值。
    sessionStorage.setItem("figure",Store);
    console.log(list[subscript].name);
}else {
     alert("兄弟,在干嘛?")
}
});
$(".quit").click(function () {
    alert("确定要返回首页吗？");
    sessionStorage.clear();
    window.location.href="../html/index.html";
});