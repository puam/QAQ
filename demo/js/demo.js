// var cat={
//     number:1,
//     say:{
//         number:2,
//         fn:function () {
//             console.log(this.number);
//         }
//     }
// };
// cat.say.fn();
// function Fn(){
//     this.user = "追梦子";
// }
// var a = new Fn();
// console.log(a.user);
var c={
    name:"崔西",
};


// var k={
//     number:2,
//     say:{
//         number: 2,
//         v:{
//             number:3,
//             fn:function () {
//                 console.log(this.number);
//             }
//         }
//     }
// };
// var b={
//     number:5,
// };
// k.say.v.fn();
// k.say.v.fn.call(b);
// k.say.v.fn.apply(b);
// k.say.v.fn.bind(c);

var test={
    number:2,
    say:{
        number:3,
        fn:function () {
            console.log(this.number);
        }
    }
};
test.say.fn()

var demo={
    number:2,
    demo1:{
        number:3,
        fn:function () {
            console.log(this.number);
            console.log(this);//window;
        }
    }
};
var z=test.say.fn;
function fn() {
    this.user="王浩冉"
}
var a=new fn();
console.log(a.user);