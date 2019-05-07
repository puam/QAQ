$(function () {
    // numberDays();
    $(".home").click(function () {
        alert("确定要返回主页吗？");
        window.location.href = "../html/index.html";
        sessionStorage.clear();
    });
    $(".to-game").click(function () {
        alert("确定要再来一局吗？");
        window.location.href = "../html/allocation-game.html";
        sessionStorage.clear();
    });
    $(".retun").click(function () {
        alert("恭喜你！，触发隐藏彩蛋");
        window.location.href = "https://www.bilibili.com/video/av49029520?from=search&seid=16010131703906552482";
    });

});
numberDays();

function numberDays() {
    let death = JSON.parse(sessionStorage.getItem("death"));
    for (var i = 0; i < death.length; i++) {
        console.log(i);
        if (death[i][1]==undefined) {
            var html = (` <div class="day">
            <div class="number-days">
                <span class="one-day">第${i + 1}天</span>
                <span class="two-day">0小时07分</span>
            </div>
            <p class="murder">晚上：${death[i][0].number}号被杀手杀死，${death[i][0].number}号是${death[i][0].name}</p>
            <p class="murder">白天：未进行</p>
        </div>`);
            $("main").append(html);
        }else {
            var div = (` <div class="day">
            <div class="number-days">
                <span class="one-day">第${i + 1}天</span>
                <span class="two-day">0小时07分</span>
            </div>
            <p class="murder">晚上：${death[i][0].number}号被杀手杀死，${death[i][0].number}号是${death[i][0].name}</p>
            <p class="murder">白天：${death[i][1].number}号被全民投票投死，${death[i][1].number}号是${death[i][1].name}</p>
        </div>`);
            $("main").append(div);
        }
    }
}

//home