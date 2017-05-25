function getdropdownmenu(filetype, divname){
	var menu = "<select class=\"btn btn-default dropdown-toggle\" id=\"" + divname + "select\">";
	$.ajax({
        type: "GET",
        url: server + "/user/files/" + filetype.toString() +"?token=" + $.cookie("token"),
        data: null,
        dataType: "json",
        async : true,
        contentType:"application/json",
        success: succFunction
    });	
    function succFunction(response){
        if (response["errorCode"]==0){
        	var data = response["data"];
        	if (filetype == 7){
	        	menu = menu + "<option value=\"" + "99998" + "\">" + "yeast" + "</option>";
    	    	menu = menu + "<option value=\"" + "99999" + "\">" + "E.coil" + "</option>";
        	}
        	if (filetype == 9){
	        	menu = menu + "<option value=\"" + "99997" + "\">" + "yeast" + "</option>";
    	    	menu = menu + "<option value=\"" + "99996" + "\">" + "E.coil" + "</option>";
        	}
        	for (var record in data){
            	menu = menu + "<option value=\"" + data[record].id.toString() + "\">" + data[record].fileNameToUser + "</option>";
            }
            menu = menu + "</select>";
            document.getElementById(divname).innerHTML = menu;
        }
        else if (response["errorCode"] == 20002){
			alert("登录已失效，请重新登录");
			window.location.href = "index.html";
        }
        else {
        	alert(response["errorInfo"]);
        }
    }
}
