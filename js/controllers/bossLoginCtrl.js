angular.module('controllers',[]).controller('bossLoginCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserValidateCode','BossUtil','$interval','Global','BossUserLogin','$ionicPopup',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserValidateCode,BossUtil,$interval,Global,BossUserLogin,$ionicPopup) {


            $rootScope.title = "美享登录";

            $scope.param = {
                userPhone:'',
                validateCode:'',
                validateCodeButtonStatus:true,
                timeCount: 60
            };

            $scope.getValidateCode = function(){
                if(!(/^1[34578]\d{9}$/.test($scope.param.userPhone))){
                    alert("手机号码有误，请重填");
                    return false;
                }
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
            };
            $scope.regs = function () {
                $scope.param.validateCode=$scope.param.validateCode.replace(/[^0-9]+/g, '')
            }
            $scope.userLogin = function(){
                if($scope.param.validateCode=='')
                {

                    var alertPopup = $ionicPopup.alert({
                        template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.5rem">请输入验证码</span>',
                        okText:'确定'
                    });
                }
                else
                {

                    BossUserLogin.save({userPhone:$scope.param.userPhone,code:$scope.param.validateCode},function(data){
                        if(data.result=='0x00001'){

                            if(data.responseData.beautyUserLoginToken!=Global.TOKEN_ERROR)
                            {
                                window.localStorage.removeItem("beautyUserLoginToken");
                                window.localStorage.setItem("beautyUserLoginToken",data.responseData.beautyUserLoginToken);

                            }
                            if(data.responseData.beautyBossLoginToken!=Global.TOKEN_ERROR)
                            {
                                window.localStorage.removeItem("beautyBossLoginToken");
                                window.localStorage.setItem("beautyBossLoginToken",data.responseData.beautyBossLoginToken);
                            }
                            if(data.responseData.beautyClerkLoginToken!=Global.TOKEN_ERROR)
                            {
                                window.localStorage.removeItem("beautyClerkLoginToken");
                                window.localStorage.setItem("beautyClerkLoginToken",data.responseData.beautyClerkLoginToken);
                            }
                            if((data.responseData.beautyUserLoginToken!=Global.TOKEN_ERROR)){
                                if(data.responseData.beautyBossLoginToken==Global.TOKEN_ERROR&&data.responseData.validateFlag==1){
                                        alert('您还不是老板，请使用老板账号登录！或者如果您是员工请在员工入口登录！');
                                        return;
                                }
                                else if(data.responseData.beautyBossLoginToken!=Global.TOKEN_ERROR){
                                    if($stateParams.redirectUrl == "sharePage"){
                                        $state.go("sharePage",{},{reload:true});
                                    }else{
                                            window.location.href = "#/workHome";
                                            alert("登录成功")
                                    }
                                }else if(data.responseData.beautyClerkLoginToken==Global.TOKEN_ERROR&&data.responseData.validateFlag==1){
                                        alert('您还不是员工，请使用员工账号登录！或者如果您是老板请在入口登录！');
                                        return;
                                }
                                else if(data.responseData.beautyClerkLoginToken!=Global.TOKEN_ERROR) {
                                    if($stateParams.redirectUrl == "sharePage"){
                                        $state.go("sharePage",{},{reload:true});
                                    }else{
                                            window.location.href = "#/employeeIndex";
                                            alert("登录成功")
                                    }
                                }else{
                                    alert("您的账号未开通，请联系区域总监！");
                                    $scope.param.validateCode = ''
                                    return;
                                }

                            }else{
                                alert("您的账号未开通，请联系区域总监！");
                                $scope.param.validateCode = ''
                                return;
                            }
                        }else if(data.result=='0x00010'){
                            alert("验证码输入有误");
                            $scope.param.validateCode = ''
                        }else if(data.result=='0x11111'){
                            alert("账号已锁定，请联系客服");
                            return;
                        }else{
                            alert(data.errorInfo);
                            $scope.param.validateCode = ''
                        }
                    })
                }
            }
        }]);