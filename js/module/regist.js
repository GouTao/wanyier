$(document).ready(initRegist);

var waitTime,timeNum=120,isGetting=false,userType="",phoneNum="",openid="",levelUp;

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg);  
	if (r != null) return unescape(r[2]); return null; 
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
			$(".userType").css("display","block");
			$(".userType").addClass("animated fadeIn");
		},750);
		
		
		$('#student').on('click',function(){
			userType='student';
			toSecendStep();
		});
		$("#teacher").on("click",function(){
			userType="teacher";
			toSecendStep();
		});
		$("#reChoose").on('click',function(){
			$("#tel").val('');
			$("#regCode").val('');
			userType="";
			phoneNum="";
			$('#regist').css('display','none');
			$('.userType').css('display','block');
			$(".userType").removeClass("animated fadeIn");
			$(".userType").addClass("animated fadeIn");
		})
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
							$("#getCodeBtn").addClass("btn-warning");								$("#getCodeBtn").html("点击获取验证码");
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
	
	$('#registBtn').on('click',function(){
		if(phoneNum!=""){
			if($("#regCode").val()!=""){
				var sendObj=new Object;
				if(userType=="teacher"){
					sendObj.command='addTeacher';
				}
				else{
					sendObj.command='addUser';
				}
				sendObj.phoneNum=phoneNum;
				sendObj.openid=openid;
				sendObj.authCode=$("#regCode").val();
				$.theAjax.post(sendObj,function(res){
					if(res.result=='success'){
						if(userType=='teacher'){
							alert('操作成功，请等待审核。页面即将跳转。');
						}
						else{
							alert('操作成功，页面即将跳转。');
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
