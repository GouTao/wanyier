function initMainPage(){
	$("#returnToMainBtn").on("click",function(){
		$(".tag").each(function(){
			if($(this).hasClass('tag-selected')){
				$(this).removeClass("tag-selected");
			}
		})
		tags=[];
		$.toMainPage.show();
	})

	$("#iwannapaly").on("click",function(){
		if(tags.length==0){
			alert("请选择您的兴趣爱好！")
		}
		else{
			var intrest=new Object;
			intrest.command="findInterestCourse";
			intrest.courseName=JSON.stringify(tags);
			$.theAjax.post(intrest,function(res){
				if(res.result=="success"){
					if(res.data.length>0){
						$.loadSecondPage.bindLoad(function(){
							$.courseControl.coursecontrol(res.data,function(data){
								$.secondPage.to("courseList",data);
							});
							$.loadSecondPage.bindOver();
						});
					}
					else{
						alert("没有相关的课程！");
					}
				}
				else{
					alert("查询失败！");
				}
			},null)
		}
	})

	var tags=[]
	
	$("#tags").createTags({
		source:"views/tags_page1.json",
		created:function(res,state){
			if(state=="remove"){
				tags.splice(tags.indexOf(res),1);
			}
			else{
				tags.push(res);
			}
			//console.log(tags);
		}
	})
	
	$("#test").on('click',function(){
		//$.secondPage.next("modifyUserInfoPage");
		
	})
	
	$("#imgLinks_mainPage").createdImgLinks({
		source:"views/imgLinks_mainPage.json",
		style:'link',
		created:function(res){
			$("#mainPage").css("display","none");
			$(".footer").css("display","block");
			$(".navBtn").each(function(){
				if($(this).attr("target")==res){
					$("#returnToMainBtn").css("display","block");
					$(this).trigger('click');
				}
			})
		}
	})
}