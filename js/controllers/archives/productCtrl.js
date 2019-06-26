angular.module('controllers',[]).controller('productCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserProductList','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserProductList,Global) {
            $rootScope.title = "产品";
              $scope.goProductDetails=function (id) {
                  $state.go("productDtails",({flowId:id}))
              };
              $scope.param={
                  picFlag:false
              }
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetUserProductList.get({sysShopId: $stateParams.sysShopId,sysUserId:$stateParams.sysUserId},function (data) {
                    $ionicLoading.hide()
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.product =data.responseData
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else{
                        $scope.param.picFlag=true;
                    }
                })
            })

        }]);
