//点击事件
document.getElementById("value").value = 4;
document.getElementById("killer").value=1;
document.getElementById("people").value=3;
function inputbox() {
    //获取输入框与滑块的value值；
    var input = document.getElementById("value").value;
    var strip = document.getElementById("block");
    //判断输入框的值是否满足条件
    if (input >= 4 && input <= 18) {
        strip.value = input;//获取input赋值给strip滑块
        allocation();//调用函数,把input的value值与杀手和平民关联.
    } else {
        alert("输入错误的值，请重新输入");
       var error= document.getElementById("value").value=4;
       strip.value=error;
    }
}
//滑块
function slide() {
    // 获取输入框的值与滑块的值
    var strip = document.getElementById("block");
    var input = document.getElementById("value");
    // 滑块关联输入框
    input.value = strip.value;
    allocation();
}

//减号
function reduce() {
    //获取滑块与输入框减号的value值
    var strip = document.getElementById("block");
    //按钮控制滑块
    //进行if判断
    // if (strip.value >= 1 && strip.value <= 20) {
        strip.value--;
        slide();
    // }
}

function plus() {
    //获取value值
    var strip = document.getElementById("block");
    //判断
    // if (strip.value >= 4 && strip.value <= 18) {
        strip.value++;
        slide();
    // } else {
    //     alert("回家写作业吧？")
    // }
}
//计算杀手人数,分配身份.
function allocation() {
    // 获取input框的value值
    var input = document.getElementById("value");
    var killer = document.getElementById("killer");
    var people = document.getElementById("people");
    //获取杀手的人数
    if (input.value < 14) {
        killer.value = Math.floor(input.value / 3);
    } else {
        killer.value = Math.floor((input.value - 1) / 3);
    }
    // 用input输入框的值减去杀手人数
    people.value = input.value - killer.value;
    //设置空数组
    var kill = [];
    //for循环分配身份
    for (var i = 0; i < killer.value; i++) {
        kill[i] = "杀手";
    }
    //空数组
    var peo = [];
    //for循环分配身份
    for (var p = 0; p < people.value; p++) {
        peo[p] = "平民";
    }
    //合并身份
    color = kill.concat(peo);
    //上传杀手与平民的人数。好进行计算。
    sessionStorage.setItem("kill",kill.length);
    sessionStorage.setItem("peo",peo.length);
}
//点击事件
function obtainf() {
    //洗牌算法函数.
    allocation();
    function shuffleArray(color) {
        var color = color.slice();
        var len = color.length;
        var temp, random_index;
        while (len != 0) {
            random_index = Math.round(0 + (len - 1 - 0) * Math.random());
            temp = color[random_index];
            color[random_index] = color[len - 1];
            color[len - 1] = temp;
            --len;
        }
        console.log(color);
        localStorage.setItem("data",color);
        return color;
    }
    shuffleArray(color);
    //洗牌算法函数在点击事件内运行
    //本地跳转
    window.location.href="../html/check-identity.html"
}
function back() {
    window.location.href="../html/index.html"
}
