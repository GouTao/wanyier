function paidCourseDetail(data){
	var isTrail=true;
	$("#paidCourseDetail_courseName").html(data.courseName);
	$("#paidCourseDetail_courseType").html(data.courseType);
	$("#paidCourseDetail_courseLength").html(data.courseLength+"学时");
	$("#paidCourseDetail_price").html(Number(data.price)/100+" 元");
	$("#paidCourseDetail_time").html(data.time);
	$("#paidCourseDetail_note").html(data.note);
	console.log(data.trail)
	if(data.trail=="none"){
		isTrail=false;
		$("#paidCourseDetail_trail").html("否");
	}
	else{
		$("#paidCourseDetail_trail").html(data.trail);
	}
	if(data.state==3){
		$("#paidCourseDetail_status").html("上课中");
	}
	else if(data.state==4){
		$("#paidCourseDetail_status").html("已退款");
		$("#paidCourseDetail_callBtn").css("display","none");
	}
	else if(data.state==9){
		$("#paidCourseDetail_status").html("已完结");
		$("#paidCourseDetail_callBtn").css("display","none");
	}
	
	else{
		$("#paidCourseDetail_callBtn").css("display","none");
	}
	
	var sendObj=new Object;
	sendObj.command="findUserByOpenid";
	sendObj.openid=data.openid;
	$.theAjax.post(sendObj,function(res){
		if(res.result="success"){
			for(var j=0;j<res.data.length;j++){
				if(res.data[j].userType=="teacher"){
					$("#paidCourseDetail_teacher").html(res.data[j].userName);
					$("#paidCourseDetail_teacherLong").html(res.data[j].desLong);
					$("#paidCourseDetail_teacherShort").html(res.data[j].desShort);
					if(isTrail==false){
						$("#paidCourseDetail_callBtn").css("display","block");
						$("#paidCourseDetail_callBtn").attr("href","tel:"+res.data[j].phoneNum);
					}
					//console.log(j+":"+res.data[j])
				}
			}
		}
		else{
			alert("获取老师信息失败，请重新查询！");
		}
	},null)
}
