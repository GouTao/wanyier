$(document).ready(function(){
	//验证模块
	initMainPage();
	$.webchatCongfig.checkWXBrowser({
		default:true,
		//验证身份
		sucFunction:function(){
			$("body").css("display","block");
			logFuc();
//			$.webchatCongfig.regInformation({
//				regSuccess:function(){
//					logFuc();
//				},
//				signSuccess:function(res){
//					//alert(res);//signSuc  OR  signErr
//				}
//			})
		},
		errFunction:function(){
			open("nowx.html","_self");
		}
	})
})
function logFuc(){
	var logObj=new Object;
	logObj.command="loginStudent";
	logObj.openid=$.wxData().openid;
	$.theAjax.post(logObj,function(res){
		if(res.result=="success"){
			$.theData.student=res.data[0];
			$.theData.isLog=true;
			
			var logTeacher=new Object;
			logTeacher.command="loginTeacher";
			logTeacher.openid=$.wxData().openid;
			
			$.theAjax.post(logTeacher,function(res){
				if(res.result=="success"){
					$.theData.teacher=res.data[0];
					$.theData.isTeacher=true;
					//console.log(res.data[0].state)
					if(res.data[0].state==0){
						$.theData.isCheck=false;
					}
					else{
						$.theData.isCheck=true;
					}
				}
				else{
					$.theData.isTeacher=false;
				}
				$('#userLogPage').addClass('animated fadeOut');
				setTimeout(function(){
					$('#userLogPage').css('display','none');
					$('#mainPage').css("display","block");
					$(".footer").css('display','block');
				},500);
			},null);
		}
		else{
			$.theData.isLog=false;
			alert("登录失败，请重新尝试")
		}
	},null)
}
