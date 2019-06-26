/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeRefillCardCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserRechargeCardList',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserRechargeCardList) {
            $rootScope.title = "基本信息";
            $scope.param={
                flag:false
            }
            $scope.prepaidPhoneRecordsGo=function (id) {
                $state.go("employeeAccountDetails",{id:id})
            }
            GetUserRechargeCardList.get({
                sysUserId:$stateParams.sysUserId,
                sysShopId:$stateParams.sysShopId,
            },function(data) {
                $scope.refillCard = data.responseData
            })
            $scope.help = function(){
                $scope.param.flag=true;
            }
            $scope.disNone = function(){
                $scope.param.flag=false;
            }
        }]);