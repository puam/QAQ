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
                    alert(xhr.readyState);
                }else {
                    alert("请求失败："+xhr.readyState);
                }
            }
        }
    }
    //open方法启动ajax，url要请求的接口地址。true，异步请求。
    xhr.open("post"," /carrots-admin-ajax/a/login",true);
    var data="name"+encodeURIComponent(name)+"pwd"+encodeURIComponent(pwd);
    xhr.send(data);
}