function courseListShow(data){
	$(".courseList_ul").empty();
	for(var i=0;i<data.length;i++){
		if(data[i].teacherInfo!=undefined){
			var $item=$("<li class='list-group-item courseList_infoShow'>"+
						"<div class='courseList_img'>"+
							"<img class='courseList_teacher_head' src='FlatUI/img/icons/png/Calendar.png'/>"+
						"</div>"+
						"<div class='courseList_info'>"+
							"<p class='courseList_id' style='display: none;'>"+data[i]._id+"</p>"+
							"<p class='courseList_courseName'>课程名：<b class='courseList_courseName_content'>"+data[i].courseName+"</b></p>"+
							"<p class='courseList_teacherName'>授课老师：<span class='courseList_teacherName_content'>"+data[i].teacherInfo.userName+"</span></p>"+
						"</div>"+
					"</li>"
				);JSON.stringify()
			if(data[i].trail!="none"){
				var $span=$("<span class='badge'>"+"试听"+"</span>");
				$item.append($span);
			}
			$(".courseList_ul").append($item);	
			$item.on('click',function(e){
				var keyID=$(e.currentTarget).find(".courseList_id").html();
				$.loadSecondPage.staticLoad("courseDetail",function(){
					$.secondPage.next("courseDetail",findData(keyID));
				});
				//
			})
		}
	}
	if($(".courseList_ul").children('li').length===0){
		$(".courseList_ul").append($("<li  class='list-group-item'>您搜索的课程均在审核中，请稍后尝试</li>"));
	}
	
	function findData(ki){
		for(var j in data){
			if(data[j]._id===ki){
				return data[j];
			}
		}
	}
}
