;$(function () {
    /**
     * 监控页面
     */
    // $.ajax({
    //     url:"http://test.phpweilai.cc/admin/env/hardwarelst",
    //     method:"POST",
    //     data:sessionStorage.getItem("token"),
    //     dataType:"json",
    //     beforeSend:function (XMLHttpReques) {},
    //     success:function (data,textStatus,XMLHttpRequest) {
    //         if(data.status === 1){
    //             $("#tab-monitor").append(`
    //           <tr>
    //             <td>主机名：</td>
    //             <td>${data.data[0].hostname}</td>
    //           </tr>
    //           <tr>
    //             <td>系统：</td>
    //             <td>${data.data[0].system_name}</td>
    //           </tr>
    //           <tr>
    //             <td>系统版本:</td>
    //             <td>${data.data[0].system_ver}</td>
    //           </tr>
    //           <tr>
    //             <td>CPU型号：</td>
    //             <td>${data.data[0].cpu_model_name}</td>
    //           </tr>
    //           <tr>
    //             <td>CPU核心数:</td>
    //             <td>${data.data[0].cpu_core_logical_true}</td>
    //           </tr>
    //           <tr>
    //             <td>连续运行时间:</td>
    //             <td>${data.data[0].boot_time}</td>
    //           </tr>
    //         `)
    //         }else {
    //             $("#tab-monitor").parent().append("<span class='red'>获取失败</span>")
    //         }
    //     },
    //     error:function (XMLHttpRequest,textStatus,errorThorwn) {
    //         console.error(XMLHttpRequest);
    //         console.error(textStatus);
    //         console.error(errorThorwn);
    //     },
    //     complete:function (XMLHttpRequest,textStatus) {}
    // });

    /**
     * cpu监控
     * 1.cpu（4.1） 2。内存（4.3） 3.磁盘。（4.2）4.网络（4.4）系统（4.5）
     */
    $.ajax({
        url:"http://test.phpweilai.cc/admin/env/cpulst",
        method:"POST",
        data:sessionStorage.getItem("token"),
        dataType:"json",
        beforeSend:function (XMLHttpReques) {},
        success:function (data,textStatus,XMLHttpRequest) {
            console.log(data);
            if(data.status){
                $("#tab-cpuMonitor").append(`
                <tr>
                <td>CPU利用率：</td>
                <td>${data.data[0]}</td>
              </tr>
              <tr>
                <td>CPU型号</td>
                <td></td>
              </tr>
              <tr>
                <td>CPU速度</td>
                <td></td>
              </tr>
              <tr>
                <td>CPU进程</td>
                <td></td>
              </tr>
              <tr>
                <td>CPU线程</td>
                <td></td>
              </tr>
              <tr>
                <td>CPU核心</td>
                <td></td>
              </tr>
                `);
            }else {
                $("#tab-cpuMonitor").parent().append("<span class='red'>获取失败</span>")
            }

            // if(data.status === 1){
            //     $("#tab-monitor").append(`
            //   <tr>
            //     <td>主机名：</td>
            //     <td>${data.data[0].hostname}</td>
            //   </tr>
            //   <tr>
            //     <td>系统：</td>
            //     <td>${data.data[0].system_name}</td>
            //   </tr>
            //   <tr>
            //     <td>系统版本:</td>
            //     <td>${data.data[0].system_ver}</td>
            //   </tr>
            //   <tr>
            //     <td>CPU型号：</td>
            //     <td>${data.data[0].cpu_model_name}</td>
            //   </tr>
            //   <tr>
            //     <td>CPU核心数:</td>
            //     <td>${data.data[0].cpu_core_logical_true}</td>
            //   </tr>
            //   <tr>
            //     <td>连续运行时间:</td>
            //     <td>${data.data[0].boot_time}</td>
            //   </tr>
            // `)
            // }else {
            //     $("#tab-monitor").parent().append("<span class='red'>获取失败</span>")
            // }
        },
        error:function (XMLHttpRequest,textStatus,errorThorwn) {
            console.error(XMLHttpRequest);
            console.error(textStatus);
            console.error(errorThorwn);
        },
        complete:function (XMLHttpRequest,textStatus) {}
    });

});