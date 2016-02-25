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
		$.secendPage.to("teacherList_main");
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
			console.log(tags);
		}
	})
	
	$("#test").on('click',function(){
		$.secendPage.next("modifyUserInfoPage");
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