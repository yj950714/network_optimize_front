function getfilelist(){
	$.ajax({
        type: "GET",
        url: server + "/user/files?token=" + $.cookie("token"),
        data: null,
        dataType: "json",
        contentType:"application/json",
        success: succFunction,
        error : errFunction
    });	
    function succFunction(response){
        if (response["errorCode"]==0){
            getfiletable(response);	
        }
        else if (response["errorCode"] == 20002){
			alert("登录已失效，请重新登录");
			window.location.href = "login.html";
        }
        else {
        	alert(response["errorInfo"]);
        }
    }
    function errFunction(response){
        alert("获取文件列表失败");
    }
}

function getfiletable(response){
	//make the data
	var data = response["data"];
	nowIndex = 0;
	//make table head
	var table = "<table id=\"filetable\" class=\"table table-striped table-advance table-hover\"><thead><tr>";
	table = table + "<th><i class=\"fa fa-bullhorn\"></i> File Id</th>";
	table = table + "<th><i class=\"fa fa-question-circle\"></i> File Type</th>";
	table = table + "<th><i class=\" fa fa-edit\"></i> File Name</th>";
	table = table + "<th> File Size</th>";
	table = table + "<th><i class=\" fa fa-edit\"></i> Update Time</th></tr></thead>";
	//make table body
	table = table + "<tbody>";
	for (var record in data){
		nowIndex = nowIndex + 1;
		table = table + getrecord(nowIndex, data[record]);
	}
	table = table + "</tbody></table>";
	document.getElementById("testaaaa").innerHTML= table;
	
	$('#filetable').Tabledit({
    	url: 'example.php',
    	autoFocus: true,
    	columns: {
        	identifier: [0, 'File Id'],
       		editable: [[2, 'File Name']]
    	}
	});

}

function getrecord(Id, fileInfo){
	var record = "<tr>";
	record = record + "<td> " + Id.toString() + "</td>";
	record = record + "<td> " + fileInfo.fileTypeName + "</td>";
	record = record + "<td> " + fileInfo.fileNameToUser + "</td>";
	record = record + "<td> " + (parseFloat(fileInfo.fileSize)/1024.0).toFixed(2).toString() + "KB </td>";
	record = record + "<td> " + fileInfo.updateTime + "</td>";
	record = record + "</tr>";
	return record;
}
