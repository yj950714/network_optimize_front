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
			window.location.href = "index.html";
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
	//make table head
	var table = "<table id=\"filetable\" class=\"table table-striped table-advance table-hover\"><thead><tr>";
	table = table + "<th><i class=\"fa fa-bullhorn\"></i> File_Id</th>";
	table = table + "<th><i class=\"fa fa-question-circle\"></i> File_Type</th>";
	table = table + "<th><i class=\" fa fa-edit\"></i> File_Name</th>";
	table = table + "<th> File_Size</th>";
	table = table + "<th><i class=\" fa fa-edit\"></i> Update_Time</th>";
	table = table + "<th> </th></tr></thead>"
	//make table body
	table = table + "<tbody>";
	for (var record in data){
		table = table + getrecord(data[record]);
	}
	table = table + "</tbody></table>";
	document.getElementById("filelisttable").innerHTML= table;
	
	
	$('#filetable').Tabledit({
    	url: server + "/user/files?token=" + $.cookie("token"),
    	autoFocus: true,
    	restoreButton: false,
    	columns: {
        	identifier: [0, 'File_Id'],
       		editable: [[2, 'File_Name']]
    	},
    	onSuccess: function(data, textStatus, jqXHR){
    		if (data["errorCode"] != 0){
    			if (response["errorCode"] == 20002){
					alert("登录已失效，请重新登录");
					window.location.href = "index.html";
        		}
    			else {
    				alert(data["errorInfo"]);
    			}
    		} else {
    			window.location.reload(true);
    		}
    	}
	});
	
	for (var record in data){
		tr = document.getElementById("filetable").getElementsByTagName("tr");
		var column_index = parseInt(record) + 1;
		td = tr[column_index].getElementsByTagName("td")[5];
		downUrl = server + "/file/download/" + column_index.toString() + "?token=" + $.cookie("token");
		htmlString = "<a href=\"" + downUrl + "\">";
		htmlString = htmlString + "<span class=\"label label-success label-mini\">Download</span></a>";
		
		td.innerHTML = htmlString;
	}


}

function getrecord(fileInfo){
	var record = "<tr>";
	record = record + "<td> " + fileInfo.fileIdToUser.toString() + "</td>";
	record = record + "<td> " + fileInfo.fileTypeName + "</td>";
	record = record + "<td> " + fileInfo.fileNameToUser + "</td>";
	record = record + "<td> " + (parseFloat(fileInfo.fileSize)/1024.0).toFixed(2).toString() + "KB </td>";
	record = record + "<td> " + fileInfo.updateTime + "</td>";
	record = record + "<td> " + "<span class=\"label label-success label-mini\">Download</span>" + "</td>";
	record = record + "</tr>";
	return record;
}
