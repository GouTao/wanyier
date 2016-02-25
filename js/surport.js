//图片导航元素
$.fn.createdImgLinks=function(options){
	this.options={
		source:"",
		style:"",
		created:null
	};
	if (typeof options === 'object') {
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.options[i] = options[i];
            }
        }
    }
	var _callBack;
	this.options.created==null?_callBack=function(){}:_callBack=this.options.created;
	var parent=$(this);
	$.ajax({
		type:"get",
		url:options.source,//"views/imgBtns.json"
		async:true,
		dataType:"json",
		success:function(res){
			parent.empty();
			for(var i=0;i<res.length;i++){
				var $img=$("<img src='"+res[i].src+"'/>");
				$img.attr("target",res[i].target);
				parent.append($img);
				$img.addClass(options.style);
				$img.on('click',function(e){
					_callBack($(e.target).attr('target'));
				})
			} 
		}
	});
	return this;
};

//tags导航元素
$.fn.createTags=function(options){
	this.options={
		source:"",
		created:null
	};
	if (typeof options === 'object') {
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this.options[i] = options[i];
            }
        }
    }
	var _callBack;
	this.options.created==null?_callBack=function(){}:_callBack=this.options.created;
	var parent=$(this);
	$.ajax({
		type:"get",
		url:options.source,//"views/tags_page1.json"
		async:true,
		dataType:"json",
		success:function(res){
			parent.empty();
			for(var i=0;i<res.length;i++){
				var $tag=$("<p><img src='img/icons-png/check-black.png' style='opacity:0.5' />"+res[i].name+"</p>");
				$tag.attr("target",res[i].target);
				parent.append($tag);
				$tag.addClass('tag');
				$tag.on('click',function(e){
					if($(e.currentTarget).hasClass("tag-selected")){
						$(e.currentTarget).removeClass("tag-selected");
						_callBack($(e.currentTarget).attr('target'),"remove");
					}
					else{
						$(e.currentTarget).addClass("tag-selected");
						_callBack($(e.currentTarget).attr('target'),"add");
					}
				})
			} 
		}
	});
	return this;
};

//底部导航栏
$.fn.nav_footer=function(_callBack){
	var nav=$(this);
	$.ajax({
		type:"get",
		url:"views/navBar_footer.json",
		async:true,
		dataType:"json",
		success:function(res){
			var $tr=$("<tr></tr>");
			nav.append($tr);
			for(var i=0;i<res.length;i++){
				var $td=$("<td class='navBtn' target='page"+(i+1)+"'></td>");
				var $upimg=$("<img src='"+res[i].upimg+"' class='imgBtn btnUp'/>");
				$td.append($upimg);
				var $downimg=$("<img src='"+res[i].downimg+"' class='imgBtn btnDown'/>");
				$td.append($downimg);
				$tr.append($td);
			}
			
			nav.find('.navBtn').on('click',function(e){
				if($(e.currentTarget).hasClass('active')){
					return
				}
				else{
					$('#navBar .navBtn').each(function(){
						if($(this).hasClass('active')){
							$(this).removeClass('active');
							$("#"+$(this).attr('target')).trigger("pageHide");
							$("#"+$(this).attr('target')).css('display',"none");
						};
					})
					$(e.currentTarget).addClass('active');
					_callBack($(e.currentTarget).attr('target'));
				}
			});
			//nav.find(".navBtn:first").addClass('active');
			
		}
	});
	return this;
}
//header
$(document).ready(function(){
	$(".header").trigger('headerInit');	
});

//回到主页
(function($){
	$.toMainPage=(function(){
		this.show=function(){
			$('.page').each(function(){
				if($(this).css('display')=="block"){
					$(this).css('display','none');
				}
			})
			$('.secend-page').each(function(){
				if($(this).css('display')=="block"){
					$(this).css('display','none');
				}
			})
			$('#navBar .navBtn').each(function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
				}
			})
			
			pageRoute=[];
			tempSecendPage=null;
			$('#secend-navBar').css('display','none');
			$('#navBar').css('display','table');
			$('#navBar').removeClass('animated fadeInUp');
			$('#navBar').addClass('animated fadeInUp');
			$('#returnToMain').unbind('click');
			$('body,html').animate({scrollTop:0},0); 
			$('#returnToMainBtn').css('display','none');
			$('#mainPage').css('display','block');
			$('#mainPage').removeClass('animated fadeIn');
			$('#mainPage').addClass('animated fadeIn');
			$("#modeName").html($("#mainPage").attr("modeName"));
		}
		return this;
	})()
})(jQuery);

//主页面切换
$(document).ready(function(){
	$("#navBar").nav_footer(function(targetPage){
		if($('#mainPage').css('display')=="block"){
			$('#mainPage').css('display',"none");
			$("#returnToMainBtn").css('display','block');
		}
		if($("#"+targetPage).attr("inited")=="inited"){
			$("#"+targetPage).trigger('pageShow');		
		}
		else{
			$("#"+targetPage).trigger('pageInit');
			$("#"+targetPage).attr("inited","inited");
		}
		$("#"+targetPage).css("display","block");	
		$('#modeName').html($("#"+targetPage).attr("modeName"));
		if($("#"+targetPage).hasClass("animated")){
			$("#"+targetPage).removeClass('animated fadeIn');
			$("#"+targetPage).addClass('animated fadeIn');
		}
		else{
			$("#"+targetPage).addClass('animated fadeIn');
		}
		$('body,html').animate({scrollTop:0},0); 
	});
});

var pageRoute=[],tempSecendPages,tempModeName;
//次级页面切换
(function($){
	$.secendPage=(function(){
		this.to=function(pageID){
			$('#returnToMain').unbind('click');
			pageRoute=[];
			if($("#mainPage").css("display")=="block"){
				$("#mainPage").css("display","none");
				pageRoute.push($("#mainPage"));
				$("#returnToMainBtn").css("display","block");
			}
			var tempMainPage;
			$('.page').each(function(){
				if($(this).css("display")=='block'){
					tempMainPage=$(this);
					pageRoute.push(tempMainPage);
				}
			})
			tempModeName=$("#modeName").html();
			if(pageRoute.length>0){
				pageRoute[pageRoute.length-1].css('display','none');
			}
			$('#'+pageID).css('display','block');
			$('#'+pageID).removeClass('animated fadeIn');
			$('#'+pageID).addClass('animated fadeIn');
			$('#modeName').html($('#'+pageID).attr("modeName"));
			$("#navBar").css('display','none');
			$('#secend-navBar').css('display','table');
			$('#secend-navBar').removeClass('animated fadeInUp');
			$('#secend-navBar').addClass('animated fadeInUp');
			$('body,html').animate({scrollTop:0},0); 
			pageRoute.push($('#'+pageID));
			$('#returnToMain').bind('click',function(){
				$('#'+pageID).css('display','none');
				$('#secend-navBar').css('display','none');
				if(pageRoute[0].attr("id")=="mainPage"){
					$("#returnToMainBtn").css("display","none");
				}
				pageRoute[pageRoute.length-2].css('display','block');
				pageRoute[pageRoute.length-2].removeClass('animated fadeIn');
				pageRoute[pageRoute.length-2].addClass('animated fadeIn');
				$('#modeName').html(pageRoute[pageRoute.length-2].attr("modeName"));
				pageRoute.splice(0);
				$("#modeName").html(tempModeName);
				$('#navBar').css('display','table');
				$('#navBar').removeClass('animated fadeInUp');
				$('#navBar').addClass('animated fadeInUp');
				$('#returnToMain').unbind('click');
				$('body,html').animate({scrollTop:0},0); 
			});
		}
		this.next=function(pageID){
			$('#returnToMain').unbind('click');
			pageRoute.push($('#'+pageID));
			console.log(pageRoute.length)
			pageRoute[pageRoute.length-2].css('display','none');
			$('#'+pageID).css('display','block');
			$('#'+pageID).removeClass('animated fadeIn');
			$('#'+pageID).addClass('animated fadeIn');
			$('#modeName').html($('#'+pageID).attr("modeName"));
			$('body,html').animate({scrollTop:0},0); 
			$('#returnToMain').bind('click',function(){
				pageRoute[pageRoute.length-1].css('display','none');
				pageRoute[pageRoute.length-2].css('display','block');
				pageRoute[pageRoute.length-2].removeClass('animated fadeIn');
				pageRoute[pageRoute.length-2].addClass('animated fadeIn');
				$('#modeName').html(pageRoute[pageRoute.length-2].attr("modeName"));
				pageRoute.splice(pageRoute.length-1,1);
				if(pageRoute.length==1){
					if(pageRoute[0].attr("id")=="mainPage"){
						$("#returnToMainBtn").css("display","none");
					}
					pageRoute=[];
					$("#modeName").html(tempModeName);
					$('#secend-navBar').css('display','none');
					$('#navBar').css('display','table');
					$('#navBar').removeClass('animated fadeInUp');
					$('#navBar').addClass('animated fadeInUp');
					$('#returnToMain').unbind('click');
					$('body,html').animate({scrollTop:0},0); 
				}
			});
		}
		return this;
	})()
})(jQuery);

(function($){
	$.loadSecondPage=(function(){
		this.load=function(){
			$('#secend-navBar tr td').addClass('active');
		};
		this.loaded=function(_callback){
			$('#secend-navBar tr td').removeClass('active');
			_callback();
		}
		return this;
	})()
})(jQuery);