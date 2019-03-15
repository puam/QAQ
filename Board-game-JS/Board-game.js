//点击事件
document.getElementById("value").value = 4;

function obtainf() {
    //获取输入框与滑块的value值；
    var input = document.getElementById("value").value;
    var strip = document.getElementById("block");
    //判断输入框的值是否满足条件
    if (input >= 4 && input <= 18) {
        strip.value = input;
    } else {
        alert("请输入正确的玩家数量")
    }
    allocation();
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
    //进行if判断
    if (strip.value >= 1 && strip.value <= 20) {
        strip.value--;
        slide();
    }
}

function plus() {
    //获取value值
    var strip = document.getElementById("block");
    //判断
    if (strip.value >= 4 && strip.value <= 18) {
        strip.value++;
        slide();
        console.log(strip.value);
    } else {
        alert("回家写作业吧？")
    }
}

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
    var role = kill.concat(peo);
    console.log(role);
}

function shuffle() {
    var input = document.getElementById("value");
    var arr = new Array(input.value);
    for (var x = 0; x < input.value; x++) {
        arr[x]=x;
    }
    var arr2=new Array();
    for (var x=input.value;x>0;){
        var rnd=Math.floor()
    }

}
