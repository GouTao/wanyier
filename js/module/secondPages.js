$.fn.sencondPageControl=function(pageid){
	console.log(pageid)
	switch (pageid){
		case "modifyUserInfoPage-student":
			modifyUserInfoPage_student();
			break;
		default:
			break;
	}
	return this;
}
