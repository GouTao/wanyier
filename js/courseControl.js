(function($){
	$.courseControl=(function cc(){
		var len=0;
		var data;
		
		var defaultTeacherInfo=new Object;
		defaultTeacherInfo.userName="";
		defaultTeacherInfo.desLong="";
		defaultTeacherInfo.desShort="";
		
		cc.coursecontrol=function(courseData,callBack){
			data=courseData;
			getTeacherInfo(callBack);
		}
		function getTeacherInfo(callBack){
			var sendObj=new Object;
			sendObj.command="findUserByOpenid";
			sendObj.openid=data[len].openid;
			$.theAjax.post(sendObj,function(res){
				if(res.result="success"){
					for(var j=0;j<res.data.length;j++){
						if(res.data[j].userType=="teacher"){
							data[len].teacherInfo=res.data[j];
						}
					}
					len++;
					if(len<data.length){
						getTeacherInfo(callBack);
					}
					else{
						len=0;
						if(data.teacherInfo!=undefined)
						{
							callBack(data);
						}
						else{
							callBack(data);
						}
					}
				}
				else{
					alert("获取老师信息失败，请重新查询！");
				}
			},null)
		}		
		
		return cc;
	})()
})(jQuery);
