$(document).ready(function(){
	setTimeout(function(){
		//$('#userLogPage').css('display','none');
		$('#userLogPage').addClass('animated fadeOut');
		setTimeout(function(){
			$('#userLogPage').css('display','none');
			$("page1").css('display','block');
			$('#page1 .container').css('display','block');
			$('.footer').css('display','block');
		},500);
		
		
		
	},2000);
})

$('#page1').on('pageInit',function(){
	$("#tags").createTags({
		source:"views/tags_page1.json",
		style:'tag',
		created:function(res){
			console.log(res);
		}
	})
	$("#imgLinks_page1").createdImgLinks({
		source:"views/imgLinks_page1.json",
		style:'link',
		created:function(res){
			console.log(res);
		}
	})
})

$('#page4').on('pageInit',function(){
	$('#addAddress').on('click',function(){
		$.secendPage.to('addAddressPage');
	});
	$('#modifyUserInfo').on('click',function(){
		$.secendPage.to('modifyUserInfoPage');
	});
	$('#addShopAddress').on('click',function(){
		$.secendPage.to('addShopAddressPage');
	});
	$('.modifyShop').each(function(){
		$(this).on('click',function(){
			$.secendPage.to('modifyShopPage');
		});
	});
	$('#addShop').on('click',function(){
		$.secendPage.to('addShopPage');
	});
	$('#addCourse').on('click',function(){
		$.secendPage.to('addCoursePage');
	})
})