/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('productInventoryCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "产品库存详情";

        }]);