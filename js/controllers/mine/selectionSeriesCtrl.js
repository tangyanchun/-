/**
 * Created by Administrator on 2018/5/4.
 */

angular.module('controllers',[]).controller('selectionSeriesCtrl',
    ['$scope','$rootScope','$stateParams','$state','TwoLevelProduct','Global',
        function ($scope,$rootScope,$stateParams,$state,TwoLevelProduct,Global) {

            $rootScope.title = "选择系列";
            $scope.param ={
                id:$stateParams.id
            }
            TwoLevelProduct.get({
               id:$rootScope.settingAddsome.product.productTypeOneId,
                status:'0'
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null){
                    $scope.selectionSeries = data.responseData
                    if($scope.selectionSeries.length<=0){
                        alert("此品牌无系列")
                    }
                }
            })
            $scope.series = function (productTypeName,id) {
                $rootScope.settingAddsome.product.productTypeTwoName =productTypeName
                $rootScope.settingAddsome.product.productTypeTwoId =id
                console.log($rootScope.settingAddsome.product);
                $state.go($stateParams.url)

            }

        }]);
