angular.module('controllers',[]).controller('chooseWarehouseCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','FindStoreList','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,FindStoreList,Global) {
            $rootScope.title = "选择仓库";
            FindStoreList.get({},function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null) {
                   $scope.chooseWarehouse = data.responseData;
                   console.log(data.responseData);
                }
            })

            $scope.funAreaGo = function(shopStoreId,name){
                $rootScope.shopInfo.shopStoreId = shopStoreId;
                var timstamp = (new Date).valueOf();
                $state.go("funArea",{name:name,dateTime:timstamp});
            }

            $scope.close = function(){
                $state.go("workHome");
            }

        }])