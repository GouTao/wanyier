(function($){
	$.theAjax=(function(){
		this.post=function(sendObj,sucfunction,errFunction){
			var sendMsg=JSON.stringify(sendObj);
			$.ajax({
				type:"post",
				url:"http://119.29.92.190:23017",
				async:true,
				data:{'data':sendMsg},
				dataType:'json',
				success:function(res){
					sucfunction(res);
				},
				error:function(){
					alert('连接失败！请重新尝试');
					errFunction();
				}
			});
		}
		return this;
	})();
	$.regExp=(function(){
		this.regTel=function(str){
			var reg=/^1\d{10}$/;
			return reg.test(str);
		}
		return this;
	})()
})(jQuery);

