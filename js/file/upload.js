$(function(){
	$('#uploadFiles').Huploadify({
		auto:false,
		fileTypeExts:'*.jpg;*.png;*.exe;*.pdf',
		multi:true,
		method:'post',
		formData:null,
		fileSizeLimit:51200,
		showUploadedPercent:true,
		showUploadedSize:false,
		removeTimeout:9999999,
		uploader:server + "/file/upload?token=" + $.cookie("token"),
		onUploadStart:function(){
			},
		onInit:function(){
			},
		onUploadComplete:function(file, data){
				response = JSON.parse(data);
				if (response["errorCode"] == 0){
					alert("上传成功");
				}
				else{
					if (response["errorCode"] == 20002){
						alert("登录已失效，请重新登录");
						window.location.href = "login.html";
					}
					else {
						alert(response["errorInfo"]);
					}
				}
			},
		onDelete:function(file){
				console.log('删除的文件：'+file);
				console.log(file);
			},
		onUploadError:function(file,data){
				alert(data);
			}
		});
	});