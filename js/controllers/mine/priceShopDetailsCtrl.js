/**
 * Created by Administrator on 2018/5/28.
 */
/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('priceShopDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','ProductInfoMess',
        function ($scope,$rootScope,$stateParams,$state,ProductInfoMess) {

            $rootScope.title = "项目详情";
            ProductInfoMess.get({productId:$stateParams.productId},function (data) {
                $scope.productInfo=data.responseData;
                console.log($scope.productInfo.status)
                if($scope.productInfo.status=="0"){
                $scope.productInfo.status="启用"
                }else {
                $scope.productInfo.status="不启用"
                }
            })
        }]);