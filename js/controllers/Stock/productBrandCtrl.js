
angular.module('controllers',[]).controller('productBrandCtrl',
    ['$scope','$rootScope','$stateParams','$state','SearchShopProductList','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,SearchShopProductList,$ionicLoading) {

            $rootScope.title = "产品品牌";

            $scope.addSeriesGo = function(){
                $state.go("addSeries")
            };
            $scope.checkSeries=function (id) {
                $state.go("addSeries",{id:id})
            };
            $scope.checkProduct=function (type,id,productTypeName,status) {
                $state.go("productSetting",{type:type,id:id,productTypeName:productTypeName,status:status})
            };
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                SearchShopProductList.get({filterStr:''},function (data) {
                    $ionicLoading.hide();
                    if(data.result=='0x00001'&&data.responseData!=null){
                        $scope.productBrand = data.responseData.oneAndTwoLevelList
                    }else{
                        $scope.productBrand=[]
                    }
                })
            })




        }]);