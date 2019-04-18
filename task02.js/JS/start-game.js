//num变量点击显示隐藏，figure和digit是为了按钮判断。die的合并数组，death存放死亡的人。
var num = 0;
var figure = sessionStorage.getItem("figure");
var digit = parseInt(figure);
var death = JSON.parse(sessionStorage.getItem("death"));
console.log(death);
var die = JSON.parse(sessionStorage.getItem("die"));
// var oddNumber=1;
$().ready(function () {
    //按钮，第一个先检测是否是null进行判断。
    $(".btn-one").eq(-1).on("click", function () {
        if (figure == null) {
            window.location.href = "../html/kill-a-person.html";
            console.log(2)
        } else if (digit==1) {
            digit=digit+1;
            sessionStorage.setItem("digit",digit);
            window.location.href = "../html/kill-a-person.html";
        }else {
            alert("请按顺序点击");
        }
    });
    if (digit==2){
        $(".btn-one").eq(-1).css("background","#696969");
        $(".left-triangle-one").eq(-1).css({"border-right":"30px solid #696969"});
    }
    if (digit==2){
        let murder="号被杀死杀死，真实身份是";
        let information=(`<p class="situation">${death[0[0]].number}${murder}${death[death.length-1[death.length-1]].name}</p>`);
        $(".weather").eq(-1).append(information);
        // $(".weather").eq(-1).append(information);
    }
    if (digit==1){
        let vote="号被投票杀死，真实身份是";
        let informations=(`<p class="situations">${death[0[1]].number}${vote}${death[0[1]].name}</p>`);
        $(".weather").not($(".weather").eq(-1)).append(informations);
        // $(".weather").eq(-1).append(informations);
    }
    $(".btn-two").eq(-1).click(function () {
        if (digit == 2) {
            alert("亡灵发言");
            $(this).css("background", "#696969");
            $(".left-triangle-two").css({"border-right":"30px solid #696969"});
            digit = digit + 1;
        } else {
            alert("请按顺序点击");
        }
    });
    $(".btn-three").eq(-1).click(function () {
        if (digit == 3) {
            alert("下面请玩家依次发言");
            $(this).css("background", "#696969");
            $(".left-triangle-three").css({"border-right":"30px solid #696969"});
            digit = digit + 1;
            console.log(digit);
            $(".btn-three").off("click");

        } else {
            alert("请按顺序点击");
        }
    });
    $(".btn-foul").eq(-1).click(function () {
        if (digit == 4) {
            window.location.href = "../html/kill-a-person.html";
            digit = digit + 1;
            digit = digit;
            sessionStorage.setItem("figure", digit);
            // $(".btn-foul").off("click");
        } else {
            alert("请顺序点击")
        }
    });
    //按钮结束

    //每一天点击显示隐藏出现的函数。
    $(".day").eq(0).click(function () {
        //点击次数。
        num = num + 1;
        if (num % 2 == 1) {
            $(".weather").eq(0).hide();
            $(".triangle").eq(0).hide();
            //为奇数的话，隐藏。
        } else {
            $(".weather").eq(0).show();
            $(".triangle").eq(0).show();
            //为偶数出现。
        }
    });
    $(".day").eq(1).click(function () {
        //点击次数。
        num=num+1;
        if (num % 2 == 1) {
            $(".weather").eq(1).hide();
            $(".triangle").eq(1).hide();
            //为奇数的话，隐藏。
        } else {
            $(".weather").eq(1).show();
            $(".triangle").eq(1).show();
            //为偶数出现。
        }
    });
    $("#backtrack").click(function () {
        window.location.href = "../html/judge.html";
    });
    $(".quit").click(function () {
        alert("确定要退出吗？");
        sessionStorage.clear();
        window.location.href = "../html/index.html"
    });

    if (death.length==0){
        console.log(die.length);
    }else if (death.length==1){
        $(".day").eq(1).text("第二天");
    };

});
function load() {
    for (var i = 0; i < death.length-1; i++) {
        console.log(death.length);
        let html = (` <div class="day"  >第一天</div>
        <div class="triangle"></div>
        <div class="weather">
            <div class="timer-shaft">
                <div class="moon"><img height="35" src="../img/moon.png" width="29"/></div>
                <div class="string"></div>
                <div class="sun"><img height="36" src="../img/sun.png" width="36"/></div>
                <div class="string-one"></div>
            </div>
            <div class="option">
                <div class="left-triangle-one"></div>
                <button class="btn-one"   type="button">杀手杀人</button>
            </div>
            <div class="option">
                <div class="left-triangle-two"></div>
                <button class="btn-two" type="button">亡灵发表遗言</button>
            </div>
            <div class="option">
                <div class="left-triangle-three"></div>
                <button class="btn-three" type="button">玩家依次发言</button>
            </div>
            <div class="option">
                <div class="left-triangle-foul"></div>
                <button class="btn-foul" type="button">全民投票</button>
            </div>
        </div>`);
        //渲染html0
        $("main").append(html);
    }
        // if (death.length-1 == 1) {
            //使用not遍历删除下标.eq(-1),来渲染。
            // $(".btn-one").not($(".btn-one").eq(-1)).css("background","#696969");
            // $(".left-triangle-one").not($(".left-triangle-one").eq(-1)).css({"border-right":"30px solid #696969"});
            // $(".btn-two").not($(".btn-two").eq(-1)).css("background","#696969");
            // $(".left-triangle-two").not($(".left-triangle-two").eq(-1)).css({"border-right":"30px solid #696969"});
            // $(".btn-three").not($(".btn-three").eq(-1)).css("background","#696969");
            // $(".left-triangle-three").not($(".left-triangle-three").eq(-1)).css({"border-right":"30px solid #696969"});
            // $(".btn-foul").not($(".btn-foul").eq(-1)).css("background","#696969");
            // $(".left-triangle-foul").not($(".left-triangle-foul").eq(-1)).css({"border-right":"30px solid #696969"});
            // $(".weather").not($(".weather").eq(-1)).hide();
            // $(".triangle").not($(".triangle").eq(-1)).hide();
            // 渲染显示信息
            // let murder="号被杀死杀死，真实身份是";
            // let information=(`<p class="situation">${death[0].number}${murder}${death[0].name}</p>`);
            // $(".weather").not($(".weather").eq(-1)).append(information);
            // let vote="号被投票杀死，真实身份是";
            // let informations=(`<p class="situations">${death[1].number}${vote}${death[1].name}</p>`);
            // $(".weather").not($(".weather").eq(-1)).append(informations);
        // }
}
load();
