function addoptimizetask(){
	var fileone = $("#mixnetworkmenuselect option:selected");
	var postdata = {"taskType" : 3,
				"fileIdList" : [parseInt(fileone.val())],
				"paramIdList" : [],
				"paramValueList" : []};
	$.ajax({
        type: "POST",
        url: server + "/tasks/add" + "?token=" + $.cookie("token"),
        data: JSON.stringify(postdata),
        dataType: "json",
        timeout: 3000,
        async : false,
        contentType:"application/json",
        success: succFunction,
    });	
	function succFunction(response){
        if (response["errorCode"]==0){
        	alert("新建任务成功");
        	window.location.reload(true);
    	}
        else {
        	alert(response["errorInfo"]);
        }
    }
}

function changeoptimizetask(){
	var fileone = $("#mixnetworkchangemenuselect option:selected");
	var postdata = {"taskId" : parseInt($.cookie("task_now")),
				"fileIdList" : [parseInt(fileone.val())],
				"paramIdList" : [],
				"paramValueList" : []};
	$.ajax({
        type: "POST",
        url: server + "/tasks/change" + "?token=" + $.cookie("token"),
        data: JSON.stringify(postdata),
        dataType: "json",
        timeout: 3000,
        async : false,
        contentType:"application/json",
        success: succFunction,
    });	
	function succFunction(response){
        if (response["errorCode"]==0){
        	alert("修改任务参数成功");
        	window.location.reload(true);
    	}
        else {
        	alert(response["errorInfo"]);
        }
    }
}

function addintegretedtask(){
	var fileone = $("#regularnetworkdatamenuselect option:selected");
	var filetwo = $("#metabolicnetworkdatamenuselect option:selected");
	var postdata = {"taskType" : 2,
				"fileIdList" : [parseInt(fileone.val()), parseInt(filetwo.val())],
				"paramIdList" : [],
				"paramValueList" : []};
	$.ajax({
        type: "POST",
        url: server + "/tasks/add" + "?token=" + $.cookie("token"),
        data: JSON.stringify(postdata),
        dataType: "json",
        timeout: 3000,
        async : false,
        contentType:"application/json",
        success: succFunction,
    });	
	function succFunction(response){
        if (response["errorCode"]==0){
        	alert("新建任务成功");
        	window.location.reload(true);
    	}
        else {
        	alert(response["errorInfo"]);
        }
    }
}

function changeintegretedtask(){
	var fileone = $("#regularnetworkdatachangemenuselect option:selected");
	var filetwo = $("#metabolicnetworkdatachangemenuselect option:selected");
	var postdata = {"taskId" : parseInt($.cookie("task_now")),
				"fileIdList" : [parseInt(fileone.val()), parseInt(filetwo.val())],
				"paramIdList" : [],
				"paramValueList" : []};
	$.ajax({
        type: "POST",
        url: server + "/tasks/change" + "?token=" + $.cookie("token"),
        data: JSON.stringify(postdata),
        dataType: "json",
        timeout: 3000,
        async : false,
        contentType:"application/json",
        success: succFunction,
    });	
	function succFunction(response){
        if (response["errorCode"]==0){
        	alert("修改任务参数成功");
        	window.location.reload(true);
    	}
        else {
        	alert(response["errorInfo"]);
        }
    }
}

function addtrninferencetask(){
	var files = $("#expressiondatamenuselect option:selected");
	var postdata = {"taskType" : 1,
				"fileIdList" : [parseInt(files.val())],
				"paramIdList" : [],
				"paramValueList" : []};
	$.ajax({
        type: "POST",
        url: server + "/tasks/add" + "?token=" + $.cookie("token"),
        data: JSON.stringify(postdata),
        dataType: "json",
        timeout: 3000,
        async : false,
        contentType:"application/json",
        success: succFunction,
    });	
	function succFunction(response){
        if (response["errorCode"]==0){
        	alert("新建任务成功");
        	window.location.reload(true);
    	}
        else {
        	alert(response["errorInfo"]);
        }
    }
}

function changetrninferencetask(){
	var files = $("#expressiondatachangemenuselect option:selected");
	var postdata = {"taskId" : parseInt($.cookie("task_now")),
				"fileIdList" : [parseInt(files.val())],
				"paramIdList" : [],
				"paramValueList" : []};
	$.ajax({
        type: "POST",
        url: server + "/tasks/change" + "?token=" + $.cookie("token"),
        data: JSON.stringify(postdata),
        dataType: "json",
        timeout: 3000,
        async : false,
        contentType:"application/json",
        success: succFunction,
    });	
	function succFunction(response){
        if (response["errorCode"]==0){
        	alert("修改任务参数成功");
        	window.location.reload(true);
    	}
        else {
        	alert(response["errorInfo"]);
        }
    }
}

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
        else {
        	alert(response["errorInfo"]);
        }
    }
}
