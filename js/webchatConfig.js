(function($){
	$.webchatCongfig=(function(){
		var appId = "",timestamp = "",nonceStr = "",signature = "";
		var regCallback,signCallback;
		var code=getUrlParam('code');
		var pathname = window.location.href;
		
		function getOpenid(code,callback){
			$.ajax({
				url:"http://115.159.39.71:6005?command=getOpenid&code="+code,
				async:true,
				dataType:"json",
				timeout:5000,
				success: function(json){
					callback.call(this,json);
				},
				error:function(){
					alert('连接服务器失败，未能获取openid！')
				}
			})
		}
	
		function getSignPackage(pathname,callback){
			$.ajax({
				url:"http://115.159.39.71:6005?command=getSignPackage&pathname="+pathname,
				async:true,
				dataType:"json",
				timeout:5000,
				success: function(json){
					callback.call(this,json);
				},
				error:function(){
					alert('连接服务器失败，未能进行微信权限验证！')
				}
			})		
		}
	
		function getUrlParam(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
			var r = window.location.search.substr(1).match(reg);  
			if (r != null) return unescape(r[2]); return null; 
		}
		this.checkWXBrowser = function(options){
			this.options={
				default:false,
				sucFunction:null,
				errFunction:null
			}
			if (typeof options === 'object') {
		        for (var i in options) {
		            if (options.hasOwnProperty(i)) {
		                this.options[i] = options[i];
		            }
		        }
		    }
			if(this.options.default==true){
				this.options.sucFunction();
				return true;
			}
			else{
				var ua = window.navigator.userAgent.toLowerCase(); 
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
					if(typeof this.options.sucFunction=='function'){
						this.options.sucFunction();
					}
					else{
						return true;
					}
				}else{ 
					if(typeof this.options.errFunction=='function'){
						this.options.errFunction();
					}else{
						return false;
					}		 
				} 
			}
		}
		
		this.regInformation = function(options){
			this.options={
				regSuccess:null,
				signSuccess:null
			};
			
			if (typeof options === 'object') {
		        for (var i in options) {
		            if (options.hasOwnProperty(i)) {
		                this.options[i] = options[i];
		            }
		        }
		    }
			if(typeof this.options.regSuccess!='function'){
				alert("请传入验证成功函数");
				return false;
			}
			else{
				regCallback=this.options.regSuccess;
			}
			if(typeof this.options.signSuccess!='function'){
				signCallback=function(){};
			}
			else{
				signCallback=this.options.signSuccess;
			}
			
			getOpenid(code,function(userInfo){
				regCallback(userInfo.openid,userInfo.userInfo);
				//获取wx权限
				getSignPackage(pathname,function(sp){
					appId = sp.appId;
					timestamp = sp.timestamp;
					nonceStr = sp.nonceStr;
					signature = sp.signature;
					// 在这里调用 API
					wx.config({
						appId:appId,
						timestamp:timestamp,
						nonceStr:nonceStr,
						signature:signature,
						jsApiList: ['scanQRCode'],
						debug:false
					});
					wx.ready(function () {
						signCallback("signSuc");
					});
					
					wx.error(function(obj){
						signCallback("signErr");
					});
				});
			});
		};
		return this;
	})()
})(jQuery);