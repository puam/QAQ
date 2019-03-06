//定时器绑定点击事件。
var a;
var z=document.getElementsByClassName('box');
function start() {
    window.clearTimeout(a);
  a= window.setInterval(bg, 1000);
   //刷新速度
}
function over() {
    window.clearTimeout(a);
    choose();
}
//颜色盒子
function choose() {
    var su=document.getElementsByClassName('box');
    for (var i=0;i<9;i++) {
        su[i].style.background="rgb(255,193,37)";
    }
    var z=document.getElementsByClassName('box');
    for (var i=0;i<9;i++) {
        z[i].style.background="rgb(255,193,37)";
    }
}
function bg() {
    //运行洗牌算法
    function shuffle() {
        //生成9张牌
        var arr = new Array(9);
        for (var i=0; i<9; i++) {
            arr[i] = i;
        }
        //每次抽出一张牌，放在另一堆。因为要在数组里抽出元素，把后面的所有元素向前拉一位，所以很耗时。
        var arr2 = new Array();
        for (var i=9; i>0; i--) {
            var rnd = Math.floor(Math.random()*i);
            arr2.push(arr[rnd]);
            arr.splice(rnd,1);
        }
        return arr2;
        //数组的返回值
    }
    var x=shuffle();
    //生成颜色
    //运行洗牌算法
    // var z=document.getElementsByClassName('box');
    // for (var i=0;i<9;i++) {
    //     z[i].style.background="rgb(255,193,37)";
    // }
    choose();
    z[x[0]].style.background=color();
    z[x[1]].style.background=color();
    z[x[2]].style.background=color();
}
//生成rbg颜色
function color() {
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return"rgb("+r+','+g+','+b+")";
    //取回返回值
}
