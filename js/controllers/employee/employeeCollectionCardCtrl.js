/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeCollectionCardCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserProjectGroupList',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserProjectGroupList) {
            $rootScope.title = "套卡";
            $scope.param={
                flag:false,
                isUseUp:"6"
            };
            /*点击筛选*/
            $scope.sel = function(){
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
            GetUserProjectGroupList.get({sysUserId:$stateParams.sysUserId},function (data) {
                console.log(data);
                $scope.collectionCar=data.responseData;
                /*为啦便于筛选*/
                $scope.arr=data.responseData;
            });
            /*点击确定*/
            $scope.selTrue=function () {
                $scope.param.flag = false;
                $scope.collectionCar=[];
                if($scope.param.isUseUp == '6'){
                    $scope.collectionCar=$scope.arr
                }else{
                    for(var i=0;i<$scope.arr.length;i++){
                        if($scope.arr[i].isUseUp ==$scope.param.isUseUp){
                            $scope.collectionCar.push($scope.arr[i])
                        }
                    }
                }
            };
        }]);