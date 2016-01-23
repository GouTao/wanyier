$(document).ready(initRegist);

var waitTime,timeNum=45,isGetting=false;
function initRegist(){
	setTimeout(function(){
		$("#regist").css("display","block");
		$("#regist").addClass("animated bounceIn");
	},500);
	$("#getCodeBtn").bind("click",function(){
		if(!isGetting){
			//ajax
			isGetting=true;
			$("#getCodeBtn").removeClass("btn-warning");
			$("#getCodeBtn").addClass("btn-default");
			$("#getCodeBtn").html(timeNum+"秒后再次获取验证码");
			waitTime=setInterval(function(){
				timeNum--;
				$("#getCodeBtn").html(timeNum+"秒后再次获取验证码");
				if(timeNum==0){
					$("#getCodeBtn").removeClass("btn-default");
					$("#getCodeBtn").addClass("btn-warning");
					$("#getCodeBtn").html("点击获取验证码");
					isGetting=false;
					timeNum=45;
					clearInterval(waitTime);
				}
			},1000);
		}
		else{
			return false;
		}
	})
}
