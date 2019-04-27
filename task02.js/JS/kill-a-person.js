//list浏览器玩家信息。typeface是模板字符串使用的变量。figure浏览器值步骤。
var list = JSON.parse(sessionStorage.getItem("list"));
var figure = sessionStorage.getItem("figure");
//转换浏览器步骤数据类型。
figure = parseInt(figure);
console.log("xxx");
var civilian = JSON.parse(sessionStorage.getItem("civilian"));
console.log(civilian.length);

//模板字符串渲染html
function box() {
    var typeface = "号";
    //给id选择器使用。
    for (let i = 0; i < list.length; i++) {
        let div = (`<div class="game-box" id="kills">
                    <div class="role ${list[i].class}">${list[i].name}</div>
                    <div class="number">${i + 1}${typeface}</div>
                    <img class="kill" src="../img/img-7-2.png" height="30" width="30"/>
                    </div>`
        );
        //用jQuery模板渲染html
        $("#gaine").append(div);
    }
}
box();
dayNumber();
//默认加载函数
$(document).ready(function () {
    $(".kill").hide();//默认隐藏图片
    $(".game-box").click(function () {
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
    turnColor();
//杀人与投票
    $("#start").click(function () {
        //浏览器的点击按钮需要用给的值
        var Store = 2;
        //查找当前玩家数组的下标。
        var subscript = $(".role").index($(".message-box"));
        if (figure == 5) {
            //browser是玩家信息,由于执行环境的关系叫browser.death是死亡数组.push进去投票死去的人.
            var browser = JSON.parse(sessionStorage.getItem("list"));
            var death = JSON.parse(sessionStorage.getItem("death"));
            var civilian = JSON.parse(sessionStorage.getItem("civilian"));
            var slayer = JSON.parse(sessionStorage.getItem("slayer"));
            death[death.length - 1].push({
                name: browser[subscript].name,
                number: browser[subscript].number,
                state: browser[subscript].state = 2,
                class: browser[subscript].class = "death"
            });
            //浏览器存值，death死亡数组存入。list，存入死掉的玩家状态。
            if (browser[subscript].name == "平民") {
                civilian.push({
                    name: browser[subscript].name,
                    number: browser[subscript].number,
                    state: browser[subscript].state = 2,
                    class: browser[subscript].class = "death"
                });
            } else if (browser[subscript].name == "杀手") {
                slayer.push({
                    name: browser[subscript].name,
                    number: browser[subscript].number,
                    state: browser[subscript].state = 2,
                    class: browser[subscript].class = "death"
                });
            }
            //第二天在添加一个空数组。
            death.push([]);
            //修改浏览器步骤.
            figure = 1;
            sessionStorage.setItem("death", JSON.stringify(death));
            sessionStorage.setItem("list", JSON.stringify(browser));
            sessionStorage.setItem("slayer", JSON.stringify(slayer));
            sessionStorage.setItem("civilian", JSON.stringify(civilian));
            //投票生成天数数组。
            sessionStorage.setItem("dies", JSON.stringify(death.length));
            sessionStorage.setItem("figure", figure);
            window.location.href = "../html/start-game.html";
        } else if (list[subscript].name == "平民") {
            //取出死亡数组与死亡的平民空数组。
            var death = JSON.parse(sessionStorage.getItem("death"));
            var civilian = JSON.parse(sessionStorage.getItem("civilian"));
            // 把死亡状态的对象传入数组与把死掉的平民push入civilian。
            death[death.length - 1].push({
                name: list[subscript].name,
                number: list[subscript].number,
                state: list[subscript].state = 2,
                class: list[subscript].class = "death"
            });
            civilian.push({
                name: list[subscript].name,
                number: list[subscript].number,
                state: list[subscript].state = 2,
                class: list[subscript].class = "death"
            });
            // 浏览器存值。
            sessionStorage.setItem("list", JSON.stringify(list));
            sessionStorage.setItem("death", JSON.stringify(death));
            sessionStorage.setItem("civilian", JSON.stringify(civilian));
            // 页面跳转
            window.location.href = "../html/start-game.html";
            //上传步骤。
            sessionStorage.setItem("figure", Store);
        } else {
            alert("兄弟,在干嘛?")
        }
        isWin();
    });
    $(".quit").click(function () {
        alert("确定要返回首页吗？");
        sessionStorage.clear();
        window.location.href = "../html/index.html";
    });
});

//渲染死亡玩家函数。

function turnColor() {
    $(".death").parent().off("click");
}

//渲染全民投票
function dayNumber() {
    if (figure == 5) {
        $(".title").text("全民投票");
    }
}
function isWin() {
    //取出杀手与平民实际人数，与杀手平民死亡数组进行比较。
    let kill=JSON.parse(sessionStorage.getItem("kill"));
    let slayer=JSON.parse(sessionStorage.getItem("slayer"));
    let civilian=JSON.parse(sessionStorage.getItem("civilian"));
    let peo=JSON.parse(sessionStorage.getItem("peo"));
    console.log(kill-slayer.length);
    console.log(peo-civilian.length);
    switch (kill-slayer.length)
    {
        case peo-civilian.length:
            window.location.href="../html/win.html";
            alert("杀手赢");
            break;
        case 0:
            window.location.href="../html/win.html";
            alert("平民赢");
    }
}