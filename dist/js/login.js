$(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass   : 'iradio_square-blue',
        increaseArea : '20%' // optional
    });
    /**
     * 登陆逻辑：
     * 1、验证用户名是否合法
     * 2、验证密码是否合法
     * 3、登陆按钮防二次点击
     * 4、请求完成解除二次点击
     * 5、用户名为空时提示请输入用户名
     * 6、密码为空时提示请输入密码
     */
    //查看cookies中是否有保存有用户的信息
	if(getCookie("username")&&getCookie("pswd")){
		$("#userName").val(getCookie("username"));
		$("#passWord").val(getCookie("pswd"));
	}
    var i = 1;//计数用，三次登录失败跳转到创建用户界面
    $("#signIn").click(function () {
        var _this = $("#signIn");
        var remember=$("#checkTake").prop("checked");
        if(!_this.hasClass("disabled")){
            /**
             * 防二次点击
             */
            _this.addClass("disabled notAllowed").text("请稍后。。。");
            if($("#userName").val() != "" && $("#passWord").val() != ""){
            	$.ajax({
	                url:"http://test.phpweilai.cc/login",
	                method:"POST",
	                data:{
	                    name:$.trim($("#userName").val()),
	                    password:$.trim($("#passWord").val())
	                },
	                dataType:"json",
	                beforeSend:function (XMLHttpRequest) {},
	                success:function (data,textStatus,XMLHttpRequest) {
	                    if(data.status === 1){
	                        /**
	                         * 登录成功
	                         */
	                        if(remember){
	                        	setCookie('username',$("#userName").val(),7);
	                        	setCookie('pswd',$("#passWord").val(),7);
	                        }else{
	                        	delCookie("username");
	                        	delCookie("pswd");
	                        }
	                       	
	                        sessionStorage.setItem("token", "token="+data.data.token);
	                        location.href = "index.html";
	                    }else {
	                        /**
	                         * 登录失败 在登录按钮下边红色字体三秒提示
	                         */
	                        $(".signInTip").text(data.message);
	                        setTimeout(function () {
	                            $(".signInTip").text("");
	                        },3000)
	                        /*
						     * 三次失败登陆跳转创建用户界面find.html
						     */
	                        if(i < 4){
	                        	i++;
	                        }else{
	                        	location.href = "find.html";
	                        	i = 0;
	                        }
	                    }
	                },
	                error:function (XMLHttpRequest,textStatus,errorThorwn) {
	                    console.error(XMLHttpRequest);
	                    console.error(textStatus);
	                    console.error(errorThorwn);
	                    $(".signInTip").text("登录错误，请稍后再试");
	                    setTimeout(function () {
	                        $(".signInTip").text("");
	                    },3000)
	                },
	                complete:function (XMLHttpRequest,textStatus) {
	                    _this.removeClass("disabled notAllowed").text("登录");
	                }
	            })
            }else{
            	$(".signInTip").text("请输入用户名和密码");
	            setTimeout(function () {
	                $(".signInTip").text("");
	                _this.removeClass("disabled notAllowed").text("登录");
	            },1000)
            	
            }
            
        }
    
    });
    
	/*
	 * 点击记住密码弹出提示框
	 * 并保留密码
	 */
//设置cookie
  function setCookie(name,value,day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
  };
  //获取cookie
  function getCookie(name){
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
  };
  //删除cookie
  function delCookie(name){
    setCookie(name,null,-1);
  };
	
    /*
     *回车键登陆
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