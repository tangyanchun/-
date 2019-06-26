angular.module('controllers',[]).controller('sendContentCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','SendMessageToUser','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,SendMessageToUser,Global) {
            $rootScope.title = "通知顾客";
            $scope.param={
                flag:true
            }
            $scope.shopBossSendMessageDTO = {
                title :"",
                content:""
            }

            $scope.sendMessageToUser = function(){
                if ($scope.param.flag == true) {
                    $scope.param.flag=false
                    SendMessageToUser.save($scope.shopBossSendMessageDTO,function (data) {
                        if(data.result==Global.SUCCESS&&data.responseData!=null){
                            alert("发送成功");
                            window.history.go(-1)
                            $scope.param.flag=true;
                            $scope.shopBossSendMessageDTO = {
                                title :"",
                                content:""
                            }
                        }
                    })
                }

            }

        }])