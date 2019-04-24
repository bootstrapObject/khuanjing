
;$(function () {
    var all_page = {
        /**
         * 首页
         */
        homePage_addBtnoff:true,
        homePage: () => {
            var themeColor1 = "#5bebdc";
            var themeColor2 = "#5d5cd2";
            //配置响应式

/*            function networkIoMonResize(){
                var box = $("#chartBox-networkIoMon");
                box.css({"width":window.innerWidth*0.85+'px',"height":window.innerHeight*0.25+'px'} );
            }
            networkIoMonResize();*/


            var option = null;
            var getCellJson = {};
            let $hostList =$("#hostList");
            /*主机列表*/
            $.ajax({
                url:"http://test.phpweilai.cc/admin/vhost/lst",
                method:"POST",
                data:sessionStorage.getItem("token"),
                dataType:"json",
                beforeSend:function (XMLHttpRequest) {},
                success:function (data,textStatus,XMLHttpRequest) {
                    if(data.status===1){
                        $("#hostList").bootstrapTable({
                            data: data.data,
                            toolbar: '#toolbar',
                            clickEdit: true,
                            pagination: true,       //显示分页条
                            // showColumns: true,
                            // showPaginationSwitch: true,     //显示切换分页按钮
                            // showRefresh: true,      //显示刷新按钮
                            formatter:operateFormatter,
                            pageSize:3,
                            columns:[
                                {
                                    field:"state",
                                    checkbox:true,
                                    sortable:true
                                },
                                {
                                    field:"file_name",
                                    title:"配置文件名",
                                    sortable:true
                                },
                                {
                                    field:"remark",
                                    title:"备注",
                                    sortable:true
                                },
                                {
                                    field:"root",
                                    title:"网络目录",
                                    sortable:true
                                },
                                {
                                    field:"server_name",
                                    title:"域名",
                                    sortable:true
                                },
                                {
                                    field:"operate",
                                    title:"操作",
                                    formatter:"operateFormatter",
                                    events:"operateEvents"
                                }
                            ]
                            ,
                            onClickCell: function(field, value, row, $element) {
                                if(field!=="operate"){
                                    $element.attr('contenteditable', true);
                                }
                                else{

                                }
                                $element.blur(function () { //焦点离开时保存
                                    let index = $element.parent().data('index');
                                    let tdValue = $element.html();
                                    saveData(index, field, tdValue);
                                    getCellJson = tdValue;
                                })
                            }
                        });
                    }
                    else{
                        location.href = "login.html";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThorwn) {
                    console.error(XMLHttpRequest);
                    console.error(textStatus);
                    console.error(errorThorwn);
                },
                complete:function (XMLHttpRequest,textStatus) {}
            });

            /*定义homepage函数*/

            function myChartContainerTop(dom)
            {
                dom.style.width=window.innerWidth*0.3+"px";
                dom.style.height=window.innerHeight*0.3+"px";
            /*    dom.style.marginTop=window.innerHeight*0.01+"px";*/
            }

            function saveData(index, field, value) {
                $hostList.bootstrapTable('updateCell', {
                    index: index,       //行索引
                    field: field,       //列名
                    value: value        //cell值
                })
            }

            if(all_page.homePage_addBtnoff){
                $("#addBtn").click(
                    function () {
                        console.log(getCellJson);
                        $hostList.bootstrapTable(
                            'insertRow', {
                                index: 0,
                                row: {
                                    file_name: "",
                                    remark: "",
                                    root: "",
                                    server_name: "",
                                    operation: ""
                                }
                            });
                    }
                );

                window.operateEvents = {
                    'click .save': function (e, value, row, index) {
                        console.log('数据保存 ' + JSON.stringify(row));
                        alert("数据已保存");
                    },
                    'click .delOneBtn': function (e, value, row, index) {
                        $hostList.bootstrapTable('remove', {
                            field: 'file_name',
                            values: [row.file_name]
                        })
                    }
                };


                $("#delBtn").click(
                    function () {
                        var ids = $.map($hostList.bootstrapTable('getSelections'), function (row) {
                            return row.file_name
                        });
                        $hostList.bootstrapTable('remove', {
                            field: 'file_name',
                            values: ids
                        });

                    }
                );


                $("#updateBtn").click(
                    function () {
                        alert(JSON.stringify($hostList.bootstrapTable("getData")));
                    }
                );
                var timer = null;
             /*   window.onresize = function(){
                    clearTimeout(timer);
                    timer = setTimeout(
                        function () {
                            loadNetworkIoMonChartFunc();
                        }
                        ,1000
                    )

        }*/


                all_page.homePage_addBtnoff=false;

            }

            /*CPU监控*/
            $.ajax({
                url:"http://test.phpweilai.cc/admin/env/cpulst",
                method:"POST",
                data:sessionStorage.getItem("token"),
                dataType:"json",
                beforeSend:function (XMLHttpRequest) {},
                success:function (data,textStatus,XMLHttpRequest) {
                    if(data.status===1){
                        CpuChartFunc(data);
                    }else{
                        location.href = "login.html";
                    }

                },
                error:function (XMLHttpRequest,textStatus,errorThorwn) {
                    console.error(XMLHttpRequest);
                    console.error(textStatus);
                    console.error(errorThorwn);
                },
                complete:function (XMLHttpRequest,textStatus) {}
            });

            /*内存监控*/
            $.ajax({
                url:"http://test.phpweilai.cc/admin/env/memlst",
                method:"POST",
                data:sessionStorage.getItem("token"),
                dataType:"json",
                beforeSend:function (XMLHttpRequest) {},
                success:function (data,textStatus,XMLHttpRequest) {
                    if(data.status===1) {
                        MemoryChartFunc(data);
                    }else{
                        location.href = "login.html";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThorwn) {
                    console.error(XMLHttpRequest);
                    console.error(textStatus);
                    console.error(errorThorwn);
                },
                complete:function (XMLHttpRequest,textStatus) {}
            });

            /*disklst监控*/
            $.ajax({
                url:"http://test.phpweilai.cc/admin/env/disklst",
                method:"POST",
                data:sessionStorage.getItem("token"),
                dataType:"json",
                beforeSend:function (XMLHttpRequest) {},
                success:function (data,textStatus,XMLHttpRequest) {
                    /* diskIoMonChartFunc(data);*/
                    if(data.status===1) {
                        diskIoMonChartFunc(data);
                    }else{
                        location.href = "login.html";
                    }
                },
                error:function (XMLHttpRequest,textStatus,errorThorwn) {
                    console.error(XMLHttpRequest);
                    console.error(textStatus);
                    console.error(errorThorwn);
                },
                complete:function (XMLHttpRequest,textStatus) {}
            });

            /**
             * 网络IO监控   网络负载列表
             * token   xxx
             * id  参数可选，标识号[传上次最大的id编号]
             * starttime   秒级时间戳
             * endtime  秒级时间戳
             */
                $.ajax({
                    url:"http://test.phpweilai.cc/admin/env/networklst",
                    method:"POST",
                    data:sessionStorage.getItem("token"),
                    dataType:"json",
                    beforeSend:function (XMLHttpRequest) {},
                    success:function (data,textStatus,XMLHttpRequest) {
                        if(data.status===1){
                            setTimeout(
                                function () {
                                    networkIoMonChartFunc(data);
                                },500
                            )
                        }else{
                            location.href = "login.html";
                        }
                    },
                    error:function (XMLHttpRequest,textStatus,errorThorwn) {
                        console.error(XMLHttpRequest);
                        console.error(textStatus);
                        console.error(errorThorwn);
                    },
                    complete:function (XMLHttpRequest,textStatus) {}
                });
            /*cpu监控*/
            function CpuChartFunc(data) {
                var dom = document.getElementById("chartBox-cpuMon");
                this.myChart = echarts.init(dom);
                var app = {};
                var saveCpu = data.data[0];
                option = null;
                option = {
                    title : {
                        text: 'cpu利用率',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['空闲','已使用'],
                    },
                    color:[themeColor1,themeColor2],
                    series : [
                        {
                            name: 'cpu利用率',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:(100-saveCpu.percent),name:'空闲'},
                                {value:saveCpu.percent, name:'已使用'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                if(option&&typeof option === "object"){
                    this.myChart.setOption(option,true);
                }
            }
            /*内存监控*/
            function MemoryChartFunc(data) {
                var dom = document.getElementById("chartBox-MemoryMon");
                var myChart = echarts.init(dom);
                var app = {};
                var saveMemory = data.data[0];
                option = null;
                option = {
                    title : {
                        text: '内存监控',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['剩余内存','已用内存'],
                    },
                    color:[themeColor1,themeColor2],
                    series : [
                        {
                            name: '内存监控',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:saveMemory.free,name:'剩余内存'},
                                {value:saveMemory.used, name:'已用内存'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };


                if(option&&typeof option === "object"){
                    myChart.setOption(option,true);
                }
            }

            /*硬盘监控*/

            function diskIoMonChartFunc(data) {
                var dom = document.getElementById("chartBox-diskIoMon");
                var myChart = echarts.init(dom);
                var app = {};
                var saveDisk = data.data[0];
                option = null;
                option = {
                    title : {
                        text: '硬盘负载',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color:[themeColor1,themeColor2],
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['剩余空间','已用空间']
                    },
                    series : [
                        {
                            name: '硬盘负载',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:saveDisk.free_space,name:'剩余空间'},
                                {value:saveDisk.used_space, name:'已用空间'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                if(option&&typeof option === "object"){
                    myChart.setOption(option,true);
                }
            }


            /*网络IO监控*/
            function networkIoMonChartFunc(data) {
                var timer = null;
                var dom = document.getElementById("chartBox-networkIoMon");
                myChartContainer();
                function myChartContainer()
                {
                    dom.style.width=window.innerWidth*0.9+"px";
                    dom.style.height=window.innerHeight*0.3+"px";
                    dom.style.marginTop=window.innerHeight*0.01+"px";
                }

                this.myChart = echarts.init(dom);
                var app = {};
                var saveDisk = data.data[0];
                this.option = null;
                this.option = {
                    legend: {},
                    tooltip: {},
                    grid:{
                      left:"20%",
                        right:"20%"
                    },
                    dataset: {
                        source: [
                            ['product', '上传速度', '下载速度'],
                            ['速度',saveDisk.up_packets,saveDisk.down_packets]
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {   type: 'bar',
                            barCategoryGap:'50%',
                            itemStyle:{
                                normal:{
                                    color:themeColor1,
                                }
                            }
                        },
                        {   type: 'bar',
                            barCategoryGap:'50%',
                            itemStyle:{
                                normal:{
                                    color:themeColor2,
                                }
                            }
                        }
                    ]
                };
                var _this =this;
                window.onresize = function ()
                {
                    myChartContainer();
                    _this.myChart.resize();
                };
                if(option&&typeof option === "object"){

                    this.myChart.setOption(this.option,true);
                }

            }

            function percentage(a,total) {
                return Math.round(a/total*100);
            }
        },
        /**
         * 文件管理
         */
        fileManagement: () => {
            $("#fileManagement").on("contextmenu", (e) => {
                e.preventDefault();
            });
            $(document).mousedown((e) => {
                if(e.which !== 3){
                    $(".context-menu").hide();
                }
            });
            /**
             * 点击文件第选中效果
             */
            $(".fileM_content").on("mousedown",".file_item",function (e){
                $(".file_item").removeClass("file_item_click");
                $(this).addClass("file_item_click");
                if(e.which === 3){
                    $(".context-menu").css({
                        left:e.pageX + "px",
                        top:e.pageY + "px",
                    }).show();
                }
                e.stopPropagation();
            });
            /**
             * 右键出现菜单功能
             */
            $(".fileM_content").mousedown((e) => {
                if(e.which === 3){
                    $(".context-menu").css({
                        left:e.pageX + "px",
                        top:e.pageY + "px",
                    }).show();
                }
                $(".file_item").removeClass("file_item_click");
            });
            /**
             * 菜间点击功能
             */
            $(".context-menu>.context-menu-item").click(function (e) {
                console.log(e);
                // e.stopPropagation();
                return false
            });



            /**
             * 获取文件目录
             */
            $.ajax({
                url:"http://test.phpweilai.cc/admin/df/lst",
                method:"POST",
                data:sessionStorage.getItem("token"),
                dataType:"json",
                beforeSend: (XMLHttpReques) => {},
                success: (data,textStatus,XMLHttpRequest) => {
                    if(data.status === 1){
                        $(".file_directory").text(data.data.dir);
                        let detailArray = data.data.detail;
                        detailArray.forEach((item,index) => {
                            let dfName;
                            switch (item.df) {
                                case 1:
                                    dfName = "icon-weibiaoti-_huabanfuben";
                                    break;
                                case 2:
                                    dfName = "icon-wenjian1";
                                    break;
                                case 3:
                                    dfName = "icon-wenjian";
                                    break;
                            }
                            $(".fileM_content").prepend(` <div class="file_item"
  data-ctime="${item.ctime}" data-fz="${item.fz}">
            <i class="iconfont ${dfName}"></i>
            <small class="file_NameTxt">${item.name}</small>
          </div>`)
                        })
                    }else {
                        location.href = "login.html";
                    }
                },
                error: (XMLHttpRequest,textStatus,errorThorwn) => {
                    console.error(XMLHttpRequest);
                    console.error(textStatus);
                    console.error(errorThorwn);
                },
                complete: (XMLHttpRequest,textStatus) => {}
            });
            /**
             * 文件上传
             */
            $("#upload_file>input").change((e) => {
                let file_name = e.currentTarget.files[0].name,
                    file_lujing = $("#upload_file>input").val();
                if(e.currentTarget.files.length){
                    $.ajax({
                        url:"http://test.phpweilai.cc/admin/file/upload",
                        method:"POST",
                        data:sessionStorage.getItem("token")+
                        "&dir=/data/wwwroot/&file="+file_lujing,
                        dataType:"json",
                        beforeSend: (XMLHttpReques) => {},
                        success: (data,textStatus,XMLHttpRequest) => {
                            console.log(data);
                            if(data.status === 1){
                                // $(".file_directory").text(data.data.dir);
                            }else {
                                // location.href = "login.html";
                            }
                        },
                        error: (XMLHttpRequest,textStatus,errorThorwn) => {
                            console.error(XMLHttpRequest);
                            console.error(textStatus);
                            console.error(errorThorwn);
                        },
                        complete: (XMLHttpRequest,textStatus) => {}
                    });
                }
            })



        },
        /**
         * 数据库
         */
        dataBase: () => {
            $("#iframe-dataBase").attr({
                "src":"http://test.phpweilai.cc/phpmyadmin/",
                "style":"width:100%;height:"+$("#dataBase").parent().height() +"px;"
            });
        },
        /**
         * 监控4.5  cpu监控4.1 内存监控4.3 磁盘io监控4.2 网络监控4.4
         * @param url
         * @param tabId
         */
        comm_monitor: (url,tabId) => {
            $.ajax({
                url:url,
                method:"POST",
                data:sessionStorage.getItem("token"),
                dataType:"json",
                beforeSend: (XMLHttpReques) => {},
                success: (data,textStatus,XMLHttpRequest) => {
                    if(data.status === 1){
                        if(!$("#"+tabId+" tr").length){
                            for(keyName in data.data[0]){
                                if(keyName !== "id"){
                                    $("#"+tabId).append(`<tr><td>${keyName}</td><td>${data.data[0][keyName]}</td></tr>`)
                                }
                            }
                        }else {
                            $("#"+tabId).empty();
                            for(keyName in data.data[0]){
                                if(keyName !== "id"){
                                    $("#"+tabId).append(`<tr><td>${keyName}</td><td>${data.data[0][keyName]}</td></tr>`)
                                }
                            }
                        }
                        if($("#"+tabId).next().hasClass("spanText")){
                            $("#"+tabId).next().remove();
                        }
                    }else {
                        location.href = "login.html";
                        // if(!$("#"+tabId).next().hasClass("spanText")){
                        //     $("#"+tabId).parent().append("<span class='red spanText'>获取失败</span>")
                        // }
                    }
                },
                error: (XMLHttpRequest,textStatus,errorThorwn) => {
                    console.error(XMLHttpRequest);
                    console.error(textStatus);
                    console.error(errorThorwn);
                },
                complete: (XMLHttpRequest,textStatus) => {}
            });
        },
        /**
         * 监控
         */
        monitor: () => {
        },
        /**
         * CPU监控
         */
        cpuMonitor: () => {
        },
        /**
         * 内存监控
         */
        memoryMonitoring: () => {
        },
        /**
         * 磁盘io监控
         */
        disIoMonitor: () => {
        },
        /**
         * 网络监控
         */
        networkMonitor: () => {
        },
        /**
         * 一键放置网站
         */
        oneClickPlacementWebsite: () => {
        },
        /**
         * 回收站
         */
        recycleBin: () => {
        },
        /**
         * 退出
         */
        signOut: () => {
            location.href = "login.html";
        }
    };
    /**
     * 首次出现调用首页的js函数
     */
    all_page.homePage();
    all_page.fileManagement();
$('a[data-toggle="tab"]').click(function () {
    var objName = $(this).attr("href").replace("#","");
   setTimeout(() => {
       switch (objName) {
           case "homePage":
           case "fileManagement":
               break;
           case "monitor":
               all_page.comm_monitor("http://test.phpweilai.cc/admin/env/hardwarelst","tab-monitor");
               break;
           case "cpuMonitor":
               all_page.comm_monitor("http://test.phpweilai.cc/admin/env/cpulst","tab-cpuMonitor");
               break;
           case "memoryMonitoring":
               all_page.comm_monitor("http://test.phpweilai.cc/admin/env/memlst","tab-memoryMonitoring");
               break;
           case "disIoMonitor":
               all_page.comm_monitor("http://test.phpweilai.cc/admin/env/disklst","tab-disIoMonitor");
               break;
           case "networkMonitor":
               all_page.comm_monitor("http://test.phpweilai.cc/admin/env/networklst","tab-networkMonitor");
               break;
           default:
               all_page[objName]();
       }
   },200)
});
});

function operateFormatter(value, row, index) {
    return [
        '<a class="save" href="javascript:void(0)" title="Like">',
        '<span>保存</span>',
        '</a>  ',
        '<a class="delOneBtn" href="javascript:void(0)" title="Like">',
        '<span>删除</span>',
        '</a>  ',
    ].join('')
}




