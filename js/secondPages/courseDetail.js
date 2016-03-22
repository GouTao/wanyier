function courseDetail(data){
	//console.log(data);
	$("#courseDetail_courseName").html(data.courseName);
	$("#courseDetail_courseType").html(data.courseType);
	$("#courseDetail_courseLength").html(data.courseLength+"学时");
	$("#courseDetail_price").html(Number(data.price)/100+" 元");
	$("#courseDetail_time").html(data.time);
	$("#courseDetail_note").html(data.note);
	$("#courseDetail_teacher").html(data.teacherInfo.userName);
	$("#courseDetail_teacherShort").html(data.teacherInfo.desShort);
	$("#courseDetail_teacherLong").html(data.teacherInfo.desLong);
	if(data.trail!="none"){
		$("#courseDetail_callBtn").css("display","block");
		$("#courseDetail_callBtn").attr("href","tel:"+data.teacherInfo.phoneNum);
	}
	$('#courseDetail_buyBtn').unbind("click").bind("click",function(){
		var buyInfo=new Object;
		buyInfo.command="addCourseOrder";
		buyInfo.courseId=data._id;
		buyInfo.openid=$.wxData().openid;
		$.theAjax.post(buyInfo,function(res){
			console.log(res);
		},null);
	})
}
