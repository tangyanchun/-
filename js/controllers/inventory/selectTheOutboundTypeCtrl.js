angular.module('controllers',[]).controller('selectTheOutboundTypeCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "选择出库类型";
            $scope.AddOutboundGo = function(stockType){

                var timstamp = (new Date).valueOf();
                $rootScope.shopInfo.outShopStockType = stockType;
                console.log($rootScope.shopInfo.outShopStockType);
                $state.go("AddOutbound",{shopStoreId:$stateParams.shopStoreId,stockStyle:$stateParams.stockStyle,stockType:stockType,sum:$stateParams.sum,name:$stateParams.name,productCode:$stateParams.productCode,dateTime:timstamp});
            }
        }])