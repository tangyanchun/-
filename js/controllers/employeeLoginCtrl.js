/**
 * Created by Administrator on 2018/11/30.
 */
angular.module('controllers',[]).controller('employeeLoginCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserValidateCode','BossUtil','$interval','Global','BossUserLogin','$ionicPopup',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserValidateCode,BossUtil,$interval,Global,BossUserLogin,$ionicPopup) {


            $rootScope.title = "美享登录";

            $scope.param = {
                userPhone:'',
                validateCode:'',
                validateCodeButtonStatus:true,
                timeCount: 60
            }

            $scope.getValidateCode = function(){

                $scope.param.validateCodeButtonStatus = false;
                $scope.param.timeCount = 60;

                //每隔一秒执行
                var timer= $interval(function(){
                    $scope.param.timeCount--;
                    if($scope.param.timeCount<0){
                        $interval.cancel(timer);
                        $scope.param.validateCodeButtonStatus = true;
                    }
                },1000);

                GetUserValidateCode.get({mobile:$scope.param.userPhone},function(data){
                    if(data.result == Global.FAILURE)
                    {
                        var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">验证码获取失败</span>',
                            okText:'确定'
                        });
                    }
                })
            }

            $scope.userLogin = function(){

                if($('#validCode').val()=='')
                {

                    var alertPopup = $ionicPopup.alert({
                        template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">请输入验证码</span>',
                        okText:'确定'
                    });
                }
                else
                {

                    BossUserLogin.save({userPhone:$scope.param.userPhone,code:$('#validCode').val()},function(data){

                        if(data.result=='0x00001'){
                            window.localStorage.removeItem("beautyClerkLoginToken");
                            window.localStorage.setItem("beautyClerkLoginToken",data.responseData.beautyClerkLoginToken);
                            window.localStorage.setItem("userType",Global.userType.BEAUTY_CLERK);
                            sessionStorage.removeItem("beautyClerkLoginToken");
                            sessionStorage.setItem("beautyClerkLoginToken", data.responseData.beautyClerkLoginToken);
                            BossUtil.delCookie("beautyClerkLoginToken");
                            BossUtil.setCookie("beautyClerkLoginToken", data.responseData.beautyClerkLoginToken);
                            if (data.responseData.beautyClerkLoginToken!=Global.TOKEN_EMPLOYEE) {
                            window.localStorage.setItem("userType",Global.userType.BEAUTY_CLERK);
                            if(data.responseData.beautyClerkLoginToken==Global.TOKEN_ERROR){
                                alert('请使用正确的账号登录！');
                            }
                            else if (data.responseData.beautyClerkLoginToken!=Global.TOKEN_EMPLOYEE) {
                                window.location.href = "#/chooseSkin";
                                alert("登录成功")
                            }else{
                                alert("请使用正确的帐号登录")
                            }
                        }else if(data.result=='0x00010'){
                            alert("验证码输入有误")
                        }else if(data.result=='0x11111'){
                            alert("账号已锁定，请联系客服")
                        }else{
                            alert(data.errorInfo);
                        }

                    })
                }
            }

        }]);