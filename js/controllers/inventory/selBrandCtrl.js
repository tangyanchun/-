angular.module('controllers',[]).controller('selBrandCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','OneLevelProduct','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,OneLevelProduct,Global) {
            $rootScope.title = "选择品牌";
            OneLevelProduct.get({
                status:'0'
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null){
                     $scope.selBrand = data.responseData
                }else{
                    $scope.selBrand=[]
                }
            })
            $scope.selBand = function(name,oneId){
                    $rootScope.settingAddsome.product.productTypeOneName=name;
                    $rootScope.settingAddsome.product.productTypeOneId=oneId
                    $rootScope.settingAddsome.product.productTypeTwoName=''
                    $rootScope.settingAddsome.product.productTypeTwoId='';
                    $state.go($stateParams.url)
            }

        }])