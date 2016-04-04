$.fn.sencondPageControl=function(pageid,data){
	console.log(pageid)
	switch (pageid){
		case "modifyUserInfoPage-student":
			modifyUserInfoPage_student(data);
			break;
		case "modifyUserInfoPage-teacher":
			modifyUserInfoPage_teacher(data);
			break;
		case "courseList":
			courseListShow(data);
			break;
		case "courseDetail":
			courseDetail(data);
			break;
		case "paidCourseDetail":
			paidCourseDetail(data);
			break;
		case "addressManager":
			addressManager();
			break;
		case "addCourse":
			addCourse();
			break;
		case "payOrder":
			createQR(data);
		default:
			break;
	}
	return this;
}
