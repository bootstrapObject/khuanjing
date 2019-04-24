$(function(){
	$("#signIn").click(function () {
        var _this = $("#signIn");
        if(!_this.hasClass("disabled")){
            /**
             * 防二次点击
             */
            _this.addClass("disabled notAllowed").text("请稍后。。。");
            /*
             * 前台过滤任一输入框空值的情况
             */
            if($("#name").val() != "" && $("#password").val() != "" && $("#passCheck").val() != ""){
            	/*
            	 * 新密码与确认密码是否一致
            	 */
            	if($("#password").val() ==  $("#passCheck").val()){
            		$.ajax({
	                    url:"http://test.phpweilai.cc/useradd",
	                    method:"POST",
	                    data:{
	                        name:$.trim($("#name").val()),
	                        password:$.trim($("#password").val()),
	                        text:$("#text").val()
	                    },
	                    dataType:"json",
	                    beforeSend:function (XMLHttpRequest) {},
	                    success:function (data,textStatus,XMLHttpRequest) {
	                        if(data.status === 1){
	                            /**
	                             * 创建成功
	                             */
	                            sessionStorage.setItem("token", "token="+data.data.token);
	                            location.href = "login.html";
	                        }else {
	                            /**
	                             * 创建失败 在完成按钮下边红色字体三秒提示
	                             */
	                            $(".signInTip").text(data.message);
	                            setTimeout(function () {
	                                $(".signInTip").text("");
	                            },3000)
	                        }
	                    },
	                    error:function (XMLHttpRequest,textStatus,errorThorwn) {
	                        console.error(XMLHttpRequest);
	                        console.error(textStatus);
	                        console.error(errorThorwn);
	                        $(".signInTip").text("创建失败，请稍后再试");
	                        setTimeout(function () {
	                            $(".signInTip").text("");
	                        },3000)
	                    },
	                    complete:function (XMLHttpRequest,textStatus) {
	                        _this.removeClass("disabled notAllowed").text("提交");
	                    }
	                })
            	}else{
//          		$("#check small").html("&nbsp;&nbsp;&nbsp;&nbsp;确认密码不一致");
//					$("#check small").css("color","red");
					$(".signInTip").text("确认密码不一致");
					setTimeout(function(){
//						$("#check small").html("");
						$(".signInTip").text("");
						_this.removeClass("disabled notAllowed").text("提交");
					},1000)
            	}
            }else if($("#name").val() == ""){
                $(".signInTip").text("请输入用户名");
                setTimeout(function () {
                    $(".signInTip").text("");
                    _this.removeClass("disabled notAllowed").text("提交");
                },1000)    
            }else if($("#password").val() == ""){
                $(".signInTip").text("请输入密码");
                setTimeout(function () {
                    $(".signInTip").text("");
                    _this.removeClass("disabled notAllowed").text("提交");
                },1000)
            }else if($("#passCheck").val() == ""){
                $(".signInTip").text("请确认密码");
                setTimeout(function () {
                    $(".signInTip").text("");
                    _this.removeClass("disabled notAllowed").text("提交");
                },1000)
            }
        }
    });
	
	
	/*
	 * 确认两次输入密码是否一致
	 * */
	$("#passCheck").blur(function(){
		if($("#password").val() == $("#passCheck").val()){
			$("#check small").html("");
		}else{
			$("#check small").html("&nbsp;&nbsp;&nbsp;&nbsp;确认密码不一致");
			$("#check small").css("color","red");
			setTimeout(function(){
				$("#check small").html("");
			},3000)
		}
	});
//	$("#password").blur(function(){
//		if($("#password").val() == $("#passCheck").val()){
//			$("#check small").html("");
//		}else{
//			$("#check small").html("&nbsp;&nbsp;&nbsp;&nbsp;确认密码不一致");
//			$("#check small").css("color","red");
//			setTimeout(function(){
//				$("#check small").html("");
//			},3000)
//		}
//	});
	
	/*
	 *用户名为空时提示输入用户名
	 * */
	$("#name").blur(function(){
		if($("#name").val() == null || $("#name").val() == ""){
			$("#username small").html("&nbsp;&nbsp;&nbsp;&nbsp;请输入用户名");
			$("#username small").css("color","red");
			setTimeout(function(){
				$("#username small").html("");
			},3000)
		}else{
			$("#username small").html("");
		}
	});
	
	/*
	 *密码为空时提示输入用户名
	 * */
	$("#password").blur(function(){
		if($("#password").val() == null || $("#password").val() == ""){
			$("#passWord small").html("&nbsp;&nbsp;&nbsp;&nbsp;请输入密码");
			$("#passWord small").css("color","red");
			setTimeout(function(){
				$("#passWord small").html("");
			},3000)
		}else{
			$("#passWord small").html("");
		}
	});
	
	/*
     *回车键创建
     */
    $(function() {
        document.onkeypress = function (e) {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
               $("#signIn").click();
            }
        }
    });

});

