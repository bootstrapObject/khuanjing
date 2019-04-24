   $(function(){
   	 /**
     * 文件管理      文件导入
     * token   xxx
     * id  参数可选，标识号[传上次最大的id编号]
     * starttime   秒级时间戳
     * endtime  秒级时间戳
     */
    /*$.ajax({
        	url:"http://test.phpweilai.cc/admin/df/lst",
        	method:"POST",
        	data:sessionStorage.getItem("token"),
        	dataType:"json",
        	beforeSend:function (XMLHttpRequest) {},
        	success:function (data,textStatus,XMLHttpRequest) {
        	var n=data.data.detail;
        	var files="";
        	files+="<table class='table file-list'><tbody>";
        	files+="<thead><tr><th></th><th>文件名称</th><th>创建时间</th><th>文件大小</th><th></th></tr><thead>";
        	for(var i=0;i<data.data.detail.length;i++){
        		files+="<tr class='file-item'>";
        		files+="<td><img src='dist/img/icon/wenjianguanli.png'></td>";
        		files+="<td>"+n[i].name+"</td>";
        		files+="<td>"+n[i].ctime+"</td>";
        		files+="<td>"+n[i].fz+"</td>";
        		files+="<td>"+n[i].df+"</td>";
        		files+='</tr>'
        	}
        	files+='</tbody></table>';
        	$(".fileM_content").append(files);
        },
        error:function (XMLHttpRequest,textStatus,errorThorwn) {
            console.error(XMLHttpRequest);
            console.error(textStatus);
            console.error(errorThorwn);
        },
        complete:function (XMLHttpRequest,textStatus) {}
    });*/
    //返回按钮监听
    $(".rollback").click(function(){
    	alert("返回上一级目录");
    });
     //进入下一级按钮监听
    $(".arrowright").click(function(){
    	alert("进入下一级目录");
    });
     //主目录按钮监听
    $(".master").click(function(){
    	alert("返回主目录");
    });
    $(".collect").click(function(){
    	var src=$(".collect").attr("src");
    	var pic="dist/img/star-fill.png";
    	//取消收藏已经收藏的文件
    	if(src==pic){
    		$(".collect").attr("src","dist/img/star.png");
    	}//收藏选中的未收藏的文件
    	else{
    		$(".collect").attr("src",pic);
    	}
    });
    //取消鼠标右键默认菜单
    $("#fileManagement").on("contextmenu",function(){
    	return false;
    });
    //点击自建菜单外区域，收起菜单
    $("#fileManagement").click(function(){
    	$(".context-menu").hide();
    });
    //点击鼠标右键，在相应的位置显示自建菜单
    $("#fileManagement").mousedown(function(event){
    	var code=event.which;
    	var x=event.pageX;
    	var y=event.pageY;
    	if (code==3) {
    		$(".context-menu").show();
    		$(".context-menu").css("left",x);
    		$(".context-menu").css("top",y);
    	}
    });
    //阻止事件冒泡
    $(".context-menu").click(function(event){
    	event.stopPropagation();
    });
    //监听弹出菜单，并相应的菜单项点击做出响应
    $(".context-menu-item").click(function(){
    	var index=$(this).index();
    	if (index==0) {
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("文件复制成功");
	    	$(".context-menu").hide();
    	}else if(index==1){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("文件剪切成功");
	    	$(".context-menu").hide();
    	}else if(index==2){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("文件粘贴成功");
	    	$(".context-menu").hide();
    	}else if(index==3){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("新建文件夹");
	    	$(".context-menu").hide();
    	}
    	else if(index==4){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("新建文件");
	    	$(".context-menu").hide();
    	}else if(index==5){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("压缩文件");
	    	$(".context-menu").hide();
    	}else if(index==6){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("解压文件");
	    	$(".context-menu").hide();
    	}else if(index==7){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("重命名文件");
	    	$(".context-menu").hide();
    	}
    	else if(index==8){
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("显示文件属性");
	    	$(".context-menu").hide();
    	}else{
    		/*var fso,f;
	    	fso=new ActiveXObject("Scripting.FileSystemObject");
	    	f=fso.getFile(sname.val);
	    	f.copy(dname.val);*/
	    	alert("文件下载成功");
	    	$(".context-menu").hide();
    	}
    });
   })