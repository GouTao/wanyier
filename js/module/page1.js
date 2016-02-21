$('#page1').on('pageInit',function(){
	$("#modeName").html('学艺术');
	$("#imgLinks_page1").createdImgLinks({
		source:"views/imgLinks_page1.json",
		style:'link',
		created:function(res){
		}
	})
})
$('#page1').on('pageShow',function(){
	$("#modeName").html('学艺术');
	
})