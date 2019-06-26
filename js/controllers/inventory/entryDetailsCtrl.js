angular.module('controllers',[]).controller('entryDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','ShopStockRecordDetail',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,ShopStockRecordDetail) {
            $rootScope.title = "入库单详情";

            $scope.param = {
                shopEntryDetails:{}
            }

            $scope.modifyLibraryGo=function(){
                $state.go('modifyLibrary')
            }

            ShopStockRecordDetail.get({id:$stateParams.id},function (data) {
                $scope.param.shopEntryDetails = data.responseData;
            })
}])