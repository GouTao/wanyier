$.fn.sencondPageControl=function(pageid,data){
	console.log(pageid)
	switch (pageid){
		case "modifyUserInfoPage-student":
			modifyUserInfoPage_student(data);
			break;
		case "courseList":
			courseList(data);
			break;
		case "courseDetail":
			courseDetail(data);
			break;
		default:
			break;
	}
	return this;
}
