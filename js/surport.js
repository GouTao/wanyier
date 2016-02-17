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
					_callBack($img.attr('target'));
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
		url:options.source,//"views/tags_page1.json"
		async:true,
		dataType:"json",
		success:function(res){
			parent.empty();
			for(var i=0;i<res.length;i++){
				var $tag=$("<p>"+res[i].name+"</p>");
				$tag.attr("target",res[i].target);
				parent.append($tag);
				$tag.addClass(options.style);
				$tag.on('click',function(e){
					_callBack($tag.attr('target'));
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
			nav.find(".navBtn:first").addClass('active');
			$(".page:first").trigger("pageInit");
			$(".page:first").attr("inited","inited");
			
		}
	});
	return this;
}
//header
$(document).ready(function(){
	$(".header").trigger('headerInit');					
});

//主页面切换
$(document).ready(function(){
	$("#navBar").nav_footer(function(targetPage){
		if($("#"+targetPage).attr("inited")=="inited"){
			$("#"+targetPage).trigger('pageShow');		
		}
		else{
			$("#"+targetPage).trigger('pageInit');
			$("#"+targetPage).attr("inited","inited");
		}
		$("#"+targetPage).css("display","block");	
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

var pageRoute=[],tempSecendPage;

//次级页面切换
(function($){
	$.secendPage=(function(){
		this.to=function(pageID){
			$('#returnToMain').unbind('click');
			pageRoute=[];
			var tempMainPage;
			$('.page').each(function(){
				if($(this).css("display")=='block'){
					tempMainPage=$(this);
					pageRoute.push(tempMainPage);
				}
			})
			pageRoute[pageRoute.length-1].css('display','none');
			$('#'+pageID).css('display','block');
			$('#'+pageID).removeClass('animated fadeIn');
			$('#'+pageID).addClass('animated fadeIn');
			$("#navBar").css('display','none');
			$('#secend-navBar').css('display','table');
			$('#secend-navBar').removeClass('animated fadeInUp');
			$('#secend-navBar').addClass('animated fadeInUp');
			$('body,html').animate({scrollTop:0},0); 
			pageRoute.push($('#'+pageID));
			$('#returnToMain').bind('click',function(){
				$('#'+pageID).css('display','none');
				$('#secend-navBar').css('display','none');
				pageRoute[pageRoute.length-2].css('display','block');
				pageRoute[pageRoute.length-2].removeClass('animated fadeIn');
				pageRoute[pageRoute.length-2].addClass('animated fadeIn');
				pageRoute.splice(0);
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
			$('body,html').animate({scrollTop:0},0); 
			$('#returnToMain').bind('click',function(){
				pageRoute[pageRoute.length-1].css('display','none');
				pageRoute[pageRoute.length-2].css('display','block');
				pageRoute[pageRoute.length-2].removeClass('animated fadeIn');
				pageRoute[pageRoute.length-2].addClass('animated fadeIn');
				pageRoute.splice(pageRoute.length-1,1);
				if(pageRoute.length==1){
					pageRoute=[];
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
	$.loading=(function(){
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