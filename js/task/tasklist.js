function gettasklist(typeId){
	$.ajax({
        type: "GET",
        url: server + "/tasks/" + typeId.toString() + "?token=" + $.cookie("token"),
        data: null,
        dataType: "json",
        contentType:"application/json",
        success: succFunction,
        error : errFunction
    });	
    function succFunction(response){
        if (response["errorCode"]==0){
            gettasktable(response);	
        }
        else if (response["errorCode"] == 20002){
			alert("登录已失效，请重新登录");
			window.location.href = "index.html";
        }
        else {
        	alert(response["errorInfo"]);
        }
    }
    function errFunction(response){
        alert("获取推断调控网络任务列表失败");
    }
}

function gettasktable(response){
	//make the data
	var data = response["data"];
	//make table head
	var table = "<table id=\"tasktable\" class=\"table table-striped table-advance table-hover\"><thead><tr>";
	table = table + "<th><i class=\"fa fa-bullhorn\"></i> Task_Id</th>";
	table = table + "<th><i class=\"fa fa-question-circle\"></i> Task_Type</th>";
	table = table + "<th><i class=\" fa fa-edit\"></i> Status</th>";
	table = table + "<th><i class=\" fa fa-edit\"></i> Create_Time</th>"
	table = table + "<th><i class=\" fa fa-edit\"></i> Update_Time</th>";
	table = table + "<th> </th></tr></thead>"
	//make table body
	table = table + "<tbody>";
	for (var record in data){
		table = table + gettaskrecord(data[record]);
	}
	table = table + "</tbody></table>";
	document.getElementById("tasklisttable").innerHTML= table;
	
	
//	for (var record in data){
//		tr = document.getElementById("tasktable").getElementsByTagName("tr");
//		var column_index = parseInt(record) + 1;
//		td = tr[column_index].getElementsByTagName("td")[5];
//		downUrl = server + "/file/download/" + column_index.toString() + "?token=" + $.cookie("token");
//		htmlString = "<a href=\"" + downUrl + "\">";
//		htmlString = htmlString + "<span class=\"label label-success label-mini\">Download</span></a>";
//		
//		td.innerHTML = htmlString;
//	}


}

function gettaskrecord(taskInfo){
	var record = "<tr>";
	record = record + "<td> " + taskInfo.id.toString() + "</td>";
	record = record + "<td> " + taskInfo.taskTypeName + "</td>";
	record = record + "<td> " + taskInfo.statusCode + "</td>";
	record = record + "<td> " + taskInfo.createTime + "</td>"; 
	record = record + "<td> " + taskInfo.updateTime + "</td>";
	record = record + "<td>";
	if (taskInfo.status == 10){
		record = record + "<button onclick=\"javascript:starttask(" + taskInfo.id.toString() + ");\" class=\"btn btn-success  btn-sm\"><i class=\" fa fa-check\">Start</i></button>";
	}
	if (taskInfo.status == 10){
		record = record + "<button onclick=\"javascript:setCookie(" + taskInfo.id.toString() + ");\" class=\"btn btn-info  btn-sm\" data-toggle=\"modal\" data-target=\"#changeTaskModal\"><i class=\"fa fa-pencil\">Info</i></button>";
	}
	if (taskInfo.status == 40){
		record = record + "<button class=\"btn btn-warning  btn-sm\"><i class=\"fa fa-pencil\">Error</i></button>";
	}
	if (taskInfo.status !== 20){
		record = record + "<button onclick=\"javascript:deletetask(" + taskInfo.id.toString() + ");\"class=\"btn btn-danger  btn-sm\"><i class=\"fa fa-trash-o \">Delete</i></button>";
	}
	record = record + "</td>";
	record = record + "</tr>";
	return record;
}


function starttask(taskId){
	$.ajax({
		type:"GET",
		url: server + "/tasks/start/" + taskId.toString() + "?token=" + $.cookie("token"),
		async:true,
		data: null,
        dataType: "json",
        contentType:"application/json",
        success: succFunction,
        error : errFunction
    });
	function succFunction(response){
        if (response["errorCode"]==0){
            alert("任务开始运行");
            window.location.reload(true);
        }
        else if (response["errorCode"] == 20002){
			alert("登录已失效，请重新登录");
			window.location.href = "index.html";
        }
        else {
        	alert(response["errorInfo"]);
        }
    }
    function errFunction(response){
        alert("开始任务失败");
    }
}

function deletetask(taskId){
	$.ajax({
		type:"DELETE",
		url: server + "/tasks/delete/" + taskId.toString() + "?token=" + $.cookie("token"),
		async:true,
		data: null,
        dataType: "json",
        contentType:"application/json",
        success: succFunction,
        error : errFunction
    });
	function succFunction(response){
        if (response["errorCode"]==0){
            alert("任务已删除");
            window.location.reload(true);
        }
        else if (response["errorCode"] == 20002){
			alert("登录已失效，请重新登录");
			window.location.href = "index.html";
        }
        else {
        	alert(response["errorInfo"]);
        }
    }
    function errFunction(response){
        alert("删除任务失败");
    }
}

function setCookie(taskId){
	$.cookie("task_now", taskId, {path:"/"});
}
