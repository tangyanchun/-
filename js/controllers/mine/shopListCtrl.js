/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('shopListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBossAllShopList','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetBossAllShopList,Global,$ionicLoading) {

            $rootScope.title = "分店列表";
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetBossAllShopList.get({type:'1'},function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $ionicLoading.hide();
                        $scope.shopList = data.responseData
                    }
                })
            })

        }]);