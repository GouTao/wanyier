function paidpaidCourseDetail(data){
	$("#paidCourseDetail_courseName").html(data.courseName);
	$("#paidCourseDetail_courseType").html(data.courseType);
	$("#paidCourseDetail_courseLength").html(data.courseLength+"学时");
	$("#paidCourseDetail_price").html(Number(data.price)/100+" 元");
	$("#paidCourseDetail_time").html(data.time);
	$("#paidCourseDetail_note").html(data.note);
	
	if(data.trail!="none"){
		$("#paidCourseDetail_callBtn").css("display","block");
		$("#paidCourseDetail_callBtn").attr("href","tel:"+data.teacherInfo.phoneNum);
	}
}
