$.fn.sencondPageControl=function(pageid){
	console.log(pageid)
	switch (pageid){
		case "modifyUserInfoPage-student":
			$("#modifyUserInfoPage-student").find("input").val("")
			$("#modifyUserInfoBtn-student").unbind("click").bind("click",function(){ 
				if($("#userName-student").val()!=""){
					if($("#desShort-student").val()!=""){
						var studentInfo=new Object;
						studentInfo.command="modStudentProfile";
						studentInfo.openid=$.wxData().openid;
						studentInfo.userName=$("#userName-student").val();
						studentInfo.desLong=$("#desShort-student").val();
						$.theAjax.post(studentInfo,function(res){
							if(res.result=="success"){
								alert("更新学生信息成功！");
								$.theData.uploadStudent(function(){
									$("#name").html($.theData.student.userName);
									$("#longDes").html($.theData.student.desLong);
								});
							}
							else{
								alert("更新学生信息失败！请重新尝试");
							}
						},null)
					}
					else{
						alert("请填写您的简介！")
					}
				}
				else{
					alert("请填写您的姓名！")
				}
			})
			break;
		default:
			break;
	}
	return this;
}
