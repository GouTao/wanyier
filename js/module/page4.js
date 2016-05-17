(function(){	
	var studentCourseData;
	
	$('#page4').on('pageInit',function(){
		try{$("#head").attr("src",$.wxData().userInfo.headimgurl);}catch(e){};
		try{$("#nickName").html($.wxData().userInfo.nickname);}catch(e){}
		//$("#head").attr("src","img/qr.jpg");
		//$("#nickName").html("某科学的超坦克炮");
		if($.theData.isTeacher==true){
			if($.theData.isCheck==false){
				$("#name").html($.theData.teacher.userName+"(未审核)");
			}
			else{
				$("#name").html($.theData.teacher.userName+"(已审核)");
			}
			
			
			$("#shortDes").html($.theData.teacher.desShort);
			$("#longDes").html($.theData.teacher.desLong);
			
			if($.theData.teacher.userName!=undefined&&$.theData.teacher.desShort!=undefined&&$.theData.teacher.desLong!=undefined&&$.theData.teacher.homeAddressId!=undefined){
				var teacherHome=new Object();
				teacherHome.command="getAddressById";
				teacherHome.addressId=$.theData.teacher.homeAddressId;
				$.theAjax.post(teacherHome,function(res){
					if(res.result=="success"){
						$("#homeAddress").html(res.data[0].address);
					}
				},null)
			}
			else{
				setTimeout(function(){alert("您的基本信息还未完善，\n点击个人信息一栏的修改按钮进入基本信息填写页面")},750);
			}
			teacherConttol();
		}
		else{
			$(".forTeacher").css("display","none");
			$("#shortDes").prev('p').css('display',"none");
			$("#shortDes").css("display","none");
			$("#homeAddress").prev('p').css('display',"none");
			$("#homeAddress").css("display","none");
			
			$("#name").html($.theData.student.userName);
			$("#longDes").html($.theData.student.desLong);
			if($.theData.student.userName!=undefined&&$.theData.student.desLong!=undefined){}
			else{
				setTimeout(function(){alert("您的基本信息还未完善，\n点击个人信息一栏的修改按钮进入基本信息填写页面")},750);
			}
		}
		
		$("#modifyUserInfo").bind("click",function(){
			if($.theData.isTeacher==false){
				$.loadSecondPage.staticLoad("modifyUserInfoPage-student",function(){
					$.secondPage.to('modifyUserInfoPage-student',$.theData.student);
				});
			}
			else{
				$.loadSecondPage.staticLoad("modifyUserInfoPage-teacher",function(){
					$.secondPage.to('modifyUserInfoPage-teacher',$.theData.teacher);
				});
			}
		})
		
		function findStudentCourseData(ki){
			for(var j in studentCourseData){
				if(studentCourseData[j]._id===ki){
					return studentCourseData[j];
				}
			}
		}
		
		var courseInfo=new Object;
		courseInfo.command="getMyPaidCourse";
		courseInfo.openid=$.wxData().openid;
		$.theAjax.post(courseInfo,function(res){
			if(res.result=="success"){
				studentCourseData=res.data
				if(res.data.length>0){
					for(var i=0;i<res.data.length;i++){
						var $item=$("<li class='list-group-item'>"+
							"<p style='float: left;' class='cn' state='"+res.data[i].state+"'>"+res.data[i].courseName+"</p>"+
							"<a style='float: right;' courseID='"+res.data[i]._id+"'>[查询详情]</a>"+
							"</li>"
						);
						$("#student_courseList").append($item);		
						$item.find("a").on("click",function(e){
							var keyID=$(e.target).attr("courseID");
							$.loadSecondPage.staticLoad("paidCourseDetail",function(){
								$.secondPage.to("paidCourseDetail",findStudentCourseData(keyID));
							});
						})
					}
				}
				else{
					$("#student_courseList").append($("<li class='list-group-item'>无</li>"))
				}
			}
		},null)
		
		$("#student_courseList_check").bind("click",function(e){
			if($(e.target).attr('state')=="normal"){
				$("#student_courseList").children('li').each(function(){
					//console.log($(this).children('.cn').);
					if($(this).children('.cn').attr("state")=="3"){
						$(this).css("display","block");
					}
					else{
						$(this).css("display","none");
					}
				})
				$(e.target).attr('state',"show");
				$(e.target).html("[显示全部]");
			}
			else{
				$("#student_courseList").children('li').each(function(){
					$(this).css("display","block");
				})
				$(e.target).attr('state',"normal");
				$(e.target).html("[只显示未学完课程]");
			}
		})
		
	})
	$("#page4").on('pageShow',function(){
		$.theData.uploadTeacher(function(){
			if($.theData.isTeacher==true){
				if($.theData.isCheck==false){
					$("#name").html($.theData.teacher.userName+"(未审核)");
				}
				else{
					$("#name").html($.theData.teacher.userName+"(已审核)");
				}
				$("#shortDes").html($.theData.teacher.desShort);
				$("#longDes").html($.theData.teacher.desLong);
				var teacherHome=new Object();
				teacherHome.command="getAddressById";
				teacherHome.addressId=$.theData.teacher.homeAddressId;
				$.theAjax.post(teacherHome,function(res){
					if(res.result=="success"){
						$("#homeAddress").html(res.data[0].address);
					}
				},null)
			}
			else{
				$("#name").html($.theData.student.userName);
				$("#longDes").html($.theData.student.desLong);
			}
		})
	})
	
	function teacherConttol(){
		$("#AddresManagerBtn").bind("click",function(){
			$.loadSecondPage.staticLoad("addressManager",function(){
				$.secondPage.to("addressManager",null);
			})
		})
	}
})()
