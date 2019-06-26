/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('reminderCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBossShopScheduleSetting','UpdateBossShopScheduleSetting','GetBossShopList','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetBossShopScheduleSetting,UpdateBossShopScheduleSetting,GetBossShopList,Global,$ionicLoading) {

            $rootScope.title = "提醒设置";
            $scope.param = {
                settingStatus:true,
                statusArr:[],
                displayShopBox:false,
                sysShopId:'',
                sysShopName:$stateParams.sysShopName
            }
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.getInfo()
            })
            $scope.getInfo= function(){
                GetBossShopScheduleSetting.get({sysShopId:$scope.param.sysShopId},function (data) {
                    $scope.reminder = data.responseData;
                    $ionicLoading.hide();
                    $scope.status()

                })
            }
            $scope.getInfo()

            $scope.settingStatus = function () {
                if( $scope.param.settingStatus == true){
                    for(var i =0;i<$scope.reminder.length;i++){
                        $scope.reminder[i].status = '0'
                    }
                }else{
                    for(var i =0;i<$scope.reminder.length;i++){
                        $scope.reminder[i].status = '1'
                    }
                }
                $scope.status()
                
            }
            $scope.status = function () {
                for(var i =0;i<$scope.reminder.length;i++){
                    if($scope.reminder[i].status == '0'){
                        $scope.param.statusArr[i] = true
                    }else{
                        $scope.param.statusArr[i] = false
                    }

                }
            }
            $scope.changeStatus = function(index){
                if($scope.param.settingStatus == false){
                    alert("排班功能未开启")

                }else{
                    if( $scope.param.statusArr[index] == false){
                        $scope.reminder[index].status = '1'
                    }else{
                        console.log(index)
                        $scope.reminder[index].status = '0'
                    }

                }
                $scope.status()

            };
           /* $scope.tabShop=function () {
                $scope.param.displayShopBox=!$scope.param.displayShopBox;
                GetBossShopList.get(function (data) {
                    $scope.shopList=data.responseData;
                });
            };*/
           /* $scope.choseShop = function(id){
                $scope.param.sysShopId = id;
                $scope.getInfo()
                $scope.param.displayShopBox = false;
            }*/
            $scope.dis = function () {
                $scope.param.displayShopBox = false;
            }
            $scope.save = function () {
                $scope.request ={
                    requestList:$scope.reminder
                }
                UpdateBossShopScheduleSetting.save($scope.request,function(data){
                    if(data.result==Global.SUCCESS){
                        $state.go("basicSetting")
                    }else{
                        alert("保存未成功")
                    }

                })
            }
            
            $scope.depaly=function (typeName) {
                if(typeName == 4){
                    setTimeout(function(){
                        document.body.scrollTop = document.body.scrollHeight;
                    },300);
                }
            }
            $('body').bind('touchmove', function(e) {
                $("input").blur()
            });
            $scope.num = function (time,index,type) {
                $scope.reminder[index][type]=time.replace(/[^0-9]{2}\:[0-9]{2}/,'')
            }

        }]);