// ==UserScript==
// @name         SEU lwReportEpidemicSeu dailyReport Automator
// @name:zh      东南大学健康打卡自动化
// @name:zh-CN   东南大学健康打卡自动化
// @namespace    http://seu.saltfish.moe/
// @version      0.12
// @license      Anti 996 License
// @description  Automatically completes the health daily report during the Wuhan pneumonia pandemic.
// @description:zh 自动完成东南大学线上服务健康打卡过程。
// @description:zh-CN 自动完成东南大学线上服务健康打卡过程。
// @author       SaltfishAmi
// @include      *://newids.seu.edu.cn/authserver/login?service=http://ehall.seu.edu.cn/qljfwapp2/sys/lwReportEpidemicSeu/index.do*
// @include      *://ehall.seu.edu.cn/qljfwapp2/sys/lwReportEpidemicSeu/index.do*
// @grant        none
// ==/UserScript==

//======================CONFIG======================
// Credentials for auto-login
    var username = "username";
    var password = "password";
// Timeout settings in ms
    var timeoutBeforeLogin = 1500;
    var timeoutBeforeClickingAdd = 8000;
    var timeoutBeforeClickingSave = 3000;
    var timeoutBeforeClickingConfirm = 3000;
//Temperature setting
    var temperature = "36.5";
//==================================================

    function $(id){
        return document.getElementById(id);
    }
    function $$(classname){
        return document.getElementsByClassName(classname);
    }

    var clickevt = document.createEvent("MouseEvents");
    clickevt.initEvent("click", true, true);

(function() {
    'use strict';

    if(username=="username"){
        // username check
        alert("Please edit the script and set your username & password! \n请编辑脚本，指定你的用户名和密码！");
        alert("The script will now terminate. \n脚本执行中断。");
        return false;
    }

    if(window.location.hostname != "ehall.seu.edu.cn"){
        // login
        // This will not work for login pages with role checking, as they have initial onClick functions of "return false".
        // use the url https://newids.seu.edu.cn/authserver/login?service=http://ehall.seu.edu.cn/qljfwapp2/sys/lwReportEpidemicSeu/index.do
        $("username").value = username;
        $("password").value = password;

        setTimeout(function(){
            $$("auth_login_btn")[0].dispatchEvent(clickevt);
        }, timeoutBeforeLogin);

    } else {
        //dailyreport
        setTimeout(function(){
            $$("bh-mb-16")[1].childNodes[1].dispatchEvent(clickevt);
            setTimeout(function(){
                $$("bh-mb-36")[3].childNodes[0].childNodes[0].childNodes[1].childNodes[1].value = temperature;
                $("save").dispatchEvent(clickevt);
                setTimeout(function(){
                    $$("bh-dialog-btn")[0].dispatchEvent(clickevt);
                }, timeoutBeforeClickingConfirm);
            }, timeoutBeforeClickingSave);
        }, timeoutBeforeClickingAdd);
    }
})();
