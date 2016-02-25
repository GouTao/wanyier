$(document).ready(function(){
	initMainPage();
	
	setTimeout(function(){
		//$('#userLogPage').css('display','none');
		$('#userLogPage').addClass('animated fadeOut');
		setTimeout(function(){
			$('#userLogPage').css('display','none');
			$('#mainPage').css("display","block");
			$(".footer").css('display','block');
		},500);
		
	},2000);
})

$('#page1').on('pageInit',function(){
	
})

