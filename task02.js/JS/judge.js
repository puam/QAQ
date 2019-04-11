//取出浏览器的值
var get = JSON.parse(sessionStorage.getItem("list"));

//对象转换数组。
// var arr = Object.keys(get);
var typeface = "号";
//创建一个函数
function box() {
    //给id选择器使用。
    for (let i = 0; i < get.length; i++) {
        let div = (`<div class="game-box"><div class="role">${get[i].name}</div>
                    <div class="number">${i+1}${typeface}</div></div>`
        );
        console.log(div);
        //用jQuery模板渲染html
        $("#gaine").append(div);
    }
}
//函数放外面
box();
function start() {
    window.location.href="../html/start-game.html"
}
function back() {
    window.location.href="../html/check-identity.html";
}