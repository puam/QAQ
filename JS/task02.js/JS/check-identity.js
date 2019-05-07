//取出浏览器保存的值，设置为常量方便使用。
z=localStorage.getItem("data");
zz=z.split(",",);//清除字符串符号.
console.log(zz);
//默认一张显示一张隐藏。
document.getElementById("show").style.display="block";
document.getElementById("conceal").style.display="none";
//默认让查看角色的隐藏
document.getElementById("role").style.visibility="hidden";
//默认隐藏提示技巧
document.getElementById("sports").style.visibility="hidden";
//设置x为常量
 click=0;
//隐藏角色。
$("#clicks").click(function () {
    //计算点击次数的表达式。
    click = click + 1;
    console.log(click);
    //向上取整。点击一次的话，默认把点击次数的值加1，取整第一个值是1。
    var a=(click+1)/2;
    console.log(a);
   $("#num").get(0).innerHTML=Math.ceil(a);

   //点击次数+2，来计算查看身份的值。
    var button=(click+2)/2;
    //向下取值之后，奇数查看，偶数传递。
    var fetch=$("#clicks").get(0).innerHTML=Math.ceil(button);
    console.log(fetch);


    //查看身份计算。把浏览器存值变为，数组之后。点击两次获取的下标必须一致，隐藏一个。
    var number=click/2;
    var identity=(number).innerHTML=Math.floor(number);
    console.log(identity);
    $("#role").get(0).innerHTML=zz[identity];
    console.log(identity);

    //一个学渣对数学余数的理解就是，如果除不尽的数就会在这个表达式上面余上一位这样的话。就是奇数，如果不然则是偶数。if判断。
    if (click % 2 == 0) {
        //图片消失隐藏
        $("#show").show();
        $("#conceal").hide();
        //为偶数的时候，显示隐藏传递的玩家数字
        $("#clicks").text("查看"+fetch+"号身份");
        //为偶数的时候角色隐藏
        document.getElementById("role").style.visibility="hidden";
        //为偶数的时候角色隐藏
        document.getElementById("sports").style.visibility="hidden";
    } else {
        //图片消失隐藏
        $("#show").hide();
        $("#conceal").show();
        //为奇数的时候，显示隐藏传递的玩家数字
        $("#clicks").text("隐藏并传递给"+fetch+"号");
        //为奇数的时候显示角色
        document.getElementById("role").style.visibility="visible";
        //为奇数的时候显示提示
        document.getElementById("sports").style.visibility="visible";
    }
    //if判断，点击次数的长度是数组的两倍，所以，给数组长度-1.
    if (click===2*zz.length-1){
        $("#clicks").text("法官查看");
        window.location.href="../html/judge.html"
    }
    var gather=[];
    for (let i=0; i<zz.length;i++){
        gather.push({name:zz[i],number:i+1,state:1,class:"live",button:"allow",triangle:"colour"});
        //push进去一个数组，存放死掉的对象的信息。
    }

    // 把对象通过JSON的方式存入浏览器。
    sessionStorage.setItem("list",JSON.stringify((gather)));
});
$("#return").click(function () {
   window.location.href="../html/allocation-game.html";
});