$('#page2').on('pageInit',function(){
	if($.theData.isTeacher==true){
		$(".noRight").css('display',"none");
		$("#imgLinks_page2").createdImgLinks({
			source:"views/imgLinks_page2.json",
			style:'link',
			created:function(res){
				
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

