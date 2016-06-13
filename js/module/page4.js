(function(){	
//	var trendCourseData
	var trendCourseData,teacherCourseData,studentCourseData;
	
	$('#page4').on('pageInit',function(){
		
		$("h5.slideList").each(function(){
			$("#"+$(this).attr("target")).addClass("animated")
			$(this).on('click',function(e){
				if($("#"+$(e.currentTarget).attr("target")).css("display")=="block"){
					$("#"+$(e.currentTarget).attr("target")).hide();
					$("#"+$(e.currentTarget).attr("target")).removeClass("fadeIn");
					$($(e.currentTarget).children("span")[0]).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
					$($(e.currentTarget).next()[0]).hide();
				}
				else{
					$("#"+$(e.currentTarget).attr("target")).show();
					$("#"+$(e.currentTarget).attr("target")).addClass("fadeIn ")
					$($(e.currentTarget).children("span")[0]).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
					$($(e.currentTarget).next()[0]).show();
				}
			})
		})
		
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
		
		
		if($.theData.isTeacher==true){
			getTeacherCourse();
		}
		
		getStudentCourse();
		
//		$("#teacher_courseList_check").bind("click",function(e){
//			if($(e.target).attr('state')=="normal"){
//				getTrendCourse();
//				$(e.target).attr('state',"show");
//				$(e.target).html("[显示全部已发布课程]");
//			}
//			else{
//				getTeacherCourse();
//				$(e.target).attr('state',"normal");
//				$(e.target).html("[只显示授课中课程]");
//			}
//		})
		
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
		$("#student_courseList_check").attr('state',"normal");
		$("#student_courseList_check").html("[只显示未学完课程]");
		$("#teacher_courseList_check").attr('state',"normal");
		$("#teacher_courseList_check").html("[只显示授课中课程]");
				
		if($.theData.isTeacher==true){
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
			getTeacherCourse();
		}
		getStudentCourse();
		
	})
	
	function teacherConttol(){
		$("#AddresManagerBtn").bind("click",function(){
			$.loadSecondPage.staticLoad("addressManager",function(){
				$.secondPage.to("addressManager",null);
			})
		})
	}
	function getTeacherCourse(){
		var trendCourseInfo=new Object();
			trendCourseInfo.command="getAllMyOrder";
			trendCourseInfo.openid=$.wxData().openid;
			$.theAjax.post(trendCourseInfo,function(res){
				if(res.result=="success"){
					$("#teacher_courseList").empty();
					teacherCourseData=res.data;
					if(res.data.length>0){
						for(var ti=0;ti<res.data.length;ti++){
							var $item=$("<li class='list-group-item'>"+
							"<p style='float: left;' class='cn'>"+res.data[ti].courseName+"</p>"+
							"<a style='float: right;' courseID='"+res.data[ti]._id+"'>[查询详情]</a>"+
							"</li>"
						);
						$("#teacher_courseList").append($item);		
						$item.find("a").on("click",function(e){
							var keyID=$(e.target).attr("courseID");
							$.loadSecondPage.staticLoad("teacherCourseDetail",function(){
								$.secondPage.to("teacherCourseDetail",findTeacherCourseData(keyID));
							});
						})
					}
				}
			}
			else{
				$("#teacher_courseList").append($("<li class='list-group-item'>无</li>"))
			}
		})
	}
	
//	function getTrendCourse(){
//		var trendCourseInfo=new Object();
//			trendCourseInfo.command="getTrend";
//			trendCourseInfo.openid=$.wxData().openid;
//			$.theAjax.post(trendCourseInfo,function(res){
//				if(res.result=="success"){
//					$("#teacher_courseList").empty();
//					trendCourseData=res.data;
//					if(res.data.length>0){
//						for(var ti=0;ti<res.data.length;ti++){
//							var $item=$("<li class='list-group-item'>"+
//							"<p style='float: left;' class='cn'>"+res.data[ti].courseName+"</p>"+
//							"<a style='float: right;' courseID='"+res.data[ti].orderId+"'>[查询详情]</a>"+
//							"</li>"
//						);
//						$("#teacher_courseList").append($item);		
//						$item.find("a").on("click",function(e){
//							var keyID=$(e.target).attr("courseID");
//							$.loadSecondPage.staticLoad("trendCourseDetail",function(){
//								$.secondPage.to("trendCourseDetail",findTrendCourseData(keyID));
//							});
//						})
//					}
//				}
//			}
//			else{
//				$("#teacher_courseList").append($("<li class='list-group-item'>无</li>"))
//			}
//		})
//	}
	
	function getStudentCourse(){
		var paidCourseInfo=new Object;
		paidCourseInfo.command="getMyPaidCourse";
		paidCourseInfo.openid=$.wxData().openid;
		$.theAjax.post(paidCourseInfo,function(res){
			if(res.result=="success"){
				$("#student_courseList").empty();
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
	}
	
	function findStudentCourseData(ki){
		for(var j in studentCourseData){
			if(studentCourseData[j]._id===ki){
				return studentCourseData[j];
			}
		}
	}
	
	function findTeacherCourseData(ti){
		for(var tj in teacherCourseData){
			if(teacherCourseData[tj]._id===ti){
				console.log(teacherCourseData[tj])
				return teacherCourseData[tj];
			}
		}
	}
	
	function findTrendCourseData(tri){
		console.log(tri)
		for(var trj in trendCourseData){
			if(trendCourseData[trj].orderId===tri){
				console.log(trendCourseData[trj])
				return trendCourseData[trj];
			}
		}
	}
})()
