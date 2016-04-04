$(document).ready(checkRegist);

var waitTime,timeNum=120,isGetting=false,userType="student",phoneNum="",openid="",levelUp;

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg);  
	if (r != null) return unescape(r[2]); return null; 
}

function checkRegist(){
	$.webchatCongfig.checkWXBrowser({
		default:false,
		sucFunction:function(){
			$(".regist").css("display","block");
			initRegist();
		},
		errFunction:function(){
			open("nowx.html","_self");
		}
	})
}

function initRegist(){
	openid=getUrlParam('openid');
	levelUp=getUrlParam('levelup');
	
	if(levelUp!=null){
		$('#registLogo').attr('src','FlatUI/img/icons/png/Book.png')
		$("#tip").html('完成手机绑定升级成为玩艺儿服务提供者')
		$('.userType').css('display','none');
		$('#formTitle').css('display','none');
		$('#reChoose').css('display','none');
		setTimeout(function(){
			$("#regist").css("display","block");
			$("#regist").addClass("animated fadeIn");
		},750);
		userType="teacher";
	}
	else{
		setTimeout(function(){
			toSecendStep();
		},750);
		
	}
	$("#getCodeBtn").on("click",function(){
		if(!isGetting){
			if($.regExp.regTel($('#tel').val())){
				var sendObj=new Object;
				sendObj.command="addCheckPhone";
				sendObj.phoneNum=$('#tel').val();
				$.theAjax.post(sendObj,function(res){
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
							timeNum=120;
							clearInterval(waitTime);
						}
					},1000);
					if(res.result=='success'){
						phoneNum=$('#tel').val();
						alert('验证码已经发送!请在手机查收。');
					}
					else{
						alert(res.msg);
					}
				},function(){
					resetThis();
				})
			}
			else{
				alert('请输入正确的手机号码!');
				resetThis();
			}
		}
		else{
			return false;
		}
	})
	
	$("#teacher").on("click",function(){
		open("regist.html?levelup=true&openid="+openid,"_self");
	})
	$("#normalFini").on("click",function(){
		//跳转回登录界面
		alert('操作成功。页面即将跳转。');
		open("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6585c007ff6e5490&redirect_uri=http://www.wanyirart.cc/wy/index.html&response_type=code&scope=snsapi_userinfo","_self");
	})
	
	$('#registBtn').on('click',function(){
		resetThis();
		if(phoneNum!=""){
			if($("#regCode").val()!=""){
				var sendObj=new Object;
				if(userType=="teacher"){
					sendObj.command='addTeacher';
				}
				else{
					sendObj.command='addStudent';
				}
				sendObj.phoneNum=phoneNum;
				sendObj.openid=openid;
				sendObj.authCode=$("#regCode").val();
				$.theAjax.post(sendObj,function(res){
					if(res.result=='success'){
						if(userType=='teacher'){
							alert('操作成功，请等待审核。页面即将跳转。');
							open("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6585c007ff6e5490&redirect_uri=http://www.wanyirart.cc/wy/index.html&response_type=code&scope=snsapi_userinfo","_self");
						}
						else{
							$("#regist").css('display',"none");
							$(".userType").css("display","block");
							$(".userType").addClass("animated fadeIn");
							resetThis();
						}
					}
					else{
						alert(res.msg)
					}
				},function(){})
			}
			else{
				alert('请填写验证码!');
			}
		}
		else{
			alert('请先填写手机号码并获取最新的手机验证码!')
		}
	})
}
function resetThis(){
	$("#getCodeBtn").removeClass("btn-default");
	$("#getCodeBtn").addClass("btn-warning");
	$("#getCodeBtn").html("点击获取验证码");
	isGetting=false;
	timeNum=120;
	clearInterval(waitTime);
}
function toSecendStep(){
	$('.userType').css('display','none');
	$("#regist").css("display","block");
	$("#regist").removeClass("animated fadeIn");
	$("#regist").addClass("animated fadeIn");
}
