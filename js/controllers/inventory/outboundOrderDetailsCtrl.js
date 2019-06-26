angular.module('controllers',[]).controller('outboundOrderDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','ShopStockRecordDetail',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,ShopStockRecordDetail) {

            $rootScope.title = "出库单详情";

            $scope.param = {
                shopOutboundDetails:{}
            }

            ShopStockRecordDetail.get({id:$stateParams.outboundId},function (data) {
                $scope.param.shopOutboundDetails = data.responseData;
                console.log($scope.param.shopOutboundDetails);
            })

        }])
