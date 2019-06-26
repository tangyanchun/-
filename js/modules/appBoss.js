/**
 * 建立angular.module
 */

define(['angular'], function (angular) {
    var app = angular.module('bossApp',['ngResource','ui.router','ngSanitize','ionic',
        'oc.lazyLoad','highcharts-ng','infinite-scroll','bossGlobal','ionic-datepicker'])
        .config(['$httpProvider','$ionicConfigProvider','Global',function($httpProvider,$ionicConfigProvider,Global) {

            $httpProvider.interceptors.push(function($rootScope){
                return {
                    request: function(config){
                        config.headers = config.headers || {};

                        if(window.location.href.indexOf("workHome")!=-1) {
                            window.localStorage.setItem("userType",Global.userType.BEAUTY_BOSS);
                        }

                        if(window.location.href.indexOf("employeeIndex")!=-1) {
                            window.localStorage.setItem("userType",Global.userType.BEAUTY_CLERK);
                        }

                        if(window.localStorage.getItem("userType")!=undefined
                            &&window.localStorage.getItem("userType")!=null)
                        {
                            config.headers.usertype = window.localStorage.getItem("userType");
                        }
                        /*用户*/
                        if(window.localStorage.getItem("beautyUserLoginToken")!=undefined
                            &&window.localStorage.getItem("beautyUserLoginToken")!=null){
                            config.headers.beautyuserlogintoken = window.localStorage.getItem("beautyUserLoginToken");
                        }else{
                            if(sessionStorage.getItem("beautyUserLoginToken")!=undefined)
                            {
                                config.headers.beautyuserlogintoken = sessionStorage.getItem("beautyUserLoginToken");
                            }
                            else {
                                var name = "beautyUserLoginToken";
                                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                                if(arr=document.cookie.match(reg)){
                                    config.headers.beautyuserlogintoken = unescape(arr[2]);
                                }
                            }
                        }
                        /*老板*/
                        if(window.localStorage.getItem("beautyBossLoginToken")!=undefined
                            &&window.localStorage.getItem("beautyBossLoginToken")!=null){
                            config.headers.beautybosslogintoken = window.localStorage.getItem("beautyBossLoginToken");
                        }else{
                            if(sessionStorage.getItem("beautyBossLoginToken")!=undefined)
                            {
                                config.headers.beautybosslogintoken = sessionStorage.getItem("beautyBossLoginToken");
                            }
                            else {
                                var name = "beautyBossLoginToken";
                                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                                if(arr=document.cookie.match(reg)){
                                    config.headers.beautybosslogintoken = unescape(arr[2]);
                                }
                            }
                        }
                        /*员工*/
                        if(window.localStorage.getItem("beautyClerkLoginToken")!=undefined
                            &&window.localStorage.getItem("beautyClerkLoginToken")!=null){
                            config.headers.beautyclerklogintoken = window.localStorage.getItem("beautyClerkLoginToken");
                        }else{
                            if(sessionStorage.getItem("beautyClerkLoginToken")!=undefined)
                            {
                                config.headers.beautyclerklogintoken = sessionStorage.getItem("beautyClerkLoginToken");
                            }
                            else {
                                var name = "beautyClerkLoginToken";
                                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                                if(arr=document.cookie.match(reg)){
                                    config.headers.beautyclerklogintoken = unescape(arr[2]);
                                }
                            }
                        }

                        return config;
                    },
                    response: function (res) {
                        if(res.data.errorInfo==Global.TOKEN_EMPLOYEE){
                            window.location.href = "#/employeeLogin/"
                        }
                        return res;
                    }
                }
            });

            $ionicConfigProvider.tabs.position('bottom');// other values: top

        }])
        .run(function($rootScope,Chinese){
            $rootScope.shopInfo = {
                entryShopProductList:[],
                outShopProductList:[],
                outShopStockType : '',
                shopStoreId:''
            };
            $rootScope.settingAddsome={
                editedRecharge:'',/*充值卡信息*/
                editorCard:'',/*套卡信息*/
                extShopProjectInfoDTO:'',/*项目信息*/
                product:"",/*产品信息*/
                productId:''/*用于查询产品详情*/
            };
            if(true)
            {
                $rootScope.language = Chinese;

            }
        })
    return app;
});