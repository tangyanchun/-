angular.module('controllers',[]).controller('theThemeCtrl',
    ['$scope','$location','$rootScope','$stateParams','$state','$ionicLoading','GetShopBossSendMessage','Global',
        function ($scope,$location,$rootScope,$stateParams,$state,$ionicLoading,GetShopBossSendMessage,Global) {
            $rootScope.title = "通知";

            $scope.id = $location.search()['messageId'];

            GetShopBossSendMessage.get({id:$scope.id},function (data) {
                if(data.result==Global.SUCCESS && data.responseData!=null){
                    $scope.message = data.responseData
                }
            });
        }])
