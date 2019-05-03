//
// //AJAX同步。
// //构造函数实例化一个对象
// var xhr=new XMLHttpRequest();
// //启动请求，三个参数，get获取参数的方式，指定文件在这个服务器的位置，第三个false，就是同步，默认是ture。。
// xhr.open("get","xxx.jsp",false);
// //send方法，要发出去的参数。
// xhr.send(null);
//
// //status,相应http在状态码
// if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ){
//    alert(xhr.responseText);
//    //responseText,响应所返回的文本。
// }else {
//    alert("Requst was unsuccessful:"+xhr.status);
// }
//
//

//异步。
//实例化对象
// var xhr=new XMLHttpRequest();
//open方法来启动请求，true表示异步，get获取的方法，xxx指定文件在这个服务器的位置。
// xhr.open("get","xxx.jsp",true);
//接受一个参数，null没有。去请求服务器。
// xhr.send(null);
//onreadystatechange 查看请求状态变化的调用事件。
// xhr.onreadystatechange=function () {
//readyState 获取请求的状态，如果==4，就代表完成了。3的话接收中，2 调用send，还没有响应。1的话。open正在启动。0，初始化。
// if (xhr.readyState == 4){
//    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
//       alert(xhr.responseText);
//    }else {
//       alert("Request was unsuccessful:" + xhr.status);
//如果，readyState不能4，返回 http状态码
// }
// }
// };

// //jquery常用参数。
//
// $.ajax({
//    url:"xxx.jsp",//表示要请求的url地址
//    type:"get",//表示他要是使用的http方法，type是字符串。get不区分大小写。
//    data:{t:"sd"},//data是需要传递的查询参数。{t:“sd}，可能是别的什么数据类型。具体看接口怎么定的，我们怎么去传。
//    datatype:"json",//标识出被响应的所返回的数据类型，常见xml，html，json，text。
//    success:function (data) {
//       //success 响应的状态码，如果是成功的时候就调用这个函数。
//       $("#content").text(data);
//    }
// });
//
//
// //更简化版的ajax请求,相当于$.ajax({});//这里我们只需要知道，url，data，和success
// $.get("// xxx:jsp",{t: "sd" },function (data) {alert(data)});
// $.post("// xxx:jsp",{t:"sd"},function (data) {alert(data)});


//json格式
// var data={
//    a:"one",
//    b:"1",
//    c:[1,2,3,4],
//    d:{name:"崔浩然"},
//    e:true,
//    f:null,
//    g:undefined,
// };
// Json数据转化。
// 把对象转化为JSON格式的序列字符串。
// JSON.stringify(data);
// JSON.parse('{"a":"one","b":"1","c":[1,2,3,4],"d":{"name":"崔浩然"},"e":true,"f":null}');
//
// 怎么去跨域。
//点击事件
// $('#btn').click(function () {
//     $.getJSON("http://api.qingyunke.com/api.php", {
//         key: "free",
//         appid: 0,
//         msg: $('#question').val()
//         }, function (data) {
//         $('#answer').text(data.content);
//    })
// });
// var susu = document.getElementById("question");
// function btns() {
//     console.log(susu.value);
// }
//
//return
function test() {
    for (var i=0; i<10; i++){
       if (i == 5){
           continue
       }
       console.log(i);
    }
}
test();