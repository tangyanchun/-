/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('productInventoryDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetProductStockDetail',
        function ($scope,$rootScope,$stateParams,$state,GetProductStockDetail) {

            $rootScope.title = "产品库存详情";

            $scope.param = {
                productDetail:{}
            }

            GetProductStockDetail.get({shopProcId:$stateParams.shopProductId},function (data) {
                console.log(data.responseData);
                $scope.param.productDetail = data.responseData;
            })

        }]);