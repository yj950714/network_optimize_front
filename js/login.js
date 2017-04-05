function login(){
    var userName = $("#userName").val();
    var password = $("#password").val();
    $("#userName").val("");
    $("#password").val("");
    var datas = {"userName" : userName, "password" : password};
    $.ajax({
        type: "POST",
        url: "http://www.sjtuimap.com/network_optimize/user/get_token",
        data: JSON.stringify(datas),
        dataType: "json",
        contentType:"application/json",
        success: succFunction,
        error : errFunction
    });	
    function succFunction(response){
        var jsons = eval(response);
        if (jsons["errorCode"]!==0){
            alert(jsons["errorInfo"]);	
        }
        else{
            $.cookie("token", jsons["token"], {path:"/"});
            $.cookie("realName", jsons["realName"], {paht:"/"});
            window.location.href = "index.html"
        }
    }
    function errFunction(response){
        alert("服务器错误！");
    }
}

function forgetPassword(){
    var email = $("#email").val();
    $("#email").val("");
    var datas = {"email" : email};
    $.ajax({
        type: "POST",
        url: "http://www.sjtuimap.com/network_optimize/user/forget_password",
        data: JSON.stringify(datas),
        dataType: "json",
        contentType:"application/json",
        success: succFunction,
        error : errFunction
    }); 
    function succFunction(response){
        var jsons = eval(response);
        if (jsons["errorCode"]!==0){
            alert(jsons["errorInfo"]);  
        }
        else{
            alert("重置密码邮件已发送，请在注册邮箱查收");
            window.location.href = "login.html"
        }
    }
    function errFunction(response){
        alert("找回密码失败！");
    }
}
