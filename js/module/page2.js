$('#page2').on('pageInit',function(){
	if($.theData.isTeacher==true){
		$(".noRight").css('display',"none");
		$("#imgLinks_page2").createdImgLinks({
			source:"views/imgLinks_page2.json",
			style:'link',
			created:function(res){
				if($.theData.isCheck==true){
					if(res=="addCourse"){
						$.loadSecondPage.staticLoad("addCourse",function(){
							$.secondPage.to("addCourse",null);
						})
					}
					else if(res=="trendCourse"){
						$.loadSecondPage.staticLoad("trendCourse",function(){
							$.secondPage.to("trendCourse",null);
						})
					}
				}
				else{
					alert("您的信息尚未通过审核，请稍后尝试该功能。")
				}
			}
		})	
	}
	else{
		$(".noRight").css('display',"block");
		$("#tobeteacher").on("click",function(){
			open("regist.html?levelup=true&openid="+$.wxData().openid,"_self");
		})
	}
})

