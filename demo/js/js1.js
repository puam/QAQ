function button() {
   var z= document.getElementById("one");
   var c= document.getElementById("two");
   console.log(z.value,c.value);
   if (z.value == null ||c.value == null ){
       alert("空值");
   } else {
       alert("成功");
   }
}