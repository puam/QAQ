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
//创建一个空数组,里面放入死掉的人的信息.
function array(){
    //death死亡数组，civilian存放死亡的平民，slayer存放死亡的杀手。
    var death = [[]];
    sessionStorage.setItem("death", JSON.stringify(death));
    var civilian=[];
    sessionStorage.setItem("civilian",JSON.stringify(civilian));
    var slayer=[];
    sessionStorage.setItem("slayer",JSON.stringify(slayer));
}
//函数放外面
box();
array();
// civilianArray();
function start() {
    window.location.href="../html/start-game.html"
}
function back() {
    window.location.href="../html/check-identity.html";
}