(function($){
	$.theAjax=(function(){
		this.post=function(sendObj,sucFunction,errFunction){
			var sendMsg=JSON.stringify(sendObj);
			$.ajax({
				type:"post",
				url:"http://119.29.92.190:23017",
				async:false,
				data:{'data':sendMsg},
				dataType:'json',
				success:function(res){
					sucFunction(res);
				},
				error:function(){
					alert('连接失败！请重新登录尝试操作');
					if(errFunction!=null)
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

