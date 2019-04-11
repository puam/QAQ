function demo() {
    //检测数据类型。
    var arr = [1, 2, 3, 4, 5, 6];
    //parseInt（）;把字符串变为余数，如果有小数向下取值

    //和parseInt一样，但是会保留小数，parseFloat();
    // String();数据类型转化为字符串。
    //number（）；转化为数字。
    // let obj = {};
//Number
    for (var i=0;i<arr.length;i++) {
        let book = {
            oje: {
                name: "小明",
                lastName: "10cm",
                rmb: "200",
            }
        };
        console.log(book);
    }
}

// alert(cat1 instanceof Cat);
// alert(box1 instanceof Box); //很清晰的识别他从属于Box
// 复制代码

// 建立哦demo
// 如果建立工厂模式
// cat();
// function cat(name,color,age) {
//     var obj = new Object();
//     obj.name=name;
//     obj.color=color;
//     obj.age=age;
//     obj.test=function () {
//         return this.name+this.color+this.age+"郑州分院";
//     };
//     return obj;
// }
// var cat1=cat("大白","white");
// console.log(cat1);
// alert(cat1.test());
//
// function Box(name, age) { //构造函数模式
//     this.name = name;
//     this.age = age;
//     this.run = function () {
//         return this.name + this.age + '运行中...';
//     };
// }
// var box1 = new Box('Lee', 100); //new Box()即可
// var box2 = new Box('Jack', 200);
// alert(box1.run());
// alert(box1 instanceof Box); //很清晰的识别他从属于Box
//
// function cat(name,age,color) {
//     var obj = new Object();
//     obj.name=name;
//     obj.age=age;
//     obj.color=color;
//     obj.test=function () {
//         return this.name+this.age+this.color+"这是对象"
//     };
//     return obj;
// }
// var cat1=cat("大白","11","white");
// alert(cat1.test());
// console.log(cat1);

// function cat(name,color) {
//     var cat=new Object();
//     cat.name=name;
//     cat.color=color;
//     cat.run=function () {
//         return this.name+this.color+"这是字符串";
//     };
//     return cat
// }
// var cat1=cat("小白","blue");
// console.log(cat1);
// // alert(cat1.run());
// alert(cat1.run());

function cat(name,age) {
    this.name=name;
    this.age=age;
    this.run = function () {
        return this.name +this.age+"运行中";
    };
}
var cat1= new cat("小猫",11);
console.log(cat1);
alert(cat1.run());

var  x=[1,2,3];
alert(x instanceof Array );

// function Box(name, age) { //构造函数模式
//     this.name = name;
//     this.age = age;
//     this.run = function () {
//         return this.name + this.age + '运行中...';
//     };
// }
// var box1 = new Box('Lee', 100); //new Box()即可
// var box2 = new Box('Jack', 200);
// alert(box1.run());
// alert(box1 instanceof Box); //很清晰的识别他从属于Box