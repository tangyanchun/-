/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('rechargeDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','CardInfo',
        function ($scope,$rootScope,$stateParams,$state,CardInfo) {

            $rootScope.title = "充值卡详情";
            CardInfo.get({id:$stateParams.rechargeId},function (data) {
                $scope.cardInfo=data.responseData;

                console.log(data)
            })
        }]);