/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('branchShopCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopInfo',
        function ($scope,$rootScope,$stateParams,$state,GetShopInfo) {

            $rootScope.title = "美容院分店";
            GetShopInfo.get({
                sysShopId:$stateParams.sysShopId
            },function (data) {
                $scope.shopInfo=data.responseData;
               console.log(data)
            })
        }]);