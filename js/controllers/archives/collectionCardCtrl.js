angular.module('controllers',[]).controller('collectionCardCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserProjectGroupList','Global','$ionicScrollDelegate',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserProjectGroupList,Global,$ionicScrollDelegate) {
            $rootScope.title = "套卡";
            $scope.param={
                flag:false,
                isUseUp:"6",
                picFlag:false
            };
            /*点击筛选*/
            $scope.sel = function(){
                $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
                $scope.param.flag = true
            };
            /*点击关闭*/
            $scope.disNone=function () {
                $scope.param.flag = false;
            };
            /*点击选择类型*/
            $scope.selType = function(type){
                $scope.param.isUseUp = type
            };
            /*点击重置*/
            $scope.reset = function() {
                $scope.param.isUseUp = '6'
            };
            /*调取套卡列表*/
            $scope.getInfo=function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetUserProjectGroupList.get({sysUserId:$stateParams.sysUserId},function (data) {
                    $ionicLoading.hide()
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.collectionCar=data.responseData;
                        /*为啦便于筛选*/
                        $scope.arr=data.responseData;
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else{
                        $scope.param.picFlag=true;
                    }
                });
            }
            $scope.getInfo()

            /*点击确定*/
            $scope.selTrue=function () {
                $scope.param.flag = false;
                $scope.collectionCar=[];
                if($scope.param.isUseUp == '6'){
                    $scope.collectionCar=$scope.arr
                }else{
                    for(var i=0;i<$scope.arr.length;i++){
                        if($scope.arr[i].isUseUp ==$scope.param.isUseUp){
                            $scope.collectionCar.push($scope.arr[i]);
                        }
                    }
                }
                if($scope.collectionCar.length<=0){
                    $scope.param.picFlag=true;
                }else{
                    $scope.param.picFlag=false;
                }
            };
            
            $scope.treatmentCardDtailsGo = function (consumeRecordId,index) {
                var ids = new Array()
                for(var i=0;i<$scope.collectionCar[index].projectList.length;i++){
                   ids[i] =$scope.collectionCar[index].projectList[i].id
                }
                $state.go('treatmentCardDtails',{id:consumeRecordId,flowIds:ids,goodsType:'3'})
            }
        }]);