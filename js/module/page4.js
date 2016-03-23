(function(){	
	var studentCourseData;
	
	$('#page4').on('pageInit',function(){
		//$("#head").attr("src",$.wxData().userInfo.headimgurl);
		//$("#nickName").html($.wxData().userInfo.nickname);
		$("#head").attr("src","img/qr.jpg");
		$("#nickName").html("某科学的超坦克炮");
		if($.theData.isTeacher==true){
			$("#name").html($.theData.teacher.userName);
			$("#shortDes").html($.theData.teacher.desShort);
			$("#longDes").html($.theData.teacher.desLong);
			$("#homeAddress").html($.theData.teacher.homeAddressNum);
			if($.theData.teacher.userName!=undefined&&$.theData.teacher.desShort!=undefined&&$.theData.teacher.desLong!=undefined&&$.theData.teacher.homeAddressNum!=undefined){
			}
			else{
				setTimeout(function(){alert("您的基本信息还未完善，\n点击个人信息一栏的修改按钮进入基本信息填写页面")},750);
			}
		}
		else{
			$(".forTeacher").css("display","none");
			$("#shortDes").prev('p').css('display',"none");
			$("#shortDes").css("display","none");
			$("#homeAddress").prev('p').css('display',"none");
			$("#homeAddress").css("display","none");
			
			$("#name").html($.theData.student.userName);
			$("#longDes").html($.theData.student.desLong);
			if($.theData.student.userName!=undefined&&$.theData.student.desLong!=undefined){
				
			}
			else{
				setTimeout(function(){alert("您的基本信息还未完善，\n点击个人信息一栏的修改按钮进入基本信息填写页面")},750);
			}
			
			var courseInfo=new Object;
			courseInfo.command="getMyPaidCourse";
			courseInfo.openid=$.wxData().openid;
			$.theAjax.post(courseInfo,function(res){
				if(res.result=="success"){
					studentCourseData=res.data
					for(var i=0;i<res.data.length;i++){
						var $item=$("<li class='list-group-item'>"+
							"<p style='float: left;'>"+res.data[i].courseName+"</p>"+
							"<a style='float: right;' courseID='"+res.data[i]._id+"'>[查询详情]</a>"+
							"</li>"
						);
						$("#student_courseList").append($item);		
						$item.find("a").on("click",function(e){
							var keyID=$(e.target).attr("courseID");
							//console.log();
							$.loadSecondPage.staticLoad("paidCourseDetail",function(){
								$.secondPage.to("paidCourseDetail",findStudentCourseData(keyID));
							});
						})
					}
				}
			},null)
		}
		
		$("#modifyUserInfo").bind("click",function(){
			if($.theData.isTeacher==false){
				$.loadSecondPage.staticLoad("modifyUserInfoPage-student",function(){
					$.secondPage.to('modifyUserInfoPage-student',null);
				});
			}
			else{
				
			}
		})
		
		function findStudentCourseData(ki){
			for(var j in studentCourseData){
				if(studentCourseData[j]._id===ki){
					return studentCourseData[j];
				}
			}
		}
		
	})
	$("#apge4").on('pageShow',function(){
		if($.theData.isTeacher==true){
			$("#name").html($.theData.teacher.userName);
			$("#shortDes").html($.theData.teacher.desShort);
			$("#longDes").html($.theData.teacher.desLong);
			$("#homeAddress").html($.theData.teacher.homeAddressNum)
		}
		else{
			$("#name").html($.theData.student.userName);
			$("#longDes").html($.theData.student.desLong);
		}
	})
})()
