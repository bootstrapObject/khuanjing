;$(function () {
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
    $("#signIn").click(function () {
        var _this = $("#signIn");
        if(!_this.hasClass("disabled")){
            /**
             * 防二次点击
             */
            _this.addClass("disabled notAllowed").text("请稍后。。。");
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
        }
    });
});