//num变量点击显示隐藏，figure和digit是为了按钮判断。die的合并数组，death存放死亡的人。list是玩家信息。
// var num = 0;
var figure = sessionStorage.getItem("figure");
var digit = parseInt(figure);
var death = JSON.parse(sessionStorage.getItem("death"));
var dies = JSON.parse(sessionStorage.getItem("dies"));
var list = JSON.parse(sessionStorage.getItem("list"));
//开始加载函数
$().ready(function () {
    //除了当前的都隐藏掉。
    $(".days").not($(".days").eq(-1)).hide();
    $(".day").click(function () {
        //toggle.如果是显示状态的话，就让他隐藏掉，如果是隐藏的话，就让他显示。
        $(this).next(".days").toggle();
    });
    $("#backtrack").click(function () {
        window.location.href = "../html/judge.html";
    });
    $(".quit").click(function () {
        alert("确定要退出吗？");
        sessionStorage.clear();
        window.location.href = "../html/index.html"
    });
    //按钮，第一个先检测是否是null进行判断。
    $(".btn-one").eq(-1).on("click", function () {
        if (figure == null) {
            window.location.href = "../html/kill-a-person.html";
            // console.log(2)
        } else if (digit == 1) {
            digit = digit + 1;
            sessionStorage.setItem("digit", digit);
            window.location.href = "../html/kill-a-person.html";
        } else {
            alert("请按顺序点击");
        }
    });
    $(".btn-two").eq(-1).click(function () {
        if (digit == 2) {
            alert("亡灵发言");
            $(this).css("background", "#696969");
            $(".left-triangle-two").css({"border-right": "30px solid #696969"});
            digit = digit + 1;
        } else {
            alert("请按顺序点击");
        }
    });
    $(".btn-three").eq(-1).click(function () {
        if (digit == 3) {
            alert("下面请玩家依次发言");
            $(this).css("background", "#696969");
            $(".left-triangle-three").css({"border-right": "30px solid #696969"});
            digit = digit + 1;
            console.log(digit);
            $(".btn-three").off("click");

        } else {
            alert("请按顺序点击");
            console.log("111");
        }
        ;
    });
    $(".btn-foul").eq(-1).click(function () {
        if (digit == 4) {
            digit = digit + 1;
            sessionStorage.setItem("figure", digit);
            window.location.href = "../html/kill-a-person.html";
            list[death.length - 1].button = "ban";
            list[death.length - 1].triangle = "border";
            sessionStorage.setItem("list", JSON.stringify(list));
        } else {
            alert("请顺序点击")
        }
    });
    //按钮结束
    //结束游戏
    $(".over").click(function () {
        var mymessaGE=confirm("你确定要结束游戏对吗？");
        if (mymessaGE==true){
            document.write("确定");
            sessionStorage.clear();
            window.location.href = "../html/allocation-game.html";
        }else {
            document.write("取消");
        }
    });
});

function load() {
    for (var i = 0; i < death.length; i++) {
        let html = (` <div class="day">第${i + 1}天</div>
      <div class="days">
        <div class="triangle"></div>
        <div class="weather">
            <div class="timer-shaft">
                <div class="moon"><img height="35" src="../img/moon.png" width="29"/></div>
                <div class="string"></div>
                <div class="sun"><img height="36" src="../img/sun.png" width="36"/></div>
                <div class="string-one"></div>
            </div>
            <div class="option">
                <div class="left-triangle-one ${list[i].triangle}"></div>
                <button class="btn-one ${list[i].button}" type="button">杀手杀人</button>
            </div>
            <div class="option">
                <div class="left-triangle-two ${list[i].triangle}"></div>
                <button class="btn-two ${list[i].button}" type="button">亡灵发表遗言</button>
            </div>
            <div class="option">
                <div class="left-triangle-three ${list[i].triangle}"></div>
                <button class="btn-three ${list[i].button}" type="button">玩家依次发言</button>
            </div>
            <div class="option">
                <div class="left-triangle-foul ${list[i].triangle}"></div>
                <button class="btn-foul ${list[i].button}" type="button">全民投票</button>
            </div>
        </div>
</div>`);
        //渲染html0
        $("main").append(html);
    }
    if (dies == death.length) {
        //for循环 i与death.length的区别在于，i是动态的。数组长度是死的。所以渲染几遍都是当天的下标。
        for (var i = 1; i < death.length; i++) {
            let murder = "号被杀死杀死，真实身份是";
            // console.log(i,death.length);
            let information = (`<p class="situation">${death[i - 1][0].number}${murder}${death[i - 1][0].name}</p>`);
            $(".weather").eq(i - 1).append(information);

            let vote = "号被投票杀死，真实身份是";
            let informations = (`<p class="situations">${death[i - 1][1].number}${vote}${death[i - 1][1].name}</p>`);
            $(".weather").eq(i - 1).append(informations);
        }
    }
}

//及时渲染谁被杀死。
function hint() {
    if (digit == 2) {
        $(".btn-one").eq(-1).css("background", "#696969");
        $(".left-triangle-one").eq(-1).css({"border-right": "30px solid #696969"});
        let murder = "号被杀死杀死，真实身份是";
        let information = (`<p class="situation">${death[death.length - 1][death.length - death.length].number}${murder}${death[death.length - 1][death.length - death.length].name}</p>`);
        $(".weather").eq(-1).append(information);
    }
}

load();
hint();