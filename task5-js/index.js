function logIn() {
    var name = document.getElementById('user').value;
    var pwd = document.getElementById("passWord").value;
    console.log(name);
    console.log(pwd);
    //实例化的对象
    // var xhr =new XMLHttpRequest();
    if ((name === null || name === "" || name === undefined)|| ( pwd === null || pwd === undefined || pwd === "")){
        alert("请输入用户名，或密码");
    } else {
        var xhr=new XMLHttpRequest();
        //onreadystatechange根据http状态码变化所变化的事件。
        xhr.onreadystatechange=function () {
            // readyState,请求的状态。xhr.status,http请求状态码。
            if (xhr.readyState==4){
                if ((xhr.status >=200 && xhr.status<300) || xhr.status == 304) {
                    console.log(xhr.responseText);
                }else {
                    alert("请求失败："+xhr.readyState);
                }
            }
        };
        xhr.open("post"," /carrots-admin-ajax/a/login",true);
        //url,后台地址加，登陆请求地址。
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded,charset=uff-8");//使用send方法传送参数的时候，需要设定
        //content-type头的信息，模拟http post方法发送一个表单。这样服务器才知道我们要发送的什么？
        xhr.setRequestHeader("Accept", "application/json,text/plain,*/*");//服务器向我们发送的。
        xhr.send('name='+name+'&pwd='+pwd);//json格式的数据
    }

}